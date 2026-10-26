'use client';

import { formatBindLine } from '@workspace/cs2/binds/export/format-bind';
import type { RecommendedBindTemplate } from '@workspace/cs2/binds/model/types';
import { Button } from '@workspace/ui/components/button';
import { useTranslations } from 'next-intl';

interface RecommendedBindCardProps {
  isActive: boolean;
  onAdd: () => void;
  onRemove: () => void;
  template: RecommendedBindTemplate;
}

export function RecommendedBindCard({
  isActive,
  onAdd,
  onRemove,
  template,
}: RecommendedBindCardProps) {
  const t = useTranslations('binds');
  const tCommon = useTranslations('common');
  const preview = formatBindLine({
    command: template.command,
    id: template.id,
    key: template.key,
  });
  const itemKey = template.id as
    | 'rec-smoke'
    | 'rec-flash'
    | 'rec-he'
    | 'rec-molotov'
    | 'rec-decoy'
    | 'rec-knife'
    | 'rec-drop'
    | 'rec-lineup-release'
    | 'rec-radar-zoom'
    | 'rec-radar-hud'
    | 'rec-buy-full'
    | 'rec-buy-force'
    | 'rec-buy-awp'
    | 'rec-buy-pistol'
    | 'rec-mwheel-jump'
    | 'rec-ptt'
    | 'rec-inspect'
    | 'rec-fps-toggle'
    | 'rec-build-info-toggle'
    | 'rec-hand-toggle';

  return (
    <article className='flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='text-sm font-medium'>{t(`items.${itemKey}.label`)}</h3>
          <span className='bg-muted rounded-full px-2 py-0.5 font-mono text-[10px] uppercase'>
            {template.key}
          </span>
          {template.mmSafe ? (
            <span className='text-muted-foreground text-[10px]'>
              {tCommon('valveMm')}
            </span>
          ) : null}
        </div>
        <p className='text-muted-foreground mt-1 text-xs'>
          {t(`items.${itemKey}.description`)}
        </p>
        <p className='text-muted-foreground mt-2 font-mono text-xs break-all'>
          {preview}
        </p>
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
            {t('addBind')}
          </Button>
        )}
      </div>
    </article>
  );
}
