# Page Components and Locale Switcher

## Locale layout (`src/app/[locale]/layout.tsx`)

This file is the root layout. It renders `<html>` and `<body>`. Do not add `app/layout.tsx` above it — that stops `[locale]` from being a root param. Unknown locales are rejected in `i18n/request.ts`.

```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Server page pattern

Read the locale with `getLocale()` / `getTranslations()`. Do not take it from `params` and do not call `setRequestLocale`.

```typescript
import { getTranslations } from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <main>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </main>
  );
}
```

## Client component pattern

```typescript
'use client';

import { useTranslations } from 'next-intl';

export function HeroSection() {
  const t = useTranslations('home.hero');
  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </section>
  );
}
```

## Rich text and interpolation

```typescript
t('greeting', { name: 'Roman' });

t.rich('terms', {
  link: (chunks) => <a href="/terms">{chunks}</a>,
});
```

## Locale for static rendering

`generateStaticParams` on `app/[locale]/layout.tsx` is still required. Static rendering comes from `next/root-params` inside `i18n/request.ts`, not from `setRequestLocale`. Pages do not read `params.locale`.

## Locale switcher

```typescript
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => router.replace(pathname, { locale: loc })}
          disabled={loc === locale}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
```

Must use `useRouter` and `usePathname` from `@/i18n/navigation`, not `next/navigation`.
