import type { ReactNode } from 'react';

import { SiteShell } from '@/shared/ui/site-shell';

export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
