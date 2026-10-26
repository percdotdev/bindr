'use client';

import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';
import { Button } from '@workspace/ui/components/button';
import { useTranslations } from 'next-intl';

interface RecommendedConfigCardProps {
  isActive: boolean;
  onAdd: () => void;
  onRemove: () => void;
  template: RecommendedConfigTemplate;
}

export function RecommendedConfigCard({
  isActive,
  onAdd,
  onRemove,
  template,
}: RecommendedConfigCardProps) {
  const t = useTranslations('config');
  const tCommon = useTranslations('common');
  const itemKey = template.id as
    | 'rec-vm-valve'
    | 'rec-vm-wide'
    | 'rec-mouse-raw'
    | 'rec-radar-lineups'
    | 'rec-radar-pro'
    | 'rec-network-competitive'
    | 'rec-network-ping-cap'
    | 'rec-audio-clean'
    | 'rec-perf-no-tracers'
    | 'rec-perf-fps'
    | 'rec-perf-no-clutter'
    | 'rec-perf-low-latency'
    | 'rec-hud-classic-sniper-scope'
    | 'rec-hud-hide-build-info'
    | 'rec-hud-teamid-fade'
    | 'rec-hud-readable';

  return (
    <article className='flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='text-sm font-medium'>{t(`items.${itemKey}.label`)}</h3>
          {template.mmSafe ? (
            <span className='text-muted-foreground text-[10px]'>
              {tCommon('valveMm')}
            </span>
          ) : null}
        </div>
        <p className='text-muted-foreground mt-1 text-xs'>
          {t(`items.${itemKey}.description`)}
        </p>
        <p className='text-muted-foreground mt-1 text-[10px]'>
          {tCommon('source', { source: template.source })}
        </p>
        <pre className='bg-muted/50 text-muted-foreground mt-2 overflow-x-auto rounded-md p-2 font-mono text-[11px] leading-relaxed'>
          {template.commands.join('\n')}
        </pre>
      </div>
      <div className='flex shrink-0 gap-2'>
        {isActive ? (
          <>
            <Button disabled size='sm' type='button' variant='secondary'>
              {tCommon('added')}
            </Button>
            <Button
              onClick={onRemove}
              size='sm'
              type='button'
              variant='outline'
            >
              {tCommon('remove')}
            </Button>
          </>
        ) : (
          <Button onClick={onAdd} size='sm' type='button'>
            {t('addConfig')}
          </Button>
        )}
      </div>
    </article>
  );
}
