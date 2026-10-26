import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ConfigEditor } from '@/features/config/ui/editor/config-editor';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'pages.config' });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/config',
    title: t('title'),
  });
}

export default async function ConfigPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <ConfigEditor />;
}
