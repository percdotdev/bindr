import type { MetadataRoute } from 'next';
import { SITE } from '@/shared/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE.url,
    rules: { allow: '/', userAgent: '*' },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
