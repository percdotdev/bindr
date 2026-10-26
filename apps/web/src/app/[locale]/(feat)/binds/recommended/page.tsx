import { getTranslations, setRequestLocale } from 'next-intl/server';

import { RecommendedBindsPage } from '@/features/binds/ui/recommended/recommended-binds-page';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({
    locale,
    namespace: 'pages.bindsRecommended',
  });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/binds/recommended',
    title: t('title'),
  });
}

export default async function BindsRecommendedPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <RecommendedBindsPage />;
}
