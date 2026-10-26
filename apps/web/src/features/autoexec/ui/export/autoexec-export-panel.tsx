'use client';

import { Button } from '@workspace/ui/components/button';
import { CopyIcon, DownloadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface AutoexecExportPanelProps {
  cfg: string;
}

function downloadCfg(text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'autoexec.cfg';
  anchor.click();
  URL.revokeObjectURL(url);
}

export function AutoexecExportPanel({ cfg }: AutoexecExportPanelProps) {
  const t = useTranslations('autoexec');

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('toastCopied'));
    } catch {
      toast.error(t('toastCopyFailed'));
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <Button
        onClick={() => {
          copyText(cfg);
        }}
        type='button'
        variant='outline'
      >
        <CopyIcon data-icon='inline-start' />
        {t('copy')}
      </Button>
      <Button
        onClick={() => {
          downloadCfg(cfg);
        }}
        type='button'
        variant='outline'
      >
        <DownloadIcon data-icon='inline-start' />
        {t('download')}
      </Button>
    </div>
  );
}
