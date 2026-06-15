'use client';

import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

import {
  KEYBOARD_COLUMN_COUNT,
  KEYBOARD_LAYOUT,
  KEYBOARD_ROW_COUNT,
} from '@/features/binds/lib/model/keyboard-layout';
import type { BindEntry } from '@/features/binds/lib/model/types';

interface KeyboardLayoutProps {
  binds: BindEntry[];
  onSelectKey: (key: string) => void;
  selectedKey: string | null;
}

export function KeyboardLayout({
  binds,
  onSelectKey,
  selectedKey,
}: KeyboardLayoutProps) {
  const boundKeys = new Set(binds.map((bind) => bind.key));

  return (
    <div className='overflow-x-auto'>
      <div
        className='inline-grid min-w-max gap-1'
        style={{
          gridTemplateColumns: `repeat(${KEYBOARD_COLUMN_COUNT}, minmax(0, 2.75rem))`,
          gridTemplateRows: `repeat(${KEYBOARD_ROW_COUNT}, minmax(0, 2.5rem))`,
        }}
      >
        {KEYBOARD_LAYOUT.map((key) => (
          <Button
            className={cn(
              'h-10 px-1 font-mono text-[10px] uppercase',
              boundKeys.has(key.bindKey) &&
                'border-primary/50 bg-primary/10 text-primary',
              selectedKey === key.bindKey && 'ring-2 ring-primary ring-offset-2'
            )}
            key={key.bindKey}
            onClick={() => {
              onSelectKey(key.bindKey);
            }}
            size='sm'
            style={{
              gridColumn: `${key.col + 1} / span ${key.colSpan ?? 1}`,
              gridRow: key.row + 1,
            }}
            type='button'
            variant='outline'
          >
            {key.label}
          </Button>
        ))}
      </div>
      <p className='mt-2 text-muted-foreground text-xs'>
        Mouse keys and ANSI layout. Highlighted keys have a bind assigned.
      </p>
    </div>
  );
}
