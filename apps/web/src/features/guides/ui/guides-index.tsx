import Link from 'next/link';

import { formatGuideDate } from '@/features/guides/lib/format-date';
import { getGuideMetas } from '@/features/guides/lib/get-guides';

export function GuidesIndex() {
  const guides = getGuideMetas();

  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-10 md:py-16'>
      <header className='flex flex-col gap-3'>
        <p className='font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]'>
          Guides
        </p>
        <h1 className='font-medium font-mono text-2xl tracking-tight md:text-3xl'>
          Setup guides & tricks
        </h1>
        <p className='max-w-xl text-muted-foreground text-sm leading-relaxed'>
          Walkthroughs for getting the most out of your CS2 config — things the
          in-game menu won't tell you.
        </p>
      </header>

      <ul className='flex flex-col border-foreground/10 border-y'>
        {guides.map((guide) => (
          <li
            className='border-foreground/10 border-b last:border-b-0'
            key={guide.slug}
          >
            <Link
              className='group -mx-3 flex flex-col gap-1 px-3 py-5 transition-colors hover:bg-muted/30'
              href={`/guides/${guide.slug}`}
            >
              <div className='flex items-baseline justify-between gap-4'>
                <h2 className='font-medium text-sm underline-offset-4 group-hover:underline'>
                  {guide.title}
                </h2>
                <span className='shrink-0 font-mono text-[10px] text-muted-foreground tabular-nums'>
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
