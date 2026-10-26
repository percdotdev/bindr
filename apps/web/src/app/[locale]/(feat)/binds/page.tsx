import { getTranslations, setRequestLocale } from 'next-intl/server';

import { BindEditor } from '@/features/binds/ui/editor/bind-editor';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'pages.binds' });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/binds',
    title: t('title'),
  });
}

export default async function BindsPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <BindEditor />;
}
