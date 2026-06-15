import type { MDXComponents } from 'mdx/types';
import type { ComponentType } from 'react';

export interface GuideMeta {
  date: string;
  description: string;
  slug: string;
  title: string;
}

export interface GuideEntry {
  load: () => Promise<{
    default: ComponentType<{ components?: MDXComponents }>;
  }>;
  meta: GuideMeta;
}

export const GUIDES: GuideEntry[] = [
  {
    meta: {
      date: '2026-06-15',
      description:
        'Point CS2 at one cfg folder so your binds, crosshair and autoexec follow every Steam account.',
      slug: 'share-config-across-accounts',
      title: 'Share one config across every CS2 account',
    },
    load: () =>
      import('@/features/guides/content/share-config-across-accounts.mdx'),
  },
];
