import type { MetadataRoute } from 'next';

import { getGuideMetas } from '@/features/guides/lib/get-guides';
import { routing } from '@/i18n/routing';
import { SITE } from '@/shared/lib/site';

const STATIC_ROUTES = [
  '',
  '/crosshair',
  '/binds',
  '/binds/recommended',
  '/config',
  '/config/recommended',
  '/autoexec',
  '/share',
  '/guides',
];

function localizedUrl(locale: string, route: string) {
  const path = route === '' ? '' : route;
  if (locale === routing.defaultLocale) {
    return `${SITE.url}${path || '/'}`;
  }
  return `${SITE.url}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guides = getGuideMetas();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, localizedUrl(loc, route)])
          ),
        },
        changeFrequency: 'monthly',
        lastModified: now,
        priority: route === '' ? 1 : 0.7,
        url: localizedUrl(locale, route),
      });
    }

    for (const meta of guides) {
      const route = `/guides/${meta.slug}`;
      entries.push({
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((loc) => [loc, localizedUrl(loc, route)])
          ),
        },
        changeFrequency: 'monthly',
        lastModified: new Date(meta.date),
        priority: 0.5,
        url: localizedUrl(locale, route),
      });
    }
  }

  return entries;
}
