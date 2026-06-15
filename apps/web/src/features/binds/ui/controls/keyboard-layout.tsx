'use client';

import {
  KEYBOARD_COLUMN_COUNT,
  KEYBOARD_LAYOUT,
  KEYBOARD_ROW_COUNT,
} from '@workspace/cs2/binds/model/keyboard-layout';
import type { BindEntry } from '@workspace/cs2/binds/model/types';
import { Button } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';

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
    <div className='flex w-full flex-col items-center gap-2'>
      <div className='w-full overflow-x-auto'>
        <div className='mx-auto w-max p-2'>
          <div
            className='inline-grid gap-1'
            style={{
              gridTemplateColumns: `repeat(${KEYBOARD_COLUMN_COUNT}, 2.75rem)`,
              gridTemplateRows: `repeat(${KEYBOARD_ROW_COUNT}, 2.5rem)`,
            }}
          >
            {KEYBOARD_LAYOUT.map((key) => {
              const isBound = boundKeys.has(key.bindKey);
              const isSelected = selectedKey === key.bindKey;

              return (
                <Button
                  className={cn(
                    'h-full min-w-0 px-1 font-mono text-[10px] uppercase',
                    isBound && 'border-primary/50 bg-primary/10 text-primary',
                    isSelected &&
                      'z-10 border-primary bg-primary/15 text-primary ring-2 ring-primary ring-inset'
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
              );
            })}
          </div>
        </div>
      </div>
      <p className='w-full text-center text-muted-foreground text-xs'>
        Mouse keys and ANSI layout. Highlighted keys have a bind assigned.
      </p>
    </div>
  );
}
