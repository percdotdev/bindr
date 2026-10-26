import type { Metadata } from 'next';

import type { AppLocale } from '@/i18n/routing';
import { routing } from '@/i18n/routing';
import { SITE } from '@/shared/lib/site';

interface PageMetadataInput {
  description: string;
  locale: AppLocale;
  path: string;
  title: string;
  type?: 'website' | 'article';
}

export function createPageMetadata({
  title,
  description,
  locale,
  path,
  type = 'website',
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} · ${SITE.name}`;
  const localizedPath =
    locale === routing.defaultLocale ? path : `/${locale}${path}`;
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [
      loc,
      loc === routing.defaultLocale ? path : `/${loc}${path}`,
    ])
  );

  return {
    alternates: {
      canonical: localizedPath,
      languages: {
        ...languages,
        'x-default': path,
      },
    },
    description,
    openGraph: {
      description,
      locale: SITE.ogLocales[locale],
      siteName: SITE.name,
      title: fullTitle,
      type,
      url: localizedPath,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      title: fullTitle,
    },
  };
}
