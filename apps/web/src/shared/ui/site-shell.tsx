import '@workspace/ui/globals.css';

import type { ReactNode } from 'react';

import { siteFontClassName } from '@/shared/fonts/site-fonts';
import { RootProviders } from '@/shared/providers/root-providers';

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <html className={siteFontClassName} lang='en' suppressHydrationWarning>
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
