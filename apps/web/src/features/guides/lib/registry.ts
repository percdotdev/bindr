import type { MDXComponents } from 'mdx/types';
import type { ComponentType } from 'react';

import type { AppLocale } from '@/i18n/routing';

export type GuideSlug = 'share-config-across-accounts';

export interface GuideMeta {
  date: string;
  slug: GuideSlug;
}

export interface GuideEntry {
  load: (locale: AppLocale) => Promise<{
    default: ComponentType<{ components?: MDXComponents }>;
  }>;
  meta: GuideMeta;
}

export const GUIDES: GuideEntry[] = [
  {
    load: (locale) =>
      locale === 'es'
        ? import(
            '@/features/guides/content/share-config-across-accounts.es.mdx'
          )
        : import('@/features/guides/content/share-config-across-accounts.mdx'),
    meta: {
      date: '2026-06-15',
      slug: 'share-config-across-accounts',
    },
  },
];
