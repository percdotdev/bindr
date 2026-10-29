import { getLocale, getTranslations } from 'next-intl/server';

import { GuidesIndex } from '@/features/guides/ui/guides-index';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.guides');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/guides',
    title: t('title'),
  });
}

export default function GuidesPage() {
  return <GuidesIndex />;
}
