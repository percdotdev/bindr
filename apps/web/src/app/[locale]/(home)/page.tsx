import { getTranslations, setRequestLocale } from 'next-intl/server';

import { HomePage } from '@/features/home/ui/home-page';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'pages.home' });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/',
    title: t('title'),
  });
}

export default async function Page({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <HomePage />;
}
