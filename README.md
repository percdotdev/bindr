# bindr.lol

Browser-only CS2 config studio: crosshairs, binds, game settings and autoexec
export. No downloads, no cheats, no accounts. A share link is how a config
leaves the tab.

The product and engineering spec lives in [`.docs/SPEC.md`](.docs/SPEC.md);
repo rules for agents are in [`AGENTS.md`](AGENTS.md).

## Workspace

| Package | What it holds |
| ------- | ------------- |
| `apps/web` | Next.js 16 app (next-intl, `en` + `es`) |
| `packages/cs2` | Pure CS2 domain core (share codes, binds, config, autoexec) |
| `packages/ui` | Design system (shadcn) |
| `packages/ts-config`, `packages/biome-config` | Shared TypeScript and Ultracite presets |

## Development

Requires Bun 1.4 and Node 22. No environment variables.

```bash
bun install
bun run dev        # http://localhost:3000
bun run build
bun run typecheck
bun run test
bun x ultracite check
```

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
