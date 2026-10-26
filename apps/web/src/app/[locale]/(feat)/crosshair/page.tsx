import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { CrosshairEditor } from '@/features/crosshair/ui/editor/crosshair-editor';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'pages.crosshair' });

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/crosshair',
    title: t('title'),
  });
}

export default async function CrosshairPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return (
    <Suspense>
      <CrosshairEditor />
    </Suspense>
  );
}
