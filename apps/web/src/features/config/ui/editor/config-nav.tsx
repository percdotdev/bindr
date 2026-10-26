'use client';

import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';

export function ConfigNav() {
  const pathname = usePathname();
  const t = useTranslations('common');
  const tConfig = useTranslations('config');

  const items = [
    { href: '/config' as const, label: t('editor') },
    { href: '/config/recommended' as const, label: t('recommended') },
  ];

  return (
    <nav aria-label={tConfig('navAria')} className='flex flex-wrap gap-2'>
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: isActive ? 'default' : 'outline',
              }),
              'inline-flex'
            )}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
