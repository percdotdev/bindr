'use client';

import { useLocale, useTranslations } from 'next-intl';

import { formatGuideDate } from '@/features/guides/lib/format-date';
import { getGuideMetas } from '@/features/guides/lib/get-guides';
import { guideCopyKeys } from '@/features/guides/lib/guide-copy-keys';
import { Link } from '@/i18n/navigation';

export function GuidesIndex() {
  const t = useTranslations('guides');
  const locale = useLocale();
  const guides = getGuideMetas();

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 md:py-16'>
      <header className='flex flex-col gap-3'>
        <p className='text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase'>
          {t('eyebrow')}
        </p>
        <h1 className='font-mono text-2xl font-medium tracking-tight md:text-3xl'>
          {t('title')}
        </h1>
        <p className='text-muted-foreground max-w-xl text-sm leading-relaxed'>
          {t('subtitle')}
        </p>
      </header>

      <ul className='border-foreground/10 flex flex-col border-y'>
        {guides.map((guide) => {
          const copy = guideCopyKeys(guide.slug);

          return (
            <li
              className='border-foreground/10 border-b last:border-b-0'
              key={guide.slug}
            >
              <Link
                className='group hover:bg-muted/30 -mx-3 flex flex-col gap-1 px-3 py-5 transition-colors'
                href={`/guides/${guide.slug}`}
              >
                <div className='flex items-baseline justify-between gap-4'>
                  <h2 className='text-sm font-medium underline-offset-4 group-hover:underline'>
                    {t(copy.title)}
                  </h2>
                  <span className='text-muted-foreground shrink-0 font-mono text-[10px] tabular-nums'>
                    {formatGuideDate(guide.date, locale)}
                  </span>
                </div>
                <p className='text-muted-foreground text-xs leading-relaxed'>
                  {t(copy.description)}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
