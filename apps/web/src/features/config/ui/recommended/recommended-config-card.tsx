'use client';

import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';
import { Button } from '@workspace/ui/components/button';

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
  return (
    <article className='flex flex-col gap-3 rounded-md border p-4 sm:flex-row sm:items-start sm:justify-between'>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h3 className='font-medium text-sm'>{template.label}</h3>
          {template.mmSafe ? (
            <span className='text-[10px] text-muted-foreground'>Valve MM</span>
          ) : null}
        </div>
        <p className='mt-1 text-muted-foreground text-xs'>
          {template.description}
        </p>
        <p className='mt-1 text-[10px] text-muted-foreground'>
          Source: {template.source}
        </p>
        <pre className='mt-2 overflow-x-auto rounded-md bg-muted/50 p-2 font-mono text-[11px] text-muted-foreground leading-relaxed'>
          {template.commands.join('\n')}
        </pre>
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
            Add config
          </Button>
        )}
      </div>
    </article>
  );
}
