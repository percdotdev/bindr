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
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

import type { CrosshairImportErrorKey } from '@/features/crosshair/lib/storage/crosshair-store';

interface ShareCodeImportDialogProps {
  importError: CrosshairImportErrorKey | null;
  onImport: (code: string) => ShareCodeSource | null;
}

export function ShareCodeImportDialog({
  importError,
  onImport,
}: ShareCodeImportDialogProps) {
  const t = useTranslations('crosshair');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  function notifyImported(source: ShareCodeSource) {
    if (source === 'converted') {
      toast.success(t('importToastConverted'), {
        description: t('importToastConvertedDesc'),
      });
      return;
    }

    if (source === 'pixel-legacy') {
      toast.success(t('importToastLegacy'), {
        description: t('importToastLegacyDesc'),
      });
      return;
    }

    toast.success(t('importToastOk'));
  }

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
        {tCommon('import')}
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{t('importTitle')}</DialogTitle>
          <DialogDescription>
            {t.rich('importDialogDescription', {
              code: (chunks) => <code>{chunks}</code>,
            })}
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='share-code-import'>{t('importLabel')}</Label>
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
            <p className='text-destructive text-xs'>{t(importError)}</p>
          ) : null}
        </div>
        <DialogFooter>
          <Button onClick={handleImport} type='button'>
            {tCommon('import')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
