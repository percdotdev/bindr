import { notFound } from 'next/navigation';
import { locale as rootLocale } from 'next/root-params';
import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  // Callers such as Route Handlers pass `locale` explicitly. Everywhere else
  // the `[locale]` root param is the source of truth.
  const requested = locale ?? (await rootLocale());

  if (!hasLocale(routing.locales, requested)) {
    notFound();
  }

  return {
    locale: requested,
    messages: (await import(`../../messages/${requested}.json`)).default,
  };
});
