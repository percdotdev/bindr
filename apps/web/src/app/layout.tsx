import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/i18n/global';
import { SITE } from '@/shared/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
};

interface Props {
  children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return children;
}
