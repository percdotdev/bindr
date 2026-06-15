import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import {
  Crosshair,
  FileCode2,
  Keyboard,
  SlidersHorizontal,
} from 'lucide-react';
import Link from 'next/link';

import { HomeConsole } from '@/features/home/ui/home-console';
import { HomeFeatureCard } from '@/features/home/ui/home-feature-card';

const TOOLS = [
  {
    index: '01',
    href: '/crosshair',
    icon: Crosshair,
    title: 'Crosshair editor',
    description:
      'Decode CSGO share codes, tweak gap, color and style, preview on real maps, export console commands.',
    cta: 'Open editor',
  },
  {
    index: '02',
    href: '/binds',
    icon: Keyboard,
    title: 'Bind generator',
    description:
      'Assign commands on a visual keyboard and export grouped bind lines or a ready-to-paste cfg.',
    cta: 'Build binds',
  },
  {
    index: '03',
    href: '/config',
    icon: SlidersHorizontal,
    title: 'Game config',
    description:
      'Dial in viewmodel, mouse, radar, network, audio, performance and HUD cvars with sliders.',
    cta: 'Tune cvars',
  },
  {
    index: '04',
    href: '/autoexec',
    icon: FileCode2,
    title: 'Autoexec composer',
    description:
      'Merge crosshair, config and binds into one autoexec.cfg with per-section toggles.',
    cta: 'Compose cfg',
  },
] as const;

const STEPS = [
  {
    step: '01',
    title: 'Import',
    detail: 'Paste a share code or start from MM-safe 2026 presets.',
  },
  {
    step: '02',
    title: 'Customize',
    detail: 'Sliders, toggles and a visual keyboard — no syntax to memorize.',
  },
  {
    step: '03',
    title: 'Preview',
    detail: 'Crosshairs render on real maps; cfg output updates live.',
  },
  {
    step: '04',
    title: 'Export',
    detail: 'Copy console commands or download a single autoexec.cfg.',
  },
] as const;

const CATALOG_LINKS = [
  { href: '/binds/recommended', label: 'Recommended binds' },
  { href: '/config/recommended', label: 'Recommended config' },
] as const;

const VALUE_PROPS = [
  {
    label: 'Browser-only',
    detail: 'Parse, preview and export without installing anything.',
  },
  {
    label: 'MM-safe defaults',
    detail: 'Binds and cvars follow current Valve rules — no banned scripts.',
  },
  {
    label: 'Local-first',
    detail: 'Edits persist in your browser until cloud save ships.',
  },
] as const;

export function HomePage() {
  return (
    <main className='mx-auto flex w-full max-w-4xl flex-col gap-16 px-6 py-12 md:py-20'>
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
              Build your crosshair, binds and game cvars in the browser, then
              copy console commands or drop one{' '}
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

      <section className='flex flex-col gap-4'>
        <div className='flex items-baseline justify-between'>
          <h2 className='font-medium text-sm'>Tools</h2>
          <p className='text-muted-foreground text-xs'>
            Everything client-side
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {TOOLS.map((tool) => (
            <HomeFeatureCard
              cta={tool.cta}
              description={tool.description}
              href={tool.href}
              icon={tool.icon}
              index={tool.index}
              key={tool.href}
              title={tool.title}
            />
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-5'>
        <h2 className='font-medium text-sm'>How it works</h2>
        <div className='grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4'>
          {STEPS.map((item) => (
            <div
              className='flex flex-col gap-2 bg-background p-4'
              key={item.step}
            >
              <span className='font-mono text-[10px] text-muted-foreground tabular-nums'>
                {item.step}
              </span>
              <p className='font-medium text-sm'>{item.title}</p>
              <p className='text-muted-foreground text-xs leading-relaxed'>
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <h2 className='font-medium text-sm'>Curated catalogs</h2>
          <p className='text-muted-foreground text-xs'>
            Start from MM-safe 2026 meta presets and keep only what you want.
          </p>
        </div>
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
