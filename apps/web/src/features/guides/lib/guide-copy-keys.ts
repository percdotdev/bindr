import type { GuideSlug } from '@/features/guides/lib/registry';

const GUIDE_COPY_KEYS = {
  'share-config-across-accounts': {
    description: 'share-config-across-accounts.description',
    title: 'share-config-across-accounts.title',
  },
} as const satisfies Record<
  GuideSlug,
  { description: `${GuideSlug}.description`; title: `${GuideSlug}.title` }
>;

export function guideCopyKeys(slug: GuideSlug) {
  return GUIDE_COPY_KEYS[slug];
}
