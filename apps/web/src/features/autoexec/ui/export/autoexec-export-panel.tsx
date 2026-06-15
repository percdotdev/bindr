'use client';

import { Button } from '@workspace/ui/components/button';
import { CopyIcon, DownloadIcon } from 'lucide-react';
import { toast } from 'sonner';

interface AutoexecExportPanelProps {
  cfg: string;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success('autoexec.cfg copied');
  } catch {
    toast.error('Could not copy autoexec.cfg');
  }
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
        Download autoexec.cfg
      </Button>
    </div>
  );
}
