'use client';

import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

const STUDIO_STEPS = [
  {
    href: '/crosshair',
    id: 'crosshair',
    index: '01',
    recommended: null,
  },
  {
    href: '/binds',
    id: 'binds',
    index: '02',
    recommended: '/binds/recommended',
  },
  {
    href: '/config',
    id: 'config',
    index: '03',
    recommended: '/config/recommended',
  },
  {
    href: '/autoexec',
    id: 'autoexec',
    index: '04',
    recommended: null,
  },
] as const;

type StudioStepId = (typeof STUDIO_STEPS)[number]['id'];

function stepAt(id: StudioStepId) {
  const index = STUDIO_STEPS.findIndex((step) => step.id === id);
  return { index, step: STUDIO_STEPS[index] };
}

export function StudioStepRail({ current }: { current: StudioStepId }) {
  const t = useTranslations('studio');

  return (
    <nav aria-label={t('navAria')} className='border-foreground/10 flex border'>
      {STUDIO_STEPS.map((step) => {
        const isCurrent = step.id === current;

        return (
          <Link
            aria-current={isCurrent ? 'step' : undefined}
            className={cn(
              'hover:text-foreground flex min-w-0 flex-1 items-center justify-center gap-2 px-2 py-2 text-xs transition-colors',
              isCurrent
                ? 'bg-foreground text-background'
                : 'text-muted-foreground'
            )}
            href={step.href}
            key={step.id}
          >
            <span className='font-mono text-[10px] tabular-nums'>
              {step.index}
            </span>
            <span className='truncate max-sm:sr-only'>
              {t(`steps.${step.id}.title`)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function StudioStepList() {
  const t = useTranslations('studio');

  return (
    <ol className='border-foreground/10 flex flex-col border' id='steps'>
      {STUDIO_STEPS.map((step) => (
        <li
          className='border-foreground/10 flex flex-col gap-4 border-b p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between'
          key={step.id}
        >
          <div className='flex min-w-0 flex-col gap-1'>
            <span className='text-muted-foreground font-mono text-[10px] tabular-nums'>
              {step.index}
            </span>
            <p className='text-sm font-medium'>{t(`steps.${step.id}.title`)}</p>
            <p className='text-muted-foreground max-w-md text-xs leading-relaxed'>
              {t(`steps.${step.id}.detail`)}
            </p>
          </div>
          <div className='flex shrink-0 flex-wrap gap-2'>
            <Link
              className={cn(buttonVariants({ size: 'sm' }), 'inline-flex')}
              href={step.href}
            >
              {step.id === 'autoexec' ? t('finish') : t('start')}
            </Link>
            {step.recommended ? (
              <Link
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'inline-flex'
                )}
                href={step.recommended}
              >
                {t('recommended')}
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function StudioStepPager({ current }: { current: StudioStepId }) {
  const t = useTranslations('studio');
  const { index } = stepAt(current);
  const previous = index > 0 ? STUDIO_STEPS[index - 1] : null;
  const next = index < STUDIO_STEPS.length - 1 ? STUDIO_STEPS[index + 1] : null;

  return (
    <div className='border-foreground/10 flex items-center justify-between gap-3 border-t pt-4'>
      {previous ? (
        <Link
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'inline-flex'
          )}
          href={previous.href}
        >
          {t('back', { step: t(`steps.${previous.id}.title`) })}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          className={cn(buttonVariants({ size: 'sm' }), 'inline-flex')}
          href={next.href}
        >
          {t('next', { step: t(`steps.${next.id}.title`) })}
        </Link>
      ) : null}
    </div>
  );
}
