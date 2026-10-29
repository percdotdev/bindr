import type { Metadata } from 'next';
import { getLocale, getMessages, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import '@/i18n/global';
import '@workspace/ui/globals.css';
import { routing } from '@/i18n/routing';
import { siteFontClassName } from '@/shared/fonts/site-fonts';
import { SITE, SITE_IMAGE, socialImagePath } from '@/shared/lib/site';
import { SiteShell } from '@/shared/ui/site-shell';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations('site');
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
      images: [
        {
          alt: SITE_IMAGE.alt,
          height: SITE_IMAGE.height,
          url: socialImagePath(locale),
          width: SITE_IMAGE.width,
        },
      ],
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
      images: [socialImagePath(locale)],
      title: defaultTitle,
    },
  };
}

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html className={siteFontClassName} lang={locale} suppressHydrationWarning>
      <body>
        <SiteShell locale={locale} messages={messages}>
          {children}
        </SiteShell>
      </body>
    </html>
  );
}
