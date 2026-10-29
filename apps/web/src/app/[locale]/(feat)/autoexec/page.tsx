import { getLocale, getTranslations } from 'next-intl/server';

import { AutoexecEditor } from '@/features/autoexec/ui/editor/autoexec-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.autoexec');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/autoexec',
    title: t('title'),
  });
}

export default function AutoexecPage() {
  return <AutoexecEditor />;
}
