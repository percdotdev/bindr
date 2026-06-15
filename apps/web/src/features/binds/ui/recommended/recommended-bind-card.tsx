'use client';

import { Button } from '@workspace/ui/components/button';

import { formatBindLine } from '@/features/binds/lib/export/format-bind';
import type { RecommendedBindTemplate } from '@/features/binds/lib/model/types';

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
  const preview = formatBindLine({
    id: template.id,
    key: template.key,
    command: template.command,
  });

  return (
    <article className='flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='font-medium text-sm'>{template.label}</h3>
          <span className='rounded-full bg-muted px-2 py-0.5 font-mono text-[10px] uppercase'>
            {template.key}
          </span>
          {template.mmSafe ? (
            <span className='text-[10px] text-muted-foreground'>Valve MM</span>
          ) : null}
        </div>
        <p className='mt-1 text-muted-foreground text-xs'>
          {template.description}
        </p>
        <p className='mt-2 break-all font-mono text-muted-foreground text-xs'>
          {preview}
        </p>
      </div>
      <div className='flex shrink-0 gap-2'>
        {isActive ? (
          <>
            <Button disabled size='sm' type='button' variant='secondary'>
              Added
            </Button>
            <Button
              onClick={onRemove}
              size='sm'
              type='button'
              variant='outline'
            >
              Remove
            </Button>
          </>
        ) : (
          <Button onClick={onAdd} size='sm' type='button'>
            Add bind
          </Button>
        )}
      </div>
    </article>
  );
}
