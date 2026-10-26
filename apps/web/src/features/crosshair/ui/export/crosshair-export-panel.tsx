'use client';

import { crosshairSettingsToConsoleLines } from '@workspace/cs2/crosshair/export/crosshair-console-commands';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { CopyIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface CrosshairExportPanelProps {
  crosshair: CrosshairSettings;
  shareCode: string;
}

export function CrosshairExportPanel({
  crosshair,
  shareCode,
}: CrosshairExportPanelProps) {
  const t = useTranslations('crosshair');
  const tCommon = useTranslations('common');
  const commandLines = crosshairSettingsToConsoleLines(crosshair);
  const consoleCommands = commandLines.join('; ');
  const cfgBlock = `// share code: ${shareCode}\n${commandLines.join('\n')}`;

  async function copyText(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(successMessage);
    } catch {
      toast.error(tCommon('copyFailed'));
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-2'>
          <Label htmlFor='crosshair-share-code'>{t('shareCode')}</Label>
          <Button
            onClick={() => {
              copyText(shareCode, t('toastShareCopied')).catch(() => undefined);
            }}
            size='sm'
            type='button'
            variant='outline'
          >
            <CopyIcon data-icon='inline-start' />
            {tCommon('copy')}
          </Button>
        </div>
        <Input
          className='font-mono'
          id='crosshair-share-code'
          readOnly
          value={shareCode}
        />
        <p className='text-muted-foreground text-xs'>
          {t('exportHintBefore')}{' '}
          <code className='bg-muted rounded-none px-1 py-0.5'>
            cl_crosshaircode
          </code>{' '}
          {t('exportHintAfter')}
        </p>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between gap-2'>
          <Label htmlFor='crosshair-console-commands'>
            {t('consoleCommands')}
          </Label>
          <Button
            onClick={() => {
              copyText(consoleCommands, t('toastCommandsCopied')).catch(
                () => undefined
              );
            }}
            size='sm'
            type='button'
            variant='outline'
          >
            <CopyIcon data-icon='inline-start' />
            {tCommon('copy')}
          </Button>
        </div>
        <pre
          className='bg-muted max-h-64 overflow-auto rounded-none p-3 font-mono text-xs leading-relaxed'
          id='crosshair-console-commands'
        >
          {commandLines.join('\n')}
        </pre>
      </div>

      <Button
        onClick={() => {
          copyText(cfgBlock, t('toastBothCopied')).catch(() => undefined);
        }}
        type='button'
        variant='outline'
      >
        <CopyIcon data-icon='inline-start' />
        {tCommon('copyBoth')}
      </Button>
    </div>
  );
}
