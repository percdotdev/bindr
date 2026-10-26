import { getTranslations, setRequestLocale } from 'next-intl/server';

import { GuidesIndex } from '@/features/guides/ui/guides-index';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'pages.guides' });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/guides',
    title: t('title'),
  });
}

export default async function GuidesPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <GuidesIndex />;
}
