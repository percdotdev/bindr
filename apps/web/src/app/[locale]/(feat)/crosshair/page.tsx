import { getLocale, getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import { CrosshairEditor } from '@/features/crosshair/ui/editor/crosshair-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.crosshair');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/crosshair',
    title: t('title'),
  });
}

export default function CrosshairPage() {
  return (
    <Suspense>
      <CrosshairEditor />
    </Suspense>
  );
}
