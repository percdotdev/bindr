'use client';

import { formatBindLines } from '@workspace/cs2/binds/export/format-bind';
import { formatBindCfg } from '@workspace/cs2/binds/export/format-cfg';
import type { BindEntry } from '@workspace/cs2/binds/model/types';
import { Button } from '@workspace/ui/components/button';
import { toast } from 'sonner';

interface BindExportPanelProps {
  binds: BindEntry[];
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
  anchor.download = 'bindr-binds.cfg';
  anchor.click();
  URL.revokeObjectURL(url);
}

export function BindExportPanel({ binds }: BindExportPanelProps) {
  const bindLines = formatBindLines(binds);
  const cfg = formatBindCfg(binds);

  return (
    <div className='flex flex-wrap gap-2'>
      <Button
        disabled={binds.length === 0}
        onClick={() => {
          copyText(bindLines, 'Bind lines').catch(() => undefined);
        }}
        type='button'
        variant='outline'
      >
        Copy bind lines
      </Button>
      <Button
        disabled={binds.length === 0}
        onClick={() => {
          copyText(cfg, 'CFG snippet').catch(() => undefined);
        }}
        type='button'
        variant='outline'
      >
        Copy CFG snippet
      </Button>
      <Button
        disabled={binds.length === 0}
        onClick={() => {
          downloadCfg(cfg);
        }}
        type='button'
        variant='outline'
      >
        Download .cfg
      </Button>
    </div>
  );
}
