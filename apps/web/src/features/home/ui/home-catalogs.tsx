'use client';

import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { HOME_CATALOG_LINKS } from '@/features/home/lib/home-sections';
import { Link } from '@/i18n/navigation';

export function HomeCatalogs() {
  const t = useTranslations('home');

  return (
    <section className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <h2 className='text-sm font-medium'>{t('catalogsTitle')}</h2>
        <p className='text-muted-foreground text-xs'>{t('catalogsSubtitle')}</p>
      </div>
      <div className='flex flex-wrap gap-2'>
        {HOME_CATALOG_LINKS.map((item) => (
          <Link
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outline' }),
              'inline-flex'
            )}
            href={item.href}
            key={item.href}
          >
            {t(`catalogs.${item.key}`)}
          </Link>
        ))}
      </div>
    </section>
  );
}
