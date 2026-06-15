'use client';

import { Button } from '@workspace/ui/components/button';
import { CopyIcon, DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';

import { formatConfigCfg } from '@/features/config/lib/export/format-config-cfg';
import type { ConfigSettings } from '@/features/config/lib/model/types';

interface ConfigExportPanelProps {
  config: ConfigSettings;
}

async function copyText(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copied`);
  } catch {
    toast.error(`Could not copy ${label.toLowerCase()}`);
  }
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
  const cfg = formatConfigCfg(config);

  return (
    <div className='flex flex-wrap gap-2'>
      <Button
        onClick={() => {
          copyText(cfg, 'Config cfg');
        }}
        type='button'
        variant='outline'
      >
        <CopyIcon data-icon='inline-start' />
        Copy cfg
      </Button>
      <Button
        onClick={() => {
          downloadCfg(cfg);
        }}
        type='button'
        variant='outline'
      >
        <DownloadIcon data-icon='inline-start' />
        Download cfg
      </Button>
    </div>
  );
}
