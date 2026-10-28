import { createDatabase } from '@workspace/db/client/database';
import {
  account,
  rateLimit,
  session,
  user,
  verification,
} from '@workspace/db/schema/auth';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { steam } from '../steam/plugin';
import type { AuthEnv } from './env';
import { readAuthEnv } from './env';

export function createAuth(env: AuthEnv) {
  return betterAuth({
    account: {
      accountLinking: {
        // Steam users get a placeholder email, so linking can never rely on
        // matching addresses; the Steam assertion itself is the proof.
        allowDifferentEmails: true,
        trustedProviders: ['steam'],
      },
    },
    baseURL: env.BETTER_AUTH_URL,
    database: drizzleAdapter(createDatabase(env.DATABASE_URL), {
      provider: 'pg',
      schema: { account, rateLimit, session, user, verification },
    }),
    plugins: [steam({ apiKey: env.STEAM_API_KEY })],
    // Serverless instances share no memory, so counters live in Postgres.
    rateLimit: { storage: 'database' },
    secret: env.BETTER_AUTH_SECRET,
  });
}

export type Auth = ReturnType<typeof createAuth>;

let auth: Auth | undefined;

/**
 * The app's auth instance, created on first use. Deferring env validation
 * keeps `next build` free of runtime secrets: route modules are evaluated
 * while collecting page data, but only requests touch the database.
 */
export function getAuth(): Auth {
  auth ??= createAuth(readAuthEnv());
  return auth;
}
