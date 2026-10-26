'use client';

import { formatBindLine } from '@workspace/cs2/binds/export/format-bind';
import type { RecommendedBindTemplate } from '@workspace/cs2/binds/model/types';
import { Button } from '@workspace/ui/components/button';

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
    command: template.command,
    id: template.id,
    key: template.key,
  });

  return (
    <article className='flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='text-sm font-medium'>{template.label}</h3>
          <span className='bg-muted rounded-full px-2 py-0.5 font-mono text-[10px] uppercase'>
            {template.key}
          </span>
          {template.mmSafe ? (
            <span className='text-muted-foreground text-[10px]'>Valve MM</span>
          ) : null}
        </div>
        <p className='text-muted-foreground mt-1 text-xs'>
          {template.description}
        </p>
        <p className='text-muted-foreground mt-2 font-mono text-xs break-all'>
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
