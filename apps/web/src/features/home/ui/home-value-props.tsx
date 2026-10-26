'use client';

import { useTranslations } from 'next-intl';

import { HOME_VALUE_PROPS } from '@/features/home/lib/home-sections';

export function HomeValueProps() {
  const t = useTranslations('home');

  return (
    <section className='border-foreground/10 grid gap-6 border-t pt-10 sm:grid-cols-3'>
      {HOME_VALUE_PROPS.map((item) => (
        <div className='flex flex-col gap-1' key={item.key}>
          <p className='text-xs font-medium'>{t(`values.${item.key}.label`)}</p>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            {t(`values.${item.key}.detail`)}
          </p>
        </div>
      ))}
    </section>
  );
}
