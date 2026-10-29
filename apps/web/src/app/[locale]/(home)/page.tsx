import { getLocale, getTranslations } from 'next-intl/server';

import { HomePage } from '@/features/home/ui/home-page';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.home');

  return createPageMetadata({
    description: t('description'),
    locale,
    path: '/',
    title: t('title'),
  });
}

export default function Page() {
  return <HomePage />;
}
