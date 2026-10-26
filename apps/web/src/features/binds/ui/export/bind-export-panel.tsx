'use client';

import { formatBindLines } from '@workspace/cs2/binds/export/format-bind';
import { formatBindCfg } from '@workspace/cs2/binds/export/format-cfg';
import type { BindEntry } from '@workspace/cs2/binds/model/types';
import { Button } from '@workspace/ui/components/button';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface BindExportPanelProps {
  binds: BindEntry[];
}

function downloadCfg(text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'bindr-binds.cfg';
  anchor.click();
  URL.revokeObjectURL(url);
}

export function BindExportPanel({ binds }: BindExportPanelProps) {
  const t = useTranslations('binds');
  const tCommon = useTranslations('common');
  const bindLines = formatBindLines(binds);
  const cfg = formatBindCfg(binds);

  async function copyText(text: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(successMessage);
    } catch {
      toast.error(tCommon('copyFailed'));
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <Button
        disabled={binds.length === 0}
        onClick={() => {
          copyText(bindLines, t('toastLines')).catch(() => undefined);
        }}
        type='button'
        variant='outline'
      >
        {t('copyLines')}
      </Button>
      <Button
        disabled={binds.length === 0}
        onClick={() => {
          copyText(cfg, t('toastCfg')).catch(() => undefined);
        }}
        type='button'
        variant='outline'
      >
        {t('copyCfg')}
      </Button>
      <Button
        disabled={binds.length === 0}
        onClick={() => {
          downloadCfg(cfg);
        }}
        type='button'
        variant='outline'
      >
        {t('downloadCfg')}
      </Button>
    </div>
  );
}
