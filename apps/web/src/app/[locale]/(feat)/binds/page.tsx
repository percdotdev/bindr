import { getLocale, getTranslations } from 'next-intl/server';

import { BindEditor } from '@/features/binds/ui/editor/bind-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.binds');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/binds',
    title: t('title'),
  });
}

export default function BindsPage() {
  return <BindEditor />;
}
