import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { SiteShell } from '@/shared/ui/site-shell';

export const metadata: Metadata = {
  title: {
    default: 'bindr.lol',
    template: '%s · bindr.lol',
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
