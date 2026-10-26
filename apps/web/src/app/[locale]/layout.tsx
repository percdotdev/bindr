import type { Metadata } from 'next';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import type { ReactNode } from 'react';

import { resolveLocale } from '@/i18n/locale';
import { routing } from '@/i18n/routing';
import { SITE } from '@/shared/lib/site';
import { SiteShell } from '@/shared/ui/site-shell';

interface Props {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const t = await getTranslations({ locale, namespace: 'site' });
  const defaultTitle = `${SITE.name} — ${t('tagline')}`;
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [
      loc,
      loc === routing.defaultLocale ? '/' : `/${loc}`,
    ])
  );

  return {
    alternates: {
      canonical: locale === routing.defaultLocale ? '/' : `/${locale}`,
      languages: {
        ...languages,
        'x-default': '/',
      },
    },
    applicationName: SITE.name,
    authors: [{ name: SITE.name, url: SITE.url }],
    category: 'technology',
    creator: SITE.name,
    description: t('description'),
    keywords: [...SITE.keywords],
    metadataBase: new URL(SITE.url),
    openGraph: {
      description: t('description'),
      locale: SITE.ogLocales[locale],
      siteName: SITE.name,
      title: defaultTitle,
      type: 'website',
      url: SITE.url,
    },
    publisher: SITE.name,
    robots: {
      follow: true,
      googleBot: { follow: true, index: true },
      index: true,
    },
    title: {
      default: defaultTitle,
      template: `%s · ${SITE.name}`,
    },
    twitter: {
      card: 'summary_large_image',
      description: t('description'),
      title: defaultTitle,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = resolveLocale((await params).locale);

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <SiteShell locale={locale} messages={messages}>
      {children}
    </SiteShell>
  );
}
