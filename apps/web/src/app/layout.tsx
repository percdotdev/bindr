import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SITE } from '@/shared/lib/site';
import { SiteShell } from '@/shared/ui/site-shell';

const defaultTitle = `${SITE.name} — ${SITE.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: defaultTitle,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: 'technology',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: defaultTitle,
    description: SITE.description,
    url: SITE.url,
    locale: SITE.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
