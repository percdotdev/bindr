import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { Crosshair, Keyboard, SlidersHorizontal, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { HomeFeatureCard } from '@/features/home/ui/home-feature-card';

const CATALOG_LINKS = [
  { href: '/binds/recommended', label: 'Recommended binds' },
  { href: '/config/recommended', label: 'Recommended config' },
] as const;

const VALUE_PROPS = [
  {
    label: 'Browser-only',
    detail: 'Parse, preview, and export without installing anything.',
  },
  {
    label: 'MM-safe defaults',
    detail:
      'Binds and cvars follow current Valve rules — no banned aliases or scripts.',
  },
  {
    label: 'Your config, local-first',
    detail: 'Edits persist in the browser until cloud save ships.',
  },
] as const;

export function HomePage() {
  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-14 px-6 py-10 md:py-16'>
      <section className='flex flex-col gap-6'>
        <p className='font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]'>
          Counter-Strike 2 config studio
        </p>
        <div className='flex flex-col gap-4'>
          <h1 className='font-medium font-mono text-3xl tracking-tight md:text-4xl'>
            bindr.lol
          </h1>
          <p className='max-w-xl text-muted-foreground text-sm leading-relaxed md:text-base'>
            Tune your crosshair on map previews, build binds from a visual
            keyboard, and dial in game cvars — then copy console commands or
            drop a cfg into your game folder. No downloads, no cheats.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <Link
            className={cn(buttonVariants(), 'inline-flex')}
            href='/crosshair'
          >
            Crosshair editor
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'inline-flex'
            )}
            href='/binds'
          >
            Bind generator
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'inline-flex'
            )}
            href='/config'
          >
            Game config
          </Link>
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-medium text-sm'>Tools</h2>
          <p className='text-muted-foreground text-xs'>
            Everything runs client-side — fast previews, no uploads required.
          </p>
        </div>
        <div className='grid gap-4 md:grid-cols-3'>
          <HomeFeatureCard
            cta='Open editor'
            description='Decode CSGO share codes, tweak gap, color, and style, preview on Mirage or Dust II, export console commands.'
            href='/crosshair'
            icon={Crosshair}
            title='Crosshair editor'
          />
          <HomeFeatureCard
            cta='Build binds'
            description='Click keys on a keyboard layout, assign commands, and export grouped bind lines or a ready-to-paste cfg.'
            href='/binds'
            icon={Keyboard}
            title='Bind generator'
          />
          <HomeFeatureCard
            cta='Tune cvars'
            description='Adjust viewmodel, mouse, radar, network, audio, performance and HUD cvars with sliders, then export a cfg.'
            href='/config'
            icon={SlidersHorizontal}
            title='Game config'
          />
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <Sparkles aria-hidden className='size-4 text-muted-foreground' />
          <h2 className='font-medium text-sm'>Curated catalogs</h2>
        </div>
        <p className='text-muted-foreground text-xs'>
          Start from MM-safe 2026 meta presets and keep only what you want.
        </p>
        <div className='flex flex-wrap gap-2'>
          {CATALOG_LINKS.map((item) => (
            <Link
              className={cn(
                buttonVariants({ size: 'sm', variant: 'outline' }),
                'inline-flex'
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className='grid gap-6 border-foreground/10 border-t pt-10 sm:grid-cols-3'>
        {VALUE_PROPS.map((item) => (
          <div className='flex flex-col gap-1' key={item.label}>
            <p className='font-medium text-xs'>{item.label}</p>
            <p className='text-muted-foreground text-xs leading-relaxed'>
              {item.detail}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
