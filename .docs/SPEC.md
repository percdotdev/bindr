# PROJECT BRIEF: CS2 Config & Crosshair SaaS (Web-Based)

## 1. Project Overview
A 100% web-based Software as a Service (SaaS) designed for Counter-Strike 2 (CS2) players. The platform allows users to import, visually customize, optimize, store, and share their CS2 crosshairs, keybinds (e.g., jump-throw, radar toggles), and performance configuration (`autoexec.cfg`) files. It features a premium model with private cloud storage for settings, professional/creator config marketplaces, and advanced generation tools.

## 2. Technical Stack & Infrastructure (Vercel-Friendly)
To maintain zero or minimal hosting costs, all heavy processing is offloaded to the client's browser (Frontend). The backend handles only lightweight JSON API endpoints and authentication.
* **Frontend:** Next.js (App Router), TailwindCSS, TypeScript.
* **Authentication:** Better-Auth using the Steam OAuth Provider (retrieves user's `SteamID64` securely).
* **Database:** Supabase or Neon (PostgreSQL Serverless) - storing flat JSON strings of configurations.
* **Hosting:** Vercel (Free/Hobby Tier) - highly scalable since operations are serverless and fast.
* **Payments:** Stripe API (Subscription / Marketplace Split-payouts).

## 3. Core Features & Client-Side Logic
* **No Client Downloads:** No `.exe` or Python local scripts required. The user interaction is purely web-browser based to maximize trust and minimize friction.
* **Crosshair Parsing & Generation:** Uses the open-source `csgo-sharecode` library (available via npm) to instantly decode official Valve CS2 crosshair share codes (e.g., `CSGO-XXXXX-XXXXX...`) into readable JSON objects (`gap`, `thickness`, `color`, etc.) and vice versa.
* **Interactive UI/UX:** Renders a real-time visual preview of the crosshair using Tailwind/CSS overlaying popular CS2 map backgrounds (e.g., Mirage, Dust 2).
* **Visual Bind Generator:** An interactive keyboard UI allowing users to click a key and map specific CS2 console commands visually, exporting a clean copy-pasteable script or `.cfg` file.

## 4. Developer Instructions for AI Agent
When assisting with code generation, database schemas, or routing, strictly adhere to the following implementation details:

### A. Crosshair Code Handling (Client-Side)
Use the in-repo share-code codec (ported from [girlglock/cs2-crosshair](https://github.com/girlglock/cs2-crosshair)) in Client Components. Do **not** use `csgo-sharecode` — it mishandles extended size bytes and is case-sensitive on the wrong normalization path.

```typescript
import { decodeShareCode } from '@/features/crosshair/lib/decode-share-code';
import { encodeShareCode } from '@/features/crosshair/lib/encode-share-code';

const crosshair = decodeShareCode('CSGO-AJswe-2jNcK-nMpEQ-rHV5J-5JWAB');
const shareCode = encodeShareCode(crosshair);
```

Share codes are case-sensitive. Never uppercase them before decode.

### B. Database Schema (PostgreSQL/Supabase)
Keep tables lightweight. Store configurations as stringified text or JSONB.
* **`users` Table:** Managed by Better-Auth (links `id`, `steamId`, `name`, `avatar`).
* **`configs` Table:**
  * `id` (UUID, Primary Key)
  * `user_id` (References `users.id`)
  * `title` (Text)
  * `share_code` (Text, optional official Valve code)
  * `crosshair_json` (JSONB format of the parsed properties)
  * `binds_text` (Text, containing the raw console bind commands)
  * `is_premium` (Boolean)
  * `created_at` (Timestamp)

### C. Authentication Integration (Better-Auth)
Ensure all user sessions leverage Better-Auth's Steam provider plugins. Protect private configuration routes by validating the JWT session before allowing Database CRUD operations.

### D. Scope Guardrail
* DO NOT write or suggest game memory injection (C++ internal/external cheats) or VAC-bypassing tools.
* DO NOT write game demo parsing logic (`demoinfocs-golang`) to avoid Vercel Serverless timeout limits.
* Focus purely on Web APIs, frontend state management, local storage, and database operations.

## 5. Code Organization (Screaming Architecture)

Structure reveals **what the app does**, not technical layers. Follow these rules for every feature.

### Layout rules
* A directory contains **either** files **or** subdirectories — never both.
* Keep files small and single-purpose. Split hooks, lib, and UI within features.
* Route files in `app/` are thin adapters — logic lives in `features/`.
* Add shadcn components via CLI **when a feature needs them**, not in bulk upfront.
* Prefer client-side logic for heavy work (crosshair parse/encode, preview, bind generation).

### `apps/web/src/`

```
app/           → Next.js routes only (one page.tsx per segment)
features/      → domain features (crosshair, binds, auth, …)
  {feature}/
    hooks/     → client hooks
    lib/       → pure utilities, types, defaults
    ui/        → components
shared/        → cross-cutting app shell
  fonts/
  providers/
  ui/
```

### `packages/ui/src/`
Design system (shadcn). Import: `@workspace/ui/components/{name}`

### Build order
1. **Core value loop first** (e.g. crosshair import → preview → export) without auth.
2. **Auth + DB** once users need to save configs.
3. **Premium / marketplace / payments** last.