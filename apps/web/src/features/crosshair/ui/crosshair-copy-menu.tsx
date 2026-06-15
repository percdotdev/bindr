'use client';

import { Button } from '@workspace/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { ChevronDownIcon, CopyIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { crosshairSettingsToConsoleCommands } from '@/features/crosshair/lib/crosshair-console-commands';
import { buildCrosshairShareUrl } from '@/features/crosshair/lib/crosshair-share-url';
import type { CrosshairSettings } from '@/features/crosshair/lib/types';

interface CrosshairCopyMenuProps {
  crosshair: CrosshairSettings;
  shareCode: string;
}

async function copyText(value: string, successMessage: string) {
  try {
    await navigator.clipboard.writeText(value);
    toast.success(successMessage);
  } catch {
    toast.error('Could not copy to clipboard');
  }
}

export function CrosshairCopyMenu({
  crosshair,
  shareCode,
}: CrosshairCopyMenuProps) {
  const [open, setOpen] = useState(false);
  const consoleCommands = useMemo(
    () => crosshairSettingsToConsoleCommands(crosshair),
    [crosshair]
  );

  async function handleCopy(value: string, message: string) {
    await copyText(value, message);
    setOpen(false);
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        render={
          <Button size='sm' type='button' variant='outline'>
            <CopyIcon data-icon='inline-start' />
            Copy
            <ChevronDownIcon
              className='size-3 opacity-60'
              data-icon='inline-end'
            />
          </Button>
        }
      />
      <PopoverContent align='start' className='w-44 p-1'>
        <Button
          className='w-full justify-start'
          onClick={() => handleCopy(shareCode, 'Share code copied')}
          size='sm'
          type='button'
          variant='ghost'
        >
          Share code
        </Button>
        <Button
          className='w-full justify-start'
          onClick={() => handleCopy(consoleCommands, 'Console commands copied')}
          size='sm'
          type='button'
          variant='ghost'
        >
          Console commands
        </Button>
        <Button
          className='w-full justify-start'
          onClick={() =>
            handleCopy(buildCrosshairShareUrl(shareCode), 'Share link copied')
          }
          size='sm'
          type='button'
          variant='ghost'
        >
          Share link
        </Button>
      </PopoverContent>
    </Popover>
  );
}
