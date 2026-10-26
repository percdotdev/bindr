import { getTranslations, setRequestLocale } from 'next-intl/server';

import { AutoexecEditor } from '@/features/autoexec/ui/editor/autoexec-editor';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'pages.autoexec' });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/autoexec',
    title: t('title'),
  });
}

export default async function AutoexecPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <AutoexecEditor />;
}
