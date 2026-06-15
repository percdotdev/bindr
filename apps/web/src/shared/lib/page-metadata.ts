import type { Metadata } from 'next';
import { SITE } from '@/shared/lib/site';

interface PageMetadataInput {
  description: string;
  path: string;
  title: string;
  type?: 'website' | 'article';
}

export function createPageMetadata({
  title,
  description,
  path,
  type = 'website',
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} · ${SITE.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE.name,
      title: fullTitle,
      description,
      url: path,
      locale: SITE.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
