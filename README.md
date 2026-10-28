# bindr.lol

Browser-only CS2 config studio: crosshairs, binds, game settings and autoexec
export. No downloads, no cheats. Sign in with Steam to get an account (cloud
save comes next).

The product and engineering spec lives in [`.docs/SPEC.md`](.docs/SPEC.md);
repo rules for agents are in [`AGENTS.md`](AGENTS.md).

## Workspace

| Package | What it holds |
| ------- | ------------- |
| `apps/web` | Next.js 16 app (next-intl, `en` + `es`) |
| `packages/auth` | Better Auth server + client and the Steam OpenID plugin |
| `packages/db` | Drizzle + Neon client, generated auth schema, migrations |
| `packages/cs2` | Pure CS2 domain core (share codes, binds, config, autoexec) |
| `packages/ui` | Design system (shadcn) |
| `packages/ts-config`, `packages/biome-config` | Shared TypeScript and Ultracite presets |

## Development

Requires Bun 1.4 and Node 22.

```bash
bun install
bun run dev        # http://localhost:3000
bun run build
bun run typecheck
bun run test       # bun test (Steam is mocked)
bun x ultracite check
```

The editors work without any environment variables. Sign-in needs the auth
setup below.

## Auth setup (Steam)

1. Create a Neon database (Vercel Marketplace on deploys).
2. Get a Steam Web API key at <https://steamcommunity.com/dev/apikey>.
3. Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in
   `DATABASE_URL` (pooled), `BETTER_AUTH_SECRET` (`openssl rand -base64 32`),
   `BETTER_AUTH_URL=http://localhost:3000` and `STEAM_API_KEY`.
4. Copy `packages/db/.env.example` to `packages/db/.env` with the direct
   (non-pooler) Neon `DATABASE_URL`, then apply the migrations:

   ```bash
   bun run db:migrate
   ```

5. `bun run dev` and click **Sign in with Steam**.

`BETTER_AUTH_URL` is also the Steam OpenID realm, so set it per environment
(production, and any preview you want to sign in on). Real values only go in
the gitignored env files and in Vercel project settings.

Schema changes: `bun run auth:generate` regenerates
`packages/db/src/schema/auth.ts` from the Better Auth config (needs the env
variables), then `bun run db:generate` writes a new migration.

## Adding components

Add shadcn components from the root of the `web` app; they land in
`packages/ui/src/components`:

```bash
bun x shadcn@latest add button -c apps/web
```

Import them from the `ui` package:

```tsx
import { Button } from '@workspace/ui/components/button';
```

## Credits

The Steam plugin in `packages/auth/src/steam/` is ported to the Better Auth
1.7 APIs from [better-auth-steam](https://github.com/ytsdv/better-auth-steam)
by ytsdv (MIT). The full license is in
[`packages/auth/README.md`](packages/auth/README.md#credits).
