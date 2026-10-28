// Steam sign-in for Better Auth over OpenID 2.0. Ported to the Better Auth
// 1.7 APIs from better-auth-steam (https://github.com/ytsdv/better-auth-steam),
// MIT License, Copyright (c) 2026. See packages/auth/README.md for the
// full notice.

import type { BetterAuthPlugin } from 'better-auth';
import { HIDE_METADATA } from 'better-auth';
import {
  APIError,
  createAuthEndpoint,
  sessionMiddleware,
} from 'better-auth/api';
import { setSessionCookie } from 'better-auth/cookies';
import {
  generateState,
  handleOAuthUserInfo,
  linkOAuthAccount,
  parseState,
} from 'better-auth/oauth2';
import { z } from 'zod';

import type { SteamErrorCode } from './error-codes';
import { STEAM_ERROR_CODES } from './error-codes';
import { claimResponseNonce } from './nonce';
import { buildSteamLoginUrl, verifySteamAssertion } from './openid';
import type { SteamProfile } from './profile';
import { fallbackSteamProfile, fetchSteamProfile, steamEmail } from './profile';
import {
  steamRealm,
  steamReturnTo,
  userSteamId,
  withErrorParam,
} from './redirect';
import { steamSchema } from './schema';

export const STEAM_PROVIDER_ID = 'steam';

export interface SteamPluginOptions {
  /** Steam Web API key from https://steamcommunity.com/dev/apikey. */
  apiKey: string;
}

type EndpointContext = Parameters<typeof parseState>[0];

const flowBody = z.object({
  callbackURL: z.string().optional(),
  errorCallbackURL: z.string().optional(),
  newUserCallbackURL: z.string().optional(),
});

const flowResponse = {
  200: { description: 'Steam login URL to redirect the browser to.' },
};

const STEAM_PATHS = new Set([
  '/sign-in/steam',
  '/link/steam',
  '/callback/steam',
]);

function assertTrustedRedirects(
  ctx: EndpointContext,
  body: z.infer<typeof flowBody>
) {
  const urls = [
    body.callbackURL,
    body.errorCallbackURL,
    body.newUserCallbackURL,
  ];

  for (const url of urls) {
    if (
      url &&
      !ctx.context.isTrustedOrigin(url, { allowRelativePaths: true })
    ) {
      throw APIError.from(
        'FORBIDDEN',
        STEAM_ERROR_CODES.STEAM_UNTRUSTED_REDIRECT
      );
    }
  }
}

async function startSteamFlow(
  ctx: EndpointContext,
  body: z.infer<typeof flowBody>,
  link?: { email: string; userId: string }
) {
  assertTrustedRedirects(ctx, body);

  const { baseURL } = ctx.context;
  const { state } = await generateState(ctx, link ? { link } : undefined);
  const url = buildSteamLoginUrl(
    steamRealm(baseURL),
    steamReturnTo(baseURL, state)
  );

  return ctx.json({ redirect: true, url });
}

async function loadProfile(
  ctx: EndpointContext,
  steamId: string,
  apiKey: string
): Promise<{ fetched: boolean; profile: SteamProfile }> {
  try {
    return { fetched: true, profile: await fetchSteamProfile(steamId, apiKey) };
  } catch (error) {
    ctx.context.logger.warn('Steam profile unavailable, using fallback', error);
    return { fetched: false, profile: fallbackSteamProfile(steamId) };
  }
}

type SteamState = Awaited<ReturnType<typeof parseState>>;
type SteamLink = NonNullable<SteamState['link']>;
type FailCallback = (code: SteamErrorCode, reason?: unknown) => never;

interface VerifiedSteamCallback {
  ctx: EndpointContext;
  fail: FailCallback;
  fetched: boolean;
  profile: SteamProfile;
  state: SteamState;
  steamId: string;
}

function steamAccount(steamId: string) {
  return { accountId: steamId, providerId: STEAM_PROVIDER_ID };
}

function steamUserInfo(steamId: string, profile: SteamProfile) {
  return {
    email: steamEmail(steamId),
    emailVerified: false,
    image: profile.image,
    name: profile.name,
  };
}

async function linkSteamAccount(
  { ctx, fail, profile, state, steamId }: VerifiedSteamCallback,
  link: SteamLink
): Promise<never> {
  const { internalAdapter } = ctx.context;
  const owner = await internalAdapter.findUserById(link.userId);
  const linkedSteamId = owner ? userSteamId(owner) : null;
  if (!owner || (linkedSteamId && linkedSteamId !== steamId)) {
    fail('STEAM_ALREADY_LINKED');
  }

  const result = await linkOAuthAccount(ctx, {
    account: steamAccount(steamId),
    link,
    profile: { steamId, ...profile },
    userInfo: steamUserInfo(steamId, profile),
  });
  if (!result.linked) {
    fail(
      result.error.code === 'account_already_linked_to_different_user'
        ? 'STEAM_ACCOUNT_IN_USE'
        : 'STEAM_LINK_FAILED',
      result.error
    );
  }

  await internalAdapter
    .updateUser(link.userId, { steamId })
    .catch((error: unknown) => fail('STEAM_LINK_FAILED', error));
  throw ctx.redirect(state.callbackURL);
}

async function signInWithSteam({
  ctx,
  fail,
  fetched,
  profile,
  state,
  steamId,
}: VerifiedSteamCallback): Promise<never> {
  const { internalAdapter } = ctx.context;
  const result = await handleOAuthUserInfo(ctx, {
    account: steamAccount(steamId),
    callbackURL: state.callbackURL,
    // Keep name/avatar current, but never overwrite them with the fallback
    // when the Steam Web API was unreachable.
    overrideUserInfo: fetched,
    trustProviderByName: false,
    userInfo: { ...steamUserInfo(steamId, profile), id: steamId },
  });
  if (result.error !== null) {
    return fail('STEAM_SIGN_IN_FAILED', result.error);
  }

  const { session } = result.data;
  let { user } = result.data;
  if (userSteamId(user) !== steamId) {
    user = await internalAdapter
      .updateUser(user.id, { steamId })
      .catch((error: unknown) => fail('STEAM_SIGN_IN_FAILED', error));
  }

  await setSessionCookie(ctx, { session, user });
  throw ctx.redirect(
    result.isRegister && state.newUserURL ? state.newUserURL : state.callbackURL
  );
}

export function steam(options: SteamPluginOptions) {
  return {
    $ERROR_CODES: STEAM_ERROR_CODES,
    endpoints: {
      linkSteam: createAuthEndpoint(
        '/link/steam',
        {
          body: flowBody,
          metadata: {
            openapi: {
              description: 'Link a Steam account to the signed-in user',
              responses: flowResponse,
            },
          },
          method: 'POST',
          use: [sessionMiddleware],
        },
        (ctx) => {
          const { user } = ctx.context.session;

          if (userSteamId(user)) {
            throw APIError.from(
              'BAD_REQUEST',
              STEAM_ERROR_CODES.STEAM_ALREADY_LINKED
            );
          }

          return startSteamFlow(ctx, ctx.body, {
            email: user.email,
            userId: user.id,
          });
        }
      ),

      signInSteam: createAuthEndpoint(
        '/sign-in/steam',
        {
          body: flowBody,
          metadata: {
            openapi: {
              description: 'Start signing in with Steam',
              responses: flowResponse,
            },
          },
          method: 'POST',
        },
        (ctx) => startSteamFlow(ctx, ctx.body)
      ),

      steamCallback: createAuthEndpoint(
        '/callback/steam',
        {
          metadata: HIDE_METADATA,
          method: 'GET',
          query: z.object({ state: z.string() }),
          requireRequest: true,
        },
        async (ctx) => {
          // Redirects to the error URL by itself when the state is invalid.
          const state = await parseState(ctx);
          const { baseURL, internalAdapter, logger } = ctx.context;
          const errorURL = state.errorURL ?? `${baseURL}/error`;
          const fail: FailCallback = (code, reason) => {
            logger.error(`Steam callback failed: ${code}`, reason);
            throw ctx.redirect(withErrorParam(errorURL, code, baseURL));
          };

          const assertion = await verifySteamAssertion(
            new URL(ctx.request.url).searchParams,
            steamReturnTo(baseURL, ctx.query.state)
          ).catch((error: unknown) => fail('STEAM_VERIFICATION_FAILED', error));
          const { steamId } = assertion;

          const fresh = await claimResponseNonce(
            internalAdapter,
            assertion.responseNonce,
            steamId,
            assertion.nonceExpiresAt
          );
          if (!fresh) {
            fail('STEAM_VERIFICATION_FAILED', 'Replayed response nonce');
          }

          const { fetched, profile } = await loadProfile(
            ctx,
            steamId,
            options.apiKey
          );
          const verified = { ctx, fail, fetched, profile, state, steamId };

          return state.link
            ? linkSteamAccount(verified, state.link)
            : signInWithSteam(verified);
        }
      ),
    },
    id: 'steam',
    rateLimit: [
      {
        max: 10,
        pathMatcher: (path: string) => STEAM_PATHS.has(path),
        window: 60,
      },
    ],
    schema: steamSchema,
  } satisfies BetterAuthPlugin;
}
