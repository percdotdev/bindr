import {
  afterEach,
  beforeEach,
  describe,
  expect,
  mock,
  spyOn,
  test,
} from 'bun:test';
import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';

import { STEAM_OPENID_URL } from './openid';
import { steam } from './plugin';
import {
  checkAuthenticationResponse,
  playerSummariesResponse,
  steamAssertion,
  TEST_STEAM_ID,
} from './test-fixtures';

const BASE_URL = 'http://localhost:3000';

function createTestAuth() {
  return betterAuth({
    account: {
      accountLinking: {
        allowDifferentEmails: true,
        trustedProviders: ['steam'],
      },
    },
    baseURL: BASE_URL,
    database: memoryAdapter({
      account: [],
      session: [],
      user: [],
      verification: [],
    }),
    logger: { disabled: true },
    plugins: [steam({ apiKey: 'test-key' })],
    secret: 'test-secret-that-is-at-least-32-characters-long',
  });
}

type TestAuth = ReturnType<typeof createTestAuth>;

function cookieHeader(response: Response): string {
  return response.headers
    .getSetCookie()
    .map((cookie) => cookie.split(';', 1)[0])
    .join('; ');
}

async function startSignIn(auth: TestAuth) {
  const response = await auth.handler(
    new Request(`${BASE_URL}/api/auth/sign-in/steam`, {
      body: JSON.stringify({
        callbackURL: '/account',
        errorCallbackURL: '/?auth=failed',
      }),
      headers: { 'content-type': 'application/json', origin: BASE_URL },
      method: 'POST',
    })
  );
  const { url } = (await response.json()) as { url: string };
  const loginUrl = new URL(url);

  return {
    cookies: cookieHeader(response),
    loginUrl,
    returnTo: loginUrl.searchParams.get('openid.return_to') ?? '',
  };
}

function steamCallback(auth: TestAuth, returnTo: string, cookies: string) {
  const url = new URL(returnTo);
  for (const [key, value] of steamAssertion(returnTo)) {
    url.searchParams.set(key, value);
  }

  return auth.handler(
    new Request(url, { headers: { cookie: cookies }, redirect: 'manual' })
  );
}

let steamValidates = true;

function steamFetch(input: RequestInfo | URL): Promise<Response> {
  const url = input instanceof Request ? input.url : String(input);
  return Promise.resolve(
    url === STEAM_OPENID_URL
      ? checkAuthenticationResponse(steamValidates)
      : playerSummariesResponse()
  );
}

beforeEach(() => {
  steamValidates = true;
  spyOn(globalThis, 'fetch').mockImplementation(
    Object.assign(steamFetch, { preconnect: fetch.preconnect })
  );
});

afterEach(() => {
  mock.restore();
});

describe('steam plugin', () => {
  test('POST /sign-in/steam returns the Steam login URL', async () => {
    const { loginUrl, returnTo } = await startSignIn(createTestAuth());

    expect(`${loginUrl.origin}${loginUrl.pathname}`).toBe(STEAM_OPENID_URL);
    expect(loginUrl.searchParams.get('openid.realm')).toBe(BASE_URL);
    expect(loginUrl.searchParams.get('openid.mode')).toBe('checkid_setup');
    expect(returnTo).toStartWith(`${BASE_URL}/api/auth/callback/steam?state=`);
  });

  test('rejects an untrusted callbackURL', async () => {
    const response = await createTestAuth().handler(
      new Request(`${BASE_URL}/api/auth/sign-in/steam`, {
        body: JSON.stringify({ callbackURL: 'https://evil.example/' }),
        headers: { 'content-type': 'application/json', origin: BASE_URL },
        method: 'POST',
      })
    );

    expect(response.status).toBe(403);
  });

  test('GET /callback/steam signs the user in and stores the SteamID', async () => {
    const auth = createTestAuth();
    const { cookies, returnTo } = await startSignIn(auth);

    const callback = await steamCallback(auth, returnTo, cookies);
    expect(callback.status).toBe(302);
    expect(callback.headers.get('location')).toBe('/account');

    const session = await auth.api.getSession({
      headers: new Headers({ cookie: cookieHeader(callback) }),
    });
    expect(session?.user.steamId).toBe(TEST_STEAM_ID);
    expect(session?.user.name).toBe('tester');
    expect(session?.user.email).toBe(`steam_${TEST_STEAM_ID}@steam.invalid`);
    expect(session?.user.emailVerified).toBe(false);
  });

  test('a replayed callback is rejected', async () => {
    const auth = createTestAuth();
    const { cookies, returnTo } = await startSignIn(auth);

    expect((await steamCallback(auth, returnTo, cookies)).status).toBe(302);
    const replay = await steamCallback(auth, returnTo, cookies);

    expect(replay.status).toBe(302);
    expect(replay.headers.get('location')).toContain('error=');
    expect(replay.headers.getSetCookie().join()).not.toContain(
      'session_token='
    );
  });

  test('an assertion Steam does not confirm redirects with an error', async () => {
    const auth = createTestAuth();
    const { cookies, returnTo } = await startSignIn(auth);
    steamValidates = false;

    const callback = await steamCallback(auth, returnTo, cookies);

    expect(callback.status).toBe(302);
    expect(callback.headers.get('location')).toBe(
      '/?auth=failed&error=STEAM_VERIFICATION_FAILED'
    );
  });
});
