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
    url: `${SITE.url}${route}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));

  const guideEntries: MetadataRoute.Sitemap = getGuideMetas().map((meta) => ({
    url: `${SITE.url}/guides/${meta.slug}`,
    lastModified: new Date(meta.date),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticEntries, ...guideEntries];
}
