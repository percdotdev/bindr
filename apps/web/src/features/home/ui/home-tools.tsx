'use client';

import { useTranslations } from 'next-intl';

import { HOME_TOOLS } from '@/features/home/lib/home-sections';
import { HomeFeatureCard } from '@/features/home/ui/home-feature-card';

export function HomeTools() {
  const t = useTranslations('home');

  return (
    <section className='flex scroll-mt-8 flex-col gap-4' id='tools'>
      <div className='flex items-baseline justify-between'>
        <h2 className='text-sm font-medium'>{t('toolsTitle')}</h2>
        <p className='text-muted-foreground text-xs'>{t('toolsSubtitle')}</p>
      </div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {HOME_TOOLS.map((tool) => (
          <HomeFeatureCard
            cta={t(`tools.${tool.key}.cta`)}
            description={t(`tools.${tool.key}.description`)}
            href={tool.href}
            icon={tool.icon}
            index={tool.index}
            key={tool.href}
            title={t(`tools.${tool.key}.title`)}
          />
        ))}
      </div>
    </section>
  );
}
