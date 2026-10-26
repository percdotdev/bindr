'use client';

import { useTranslations } from 'next-intl';

import { HOME_STEPS } from '@/features/home/lib/home-sections';

export function HomeSteps() {
  const t = useTranslations('home');

  return (
    <section className='flex flex-col gap-5'>
      <h2 className='text-sm font-medium'>{t('stepsTitle')}</h2>
      <div className='border-foreground/10 bg-foreground/10 grid gap-px overflow-hidden border sm:grid-cols-2 lg:grid-cols-4'>
        {HOME_STEPS.map((item) => (
          <div
            className='bg-background flex flex-col gap-2 p-4'
            key={item.step}
          >
            <span className='text-muted-foreground font-mono text-[10px] tabular-nums'>
              {item.step}
            </span>
            <p className='text-sm font-medium'>
              {t(`steps.${item.key}.title`)}
            </p>
            <p className='text-muted-foreground text-xs leading-relaxed'>
              {t(`steps.${item.key}.detail`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
