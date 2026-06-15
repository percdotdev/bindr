'use client';

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
  onImport: (code: string) => boolean;
}

export function ShareCodeImportDialog({
  importError,
  onImport,
}: ShareCodeImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  function handleImport() {
    const imported = onImport(draft);
    if (!imported) {
      return;
    }

    toast.success('Crosshair imported');
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
            Paste a CSGO share code from CS2 settings or another site.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='share-code-import'>Share code</Label>
          <Input
            aria-invalid={importError !== null}
            id='share-code-import'
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleImport();
              }
            }}
            placeholder='CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'
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
