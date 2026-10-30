import { getLocale, getTranslations } from 'next-intl/server';

import { RecommendedBindsPage } from '@/features/binds/ui/recommended/recommended-binds-page';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.bindsRecommended');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/binds/recommended',
    title: t('title'),
  });
}

export default function BindsRecommendedPage() {
  return <RecommendedBindsPage />;
}
