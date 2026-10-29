import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';

import type { AppLocale } from '@/i18n/routing';
import { RootProviders } from '@/shared/providers/root-providers';
import { SiteBreadcrumb } from '@/shared/ui/site-breadcrumb';
import { SiteFooter } from '@/shared/ui/site-footer';
import { SiteNav } from '@/shared/ui/site-nav';

interface Props {
  children: ReactNode;
  locale: AppLocale;
  messages: AbstractIntlMessages;
}

export function SiteShell({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <RootProviders>
        <div className='flex min-h-svh flex-col'>
          <SiteNav />
          <SiteBreadcrumb />
          <div className='flex-1'>{children}</div>
          <SiteFooter />
        </div>
      </RootProviders>
    </NextIntlClientProvider>
  );
}
