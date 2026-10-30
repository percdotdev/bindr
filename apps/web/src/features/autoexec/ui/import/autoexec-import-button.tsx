'use client';

import { parseAutoexec } from '@workspace/cs2/autoexec/import/parse-autoexec';
import { Button } from '@workspace/ui/components/button';
import { UploadIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { toast } from 'sonner';

import { useBindStore } from '@/features/binds/lib/storage/bind-store';
import { useConfigStore } from '@/features/config/lib/storage/config-store';
import { useCrosshairStore } from '@/features/crosshair/lib/storage/crosshair-store';

const MAX_FILE_BYTES = 256_000;

export function AutoexecImportButton() {
  const t = useTranslations('autoexec');
  const inputRef = useRef<HTMLInputElement>(null);

  async function onFile(file: File) {
    if (file.size > MAX_FILE_BYTES) {
      toast.error(t('toastImportFailed'));
      return;
    }

    const parsed = parseAutoexec(await file.text());
    if (parsed.status !== 'ok') {
      toast.error(
        parsed.status === 'empty'
          ? t('toastImportEmpty')
          : t('toastImportFailed')
      );
      return;
    }

    if (parsed.includes.crosshair) {
      useCrosshairStore.getState().replaceCrosshair(parsed.crosshair);
    }
    if (parsed.includes.config) {
      useConfigStore.getState().replaceConfig(parsed.config);
    }
    if (parsed.includes.binds) {
      useBindStore.getState().replaceBinds(parsed.binds);
    }

    toast.success(t('toastImported'));
  }

  return (
    <>
      <input
        accept='.cfg,text/plain'
        aria-label={t('import')}
        className='sr-only'
        onChange={(event) => {
          const file = event.target.files?.[0];
          event.currentTarget.value = '';
          if (!file) {
            return;
          }
          onFile(file).catch(() => {
            toast.error(t('toastImportFailed'));
          });
        }}
        ref={inputRef}
        type='file'
      />
      <Button
        onClick={() => {
          inputRef.current?.click();
        }}
        type='button'
      >
        <UploadIcon data-icon='inline-start' />
        {t('import')}
      </Button>
    </>
  );
}
