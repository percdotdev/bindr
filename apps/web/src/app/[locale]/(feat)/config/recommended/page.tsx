import { getLocale, getTranslations } from 'next-intl/server';

import { RecommendedConfigPage } from '@/features/config/ui/recommended/recommended-config-page';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.configRecommended');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/config/recommended',
    title: t('title'),
  });
}

export default function ConfigRecommendedPage() {
  return <RecommendedConfigPage />;
}
