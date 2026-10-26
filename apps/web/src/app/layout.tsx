import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SITE } from '@/shared/lib/site';
import { SiteShell } from '@/shared/ui/site-shell';

const defaultTitle = `${SITE.name} — ${SITE.tagline}`;

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  category: 'technology',
  creator: SITE.name,
  description: SITE.description,
  keywords: [...SITE.keywords],
  metadataBase: new URL(SITE.url),
  openGraph: {
    description: SITE.description,
    locale: SITE.locale,
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
    description: SITE.description,
    title: defaultTitle,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
