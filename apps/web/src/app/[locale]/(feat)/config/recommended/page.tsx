import { getTranslations, setRequestLocale } from 'next-intl/server';

import { RecommendedConfigPage } from '@/features/config/ui/recommended/recommended-config-page';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({
    locale,
    namespace: 'pages.configRecommended',
  });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/config/recommended',
    title: t('title'),
  });
}

export default async function ConfigRecommendedPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <RecommendedConfigPage />;
}
