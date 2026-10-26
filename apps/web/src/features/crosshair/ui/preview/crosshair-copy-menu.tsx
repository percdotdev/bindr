'use client';

import {
  crosshairSettingsToCfgBlock,
  crosshairSettingsToConsoleCommands,
} from '@workspace/cs2/crosshair/export/crosshair-console-commands';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { Button } from '@workspace/ui/components/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { ChevronDownIcon, CopyIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { buildCrosshairShareUrl } from '@/features/crosshair/lib/share-url/crosshair-share-url';

interface CrosshairCopyMenuProps {
  crosshair: CrosshairSettings;
  shareCode: string;
}

export function CrosshairCopyMenu({
  crosshair,
  shareCode,
}: CrosshairCopyMenuProps) {
  const t = useTranslations('crosshair');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);
  const consoleCommands = useMemo(
    () => crosshairSettingsToConsoleCommands(crosshair),
    [crosshair]
  );
  const cfgBlock = useMemo(
    () => crosshairSettingsToCfgBlock(crosshair),
    [crosshair]
  );

  async function copyText(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(successMessage);
    } catch {
      toast.error(tCommon('copyFailed'));
    }
  }

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
            {tCommon('copy')}
            <ChevronDownIcon
              className='size-3 opacity-60'
              data-icon='inline-end'
            />
          </Button>
        }
      />
      <PopoverContent align='start' className='w-56 p-1'>
        <Button
          className='w-full justify-start'
          onClick={() => handleCopy(shareCode, t('toastShareCopied'))}
          size='sm'
          type='button'
          variant='ghost'
        >
          {t('copyShareCode')}
        </Button>
        <Button
          className='w-full justify-start'
          onClick={() => handleCopy(consoleCommands, t('toastCommandsCopied'))}
          size='sm'
          type='button'
          variant='ghost'
        >
          {t('copyCommands')}
        </Button>
        <Button
          className='w-full justify-start'
          onClick={() => handleCopy(cfgBlock, t('toastBothCopied'))}
          size='sm'
          type='button'
          variant='ghost'
        >
          {t('copyBothMenu')}
        </Button>
        <Button
          className='w-full justify-start'
          onClick={() =>
            handleCopy(buildCrosshairShareUrl(shareCode), t('toastLinkCopied'))
          }
          size='sm'
          type='button'
          variant='ghost'
        >
          {t('copyLink')}
        </Button>
      </PopoverContent>
    </Popover>
  );
}
