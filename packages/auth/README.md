# @workspace/auth

Better Auth for Bindr, with Steam as the only sign-in method.

- `src/server/auth.ts`: `getAuth()`, the lazily created server instance
  (Drizzle adapter over `@workspace/db`, database-backed rate limits).
- `src/server/env.ts`: validated `DATABASE_URL`, `BETTER_AUTH_SECRET`,
  `BETTER_AUTH_URL` and `STEAM_API_KEY`.
- `src/client/auth-client.ts`: the React client (`authClient.signIn.steam()`,
  `authClient.useSession()`).
- `src/steam/`: the Steam OpenID 2.0 plugin.

## Steam plugin

| Endpoint               | Purpose                                                        |
| ---------------------- | -------------------------------------------------------------- |
| `POST /sign-in/steam`  | Returns `{ url, redirect: true }` pointing at Steam's login.   |
| `GET /callback/steam`  | Verifies the assertion, signs in or links, then redirects.     |
| `POST /link/steam`     | Same as sign-in, but links Steam to the current session user.  |

The callback rejects the assertion unless every check passes: no duplicated
`openid.*` parameter, Steam's `op_endpoint`, a `return_to` identical to the one
we sent (including the signed `state`), an HTTPS `claimed_id` equal to
`identity`, a fresh `response_nonce` (10 minutes) that was never seen before
(stored in the `verification` table), all security fields listed in
`openid.signed`, and Steam's own `check_authentication` (10 s timeout,
redirects not followed). Callback URLs must pass `isTrustedOrigin`.
The three Steam paths are rate-limited to 10 requests per 60 s (database
storage; Better Auth only enforces rate limits in production).

Users get `steamId` (unique), the persona name and avatar from
`GetPlayerSummaries` (with a `Steam <id>` fallback when the Web API fails) and
the placeholder email `steam_<id>@steam.invalid` (`emailVerified: false`).

## Scripts

- `bun run test`: unit and integration tests (Steam is mocked).
- `bun run auth:generate`: regenerates `packages/db/src/schema/auth.ts` with
  the Better Auth CLI. Needs the env variables above; then run
  `bun run db:generate` to create the migration.

## Credits

The Steam plugin is ported to the Better Auth 1.7 APIs from
[better-auth-steam](https://github.com/ytsdv/better-auth-steam) by ytsdv,
released under the MIT License:

```text
MIT License

Copyright (c) 2026

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
