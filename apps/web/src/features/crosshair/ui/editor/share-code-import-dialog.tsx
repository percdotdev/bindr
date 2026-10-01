'use client';

import type { ShareCodeSource } from '@workspace/cs2/crosshair/share-code/decode-share-code';
import { Button } from '@workspace/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@workspace/ui/components/dialog';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { DownloadIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ShareCodeImportDialogProps {
  importError: string | null;
  onImport: (code: string) => ShareCodeSource | null;
}

function notifyImported(source: ShareCodeSource) {
  if (source === 'converted') {
    toast.success('CS:GO-era code converted to pixels', {
      description:
        'Old codes used resolution-relative units. Sizes were converted for 1080p and may be off by a pixel.',
    });
    return;
  }

  if (source === 'pixel-legacy') {
    toast.success('Crosshair imported', {
      description:
        'This code predates outline colors and scope-dot settings; defaults were used for those.',
    });
    return;
  }

  toast.success('Crosshair imported');
}

export function ShareCodeImportDialog({
  importError,
  onImport,
}: ShareCodeImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  function handleImport() {
    const source = onImport(draft);
    if (!source) {
      return;
    }

    notifyImported(source);
    setDraft('');
    setOpen(false);
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={<Button size='sm' type='button' variant='outline' />}
      >
        <DownloadIcon data-icon='inline-start' />
        Import
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Import share code</DialogTitle>
          <DialogDescription>
            Paste a <code>CS…</code> code from CS2 settings. Older{' '}
            <code>CSGO-…</code> codes are converted automatically.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='share-code-import'>Share code</Label>
          <Input
            aria-invalid={importError !== null}
            className='font-mono'
            id='share-code-import'
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleImport();
              }
            }}
            placeholder='CSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            value={draft}
          />
          {importError ? (
            <p className='text-destructive text-xs'>{importError}</p>
          ) : null}
        </div>
        <DialogFooter>
          <Button onClick={handleImport} type='button'>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
