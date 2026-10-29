---
name: nextjs-intl
description: "Use when setting up, configuring, or troubleshooting next-intl v4 internationalization in Next.js 16 App Router projects, especially with static export. Covers defineRouting, locale routing, message files, translations, locale switcher, hreflang generation, and static export compatibility. Do not use for next-i18next, server-side-only i18n, or non-Next.js i18n solutions."
argument-hint: "Locales to support, default locale, current error or i18n goal, whether using static export."
user-invocable: false
license: MIT
compatibility: "Requires Node.js 20.9+, Next.js 16.2.11+ (Active LTS), next-intl v4, TypeScript 7.0+, and pnpm."
paths:
  - "**/i18n/**"
  - "**/messages/**"
  - "**/[locale]/**"
metadata:
  version: "1.2.0"
  last-updated: "2026-08-28"
---

# next-intl with Next.js 16 App Router

## When To Use

- **Setup**: Installing and configuring next-intl in a Next.js 16 App Router project.
- **Routing**: Configuring locale routing with `defineRouting`, localized pathnames, and `[locale]` segments.
- **Translations**: Creating message files, using `useTranslations()`, and structuring translation namespaces.
- **Static export**: Making next-intl work with `output: 'export'` — `next/root-params` in `i18n/request.ts`, `generateStaticParams`, locale detection without proxy.
- **Components**: Building locale switcher and locale-aware navigation via `@/i18n/navigation`.
- **SEO**: Generating hreflang tags and locale-specific metadata from the routing config.

For TypeScript 7 adoption during i18n work, load `.agents/skills/typescript-7/SKILL.md`.

Do NOT use for `next-i18next` (Pages Router only), server-side-only i18n at request time, or non-Next.js i18n libraries.

## Inputs To Collect First

1. **Locales** — which locales to support (e.g., `['en', 'it']`)
2. **Default locale** — the primary language (e.g., `'en'`)
3. **Static export?** — whether the project uses `output: 'export'`
4. **Localized pathnames?** — whether URLs should be translated (e.g., `/en/about` vs `/it/chi-siamo`)
5. **Existing setup** — new installation or modifying an existing next-intl config

## Procedure

### Step 1 — Install next-intl

```bash
pnpm add next-intl
```

### Step 2 — Define Routing and Messages

1. Create `src/i18n/routing.ts` with `defineRouting` (locales, defaultLocale, optional pathnames).
2. Create `src/i18n/navigation.ts` with `createNavigation(routing)`.
3. Create `src/i18n/request.ts` with `getRequestConfig` and message imports.
4. Wrap `next.config.ts` with `createNextIntlPlugin()`.
5. Add `messages/<locale>.json` for every locale with identical key structure.

See [routing and messages](./references/routing-and-messages.md) for full templates.

### Step 3 — Configure next.config.ts

Apply `createNextIntlPlugin` wrapper. For static export, include `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.

### Step 4 — Create Message Files

One JSON file per locale under `messages/`. Keep key structure identical across locales. Use namespaces matching page or component names.

### Step 5 — Locale Proxy (development only)

**Static export (`output: 'export'`): skip `src/proxy.ts` entirely.** Configure CDN/host to redirect `/` to the default locale, or link only to locale-prefixed URLs.

**Local dev without static-only constraints:** add `src/proxy.ts` with `createMiddleware(routing)` for automatic locale detection.

See the decision tree in [routing and messages](./references/routing-and-messages.md).

### Step 6 — Locale Layout with Provider

1. Create `app/[locale]/layout.tsx` with `generateStaticParams` returning all locales.
2. Unknown locales call `notFound()` in `i18n/request.ts`, not in the layout.
3. Render `<html>` and `<body>` here. This file is the root layout — do not add `app/layout.tsx` above it.
4. Read the locale with `getLocale()` (backed by `next/root-params` in `i18n/request.ts`). Do not call `setRequestLocale`.
5. Wrap children in `NextIntlClientProvider`.

### Step 7 — Page Components with Translations

1. Server pages call `getTranslations` / `getLocale`. They do not read `params.locale` or call `setRequestLocale`.
2. Use async `params` only for segments below `[locale]` (Next.js 16).
3. Client components use `useTranslations`.
4. Import `Link`, `useRouter`, `usePathname` only from `@/i18n/navigation`.

See [page and switcher](./references/page-and-switcher.md).

### Step 8 — Root params for static rendering

`app/[locale]/layout.tsx` exports `generateStaticParams` for every locale. `i18n/request.ts` reads `locale` from `next/root-params`. Do not call `setRequestLocale`. A pass-through `app/layout.tsx` makes `[locale]` a normal param and static rendering fails.

### Step 9 — Locale Switcher Component

Build with `useLocale`, `useRouter`, and `usePathname` from `@/i18n/navigation`. Call `router.replace(pathname, { locale })` on switch.

### Step 10 — Hreflang Generation

Wire `alternates.languages` in `generateMetadata` from `routing.locales`. See [hreflang and SEO](./references/hreflang-and-seo.md).

### Step 11 — Verify Build

Run `pnpm build` and confirm all locale directories appear in `out/`.

For build errors and proxy conflicts, see [static export gotchas](./references/static-export-gotchas.md).

## Completion Checks

- [ ] `next-intl` installed via pnpm
- [ ] `src/i18n/routing.ts`, `request.ts`, and `navigation.ts` exist
- [ ] `next.config.ts` uses `createNextIntlPlugin` wrapper
- [ ] `messages/` has a JSON file for every locale with identical keys
- [ ] **Static export:** `src/proxy.ts` is absent; host/CDN handles `/` → default locale
- [ ] **Dev-only:** `src/proxy.ts` exists if using middleware for local locale routing (not static-export-only workflow)
- [ ] `app/[locale]/layout.tsx` is the root layout (`<html>`, `<body>`, `NextIntlClientProvider`, `generateStaticParams`) and `app/layout.tsx` does not exist
- [ ] `i18n/request.ts` reads `locale` from `next/root-params`; no `setRequestLocale` or `requestLocale` remains
- [ ] Pages read nested segment params only (`slug`, not `locale`)
- [ ] Locale switcher uses `useRouter` and `usePathname` from `@/i18n/navigation`
- [ ] `Link` and navigation imports come from `@/i18n/navigation`, not `next/navigation`
- [ ] `pnpm build` succeeds with all locales in `out/`

## References

- [Routing and messages](./references/routing-and-messages.md)
- [Page components and locale switcher](./references/page-and-switcher.md)
- [Hreflang and SEO](./references/hreflang-and-seo.md)
- [Static export gotchas](./references/static-export-gotchas.md)
- [External documentation](./references/external-links.md)
