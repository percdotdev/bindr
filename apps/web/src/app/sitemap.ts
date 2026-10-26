import type { MetadataRoute } from 'next';
import { getGuideMetas } from '@/features/guides/lib/get-guides';
import { SITE } from '@/shared/lib/site';

const STATIC_ROUTES = [
  '',
  '/crosshair',
  '/binds',
  '/binds/recommended',
  '/config',
  '/config/recommended',
  '/autoexec',
  '/guides',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    changeFrequency: 'monthly',
    lastModified: now,
    priority: route === '' ? 1 : 0.7,
    url: `${SITE.url}${route}`,
  }));

  const guideEntries: MetadataRoute.Sitemap = getGuideMetas().map((meta) => ({
    changeFrequency: 'monthly',
    lastModified: new Date(meta.date),
    priority: 0.5,
    url: `${SITE.url}/guides/${meta.slug}`,
  }));

  return [...staticEntries, ...guideEntries];
}
