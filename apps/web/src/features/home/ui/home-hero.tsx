import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import Link from 'next/link';

import { HomeConsole } from '@/features/home/ui/home-console';

export function HomeHero() {
  return (
    <section className='grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]'>
      <div className='flex flex-col gap-6'>
        <p className='inline-flex w-fit items-center gap-2 border border-foreground/10 bg-muted/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]'>
          <span className='size-1.5 rounded-full bg-foreground/40' />
          Counter-Strike 2 config studio
        </p>
        <div className='flex flex-col gap-4'>
          <h1 className='font-medium font-mono text-4xl tracking-tight md:text-5xl'>
            bindr.lol
          </h1>
          <p className='max-w-xl text-muted-foreground text-sm leading-relaxed md:text-base'>
            Build your crosshair, binds and game cvars in the browser, then copy
            console commands or drop one{' '}
            <code className='bg-muted px-1 py-0.5 font-mono text-foreground text-xs'>
              autoexec.cfg
            </code>{' '}
            into your game folder. No downloads, no cheats.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Link
            className={cn(buttonVariants(), 'inline-flex')}
            href='/crosshair'
          >
            Start with crosshair
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'inline-flex'
            )}
            href='/autoexec'
          >
            Compose autoexec
          </Link>
        </div>
      </div>
      <HomeConsole />
    </section>
  );
}
