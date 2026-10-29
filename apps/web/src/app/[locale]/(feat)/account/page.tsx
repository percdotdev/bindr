import { getLocale, getTranslations } from 'next-intl/server';

import { AccountOverview } from '@/features/auth/ui/account-overview';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations('pages.account');

  return {
    ...createPageMetadata({
      description: t('description'),
      locale,
      path: '/account',
      title: t('title'),
    }),
    robots: { follow: false, index: false },
  };
}

export default function AccountPage() {
  return <AccountOverview />;
}
