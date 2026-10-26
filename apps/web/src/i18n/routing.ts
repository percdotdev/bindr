import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  locales: ['en', 'es'],
});

export type AppLocale = (typeof routing.locales)[number];
