'use client';

import { formatConfigCfg } from '@workspace/cs2/config/export/format-config-cfg';
import type { ConfigSettings } from '@workspace/cs2/config/model/types';
import { Button } from '@workspace/ui/components/button';
import { CopyIcon, DownloadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface ConfigExportPanelProps {
  config: ConfigSettings;
}

function downloadCfg(text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'bindr-config.cfg';
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ConfigExportPanel({ config }: ConfigExportPanelProps) {
  const t = useTranslations('config');
  const tCommon = useTranslations('common');
  const cfg = formatConfigCfg(config);

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(t('toastCopied'));
    } catch {
      toast.error(tCommon('copyFailed'));
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
        {t('copyCfg')}
      </Button>
      <Button
        onClick={() => {
          downloadCfg(cfg);
        }}
        type='button'
        variant='outline'
      >
        <DownloadIcon data-icon='inline-start' />
        {t('downloadCfg')}
      </Button>
    </div>
  );
}
