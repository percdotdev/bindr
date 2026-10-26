import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { type AppLocale, routing } from '@/i18n/routing';

export function resolveLocale(locale: string): AppLocale {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return locale;
}
