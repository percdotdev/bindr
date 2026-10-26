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
    alternates: { canonical: path },
    description,
    openGraph: {
      description,
      locale: SITE.locale,
      siteName: SITE.name,
      title: fullTitle,
      type,
      url: path,
    },
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      title: fullTitle,
    },
  };
}
