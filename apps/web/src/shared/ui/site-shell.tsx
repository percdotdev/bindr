import '@workspace/ui/globals.css';

import type { ReactNode } from 'react';

import { siteFontClassName } from '@/shared/fonts/site-fonts';
import { RootProviders } from '@/shared/providers/root-providers';
import { SiteFooter } from '@/shared/ui/site-footer';
import { SiteNav } from '@/shared/ui/site-nav';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <html className={siteFontClassName} lang='en' suppressHydrationWarning>
      <body>
        <RootProviders>
          <div className='flex min-h-svh flex-col'>
            <SiteNav />
            <div className='flex-1'>{children}</div>
            <SiteFooter />
          </div>
        </RootProviders>
      </body>
    </html>
  );
}
