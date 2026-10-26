import Link from 'next/link';

import { formatGuideDate } from '@/features/guides/lib/format-date';
import { getGuideMetas } from '@/features/guides/lib/get-guides';

export function GuidesIndex() {
  const guides = getGuideMetas();

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 md:py-16'>
      <header className='flex flex-col gap-3'>
        <p className='text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase'>
          Guides
        </p>
        <h1 className='font-mono text-2xl font-medium tracking-tight md:text-3xl'>
          Setup guides & tricks
        </h1>
        <p className='text-muted-foreground max-w-xl text-sm leading-relaxed'>
          Walkthroughs for getting the most out of your CS2 config — things the
          in-game menu won't tell you.
        </p>
      </header>

      <ul className='border-foreground/10 flex flex-col border-y'>
        {guides.map((guide) => (
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
                  {guide.title}
                </h2>
                <span className='text-muted-foreground shrink-0 font-mono text-[10px] tabular-nums'>
                  {formatGuideDate(guide.date)}
                </span>
              </div>
              <p className='text-muted-foreground text-xs leading-relaxed'>
                {guide.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
