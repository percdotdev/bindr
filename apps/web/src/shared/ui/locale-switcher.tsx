'use client';

import { cn } from '@workspace/ui/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('locale');
  const tNav = useTranslations('nav');

  return (
    <nav
      aria-label={tNav('localeAria')}
      className={cn('flex items-center gap-1 font-mono text-[10px]', className)}
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;

        return (
          <Link
            aria-current={active ? 'page' : undefined}
            className={cn(
              'rounded-none px-1.5 py-0.5 uppercase transition-colors',
              active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            )}
            href={pathname}
            key={loc}
            locale={loc}
            title={t(loc)}
          >
            {loc}
          </Link>
        );
      })}
    </nav>
  );
}
