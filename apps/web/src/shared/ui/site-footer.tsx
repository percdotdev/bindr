'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const FOOTER_HREFS = [
  { href: '/crosshair' as const, key: 'crosshair' as const },
  { href: '/binds' as const, key: 'binds' as const },
  { href: '/config' as const, key: 'config' as const },
  { href: '/autoexec' as const, key: 'autoexec' as const },
  { href: '/binds/recommended' as const, key: 'bindsCatalog' as const },
  { href: '/config/recommended' as const, key: 'configCatalog' as const },
  { href: '/guides' as const, key: 'guides' as const },
];

export function SiteFooter() {
  const t = useTranslations('nav');
  const tSite = useTranslations('site');

  return (
    <footer className='mx-auto mt-auto w-full max-w-4xl px-6 py-10'>
      <div className='border-foreground/10 flex flex-col gap-4 border-t pt-8'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <Link
            className='text-foreground hover:text-muted-foreground w-fit font-mono text-xs transition-colors'
            href='/'
          >
            bindr.lol
          </Link>
          <nav
            aria-label={t('footerAria')}
            className='flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs'
          >
            {FOOTER_HREFS.map((item) => (
              <Link
                className='text-muted-foreground hover:text-foreground transition-colors'
                href={item.href}
                key={item.href}
              >
                {t(`footer.${item.key}`)}
              </Link>
            ))}
          </nav>
        </div>
        <div className='text-muted-foreground flex flex-col gap-1 font-mono text-[10px] sm:flex-row sm:items-center sm:justify-between'>
          <p>{tSite('disclaimer')}</p>
          <p>
            {tSite.rich('themeHint', {
              kbd: (chunks) => (
                <kbd className='bg-muted text-foreground ring-foreground/10 rounded-none px-1 py-0.5 ring-1'>
                  {chunks}
                </kbd>
              ),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
