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

### A. Crosshair Code Handling (Node.js/Next.js)
Use the `csgo-sharecode` library inside Next.js API routes or Client Components to parse and encode Valve share codes.

```javascript
import { decode, encode } from 'csgo-sharecode';

// Decoding a Valve code to JSON for UI state
const crosshairProps = decode("CSGO-OCskf-qjunY-..."); 

// Encoding UI state back to a Valve official share code
const valveCode = encode({
  cl_crosshairsize: 2,
  cl_crosshairthickness: 1,
  cl_crosshairgap: -2,
  cl_crosshair_drawoutline: 1,
});
```

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