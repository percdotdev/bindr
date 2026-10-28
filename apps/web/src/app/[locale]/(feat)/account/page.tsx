import { getTranslations, setRequestLocale } from 'next-intl/server';

import { AccountOverview } from '@/features/auth/ui/account-overview';
import { resolveLocale } from '@/i18n/locale';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'pages.account' });

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

export default async function AccountPage({ params }: Props) {
  const locale = resolveLocale((await params).locale);
  setRequestLocale(locale);

  return <AccountOverview locale={locale} />;
}
