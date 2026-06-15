'use client';

import { Button } from '@workspace/ui/components/button';

import { formatBindLine } from '@/features/binds/lib/export/format-bind';
import type { BindEntry } from '@/features/binds/lib/model/types';

interface BindListProps {
  binds: BindEntry[];
  onRemove: (key: string) => void;
  onSelectKey: (key: string) => void;
  selectedKey: string | null;
}

export function BindList({
  binds,
  onRemove,
  onSelectKey,
  selectedKey,
}: BindListProps) {
  if (binds.length === 0) {
    return (
      <p className='text-muted-foreground text-sm'>No binds configured yet.</p>
    );
  }

  const sorted = binds.toSorted((a, b) => a.key.localeCompare(b.key));

  return (
    <ul className='flex flex-col gap-2'>
      {sorted.map((bind) => (
        <li
          className='flex items-start justify-between gap-3 rounded-md border p-3'
          key={bind.id}
        >
          <button
            className='min-w-0 flex-1 text-left'
            onClick={() => {
              onSelectKey(bind.key);
            }}
            type='button'
          >
            <p className='font-medium font-mono text-xs uppercase'>
              {bind.key}
              {selectedKey === bind.key ? ' (selected)' : ''}
            </p>
            <p className='mt-1 break-all font-mono text-muted-foreground text-xs'>
              {formatBindLine(bind)}
            </p>
          </button>
          <Button
            onClick={() => {
              onRemove(bind.key);
            }}
            size='sm'
            type='button'
            variant='ghost'
          >
            Remove
          </Button>
        </li>
      ))}
    </ul>
  );
}
