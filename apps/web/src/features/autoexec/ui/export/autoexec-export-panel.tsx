'use client';

import { Button } from '@workspace/ui/components/button';
import { CopyIcon, DownloadIcon, LinkIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import type { ShareLinkResult } from '@/features/autoexec/hooks/use-autoexec';
import { AutoexecImportButton } from '@/features/autoexec/ui/import/autoexec-import-button';

interface AutoexecExportPanelProps {
  cfg: string;
  createShareLink: () => Promise<ShareLinkResult>;
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

export function AutoexecExportPanel({
  cfg,
  createShareLink,
}: AutoexecExportPanelProps) {
  const t = useTranslations('autoexec');

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('toastCopied'));
    } catch {
      toast.error(t('toastCopyFailed'));
    }
  }

  async function copyShareLink() {
    try {
      const result = await createShareLink();
      if (result.status === 'empty') {
        toast.error(t('toastNothingSelected'));
        return;
      }
      if (result.status === 'too-long') {
        toast.error(t('toastLinkTooLong'));
        return;
      }
      await navigator.clipboard.writeText(result.url);
      toast.success(t('toastLinkCopied'));
    } catch {
      toast.error(t('toastLinkFailed'));
    }
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <AutoexecImportButton />
      <Button
        onClick={() => {
          copyShareLink();
        }}
        type='button'
        variant='outline'
      >
        <LinkIcon data-icon='inline-start' />
        {t('copyLink')}
      </Button>
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
