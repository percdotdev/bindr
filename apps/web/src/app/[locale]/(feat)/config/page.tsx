import { getLocale, getTranslations } from 'next-intl/server';

import { ConfigEditor } from '@/features/config/ui/editor/config-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.config');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/config',
    title: t('title'),
  });
}

export default function ConfigPage() {
  return <ConfigEditor />;
}
