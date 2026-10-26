'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';
import { Button } from '@workspace/ui/components/button';
import { RotateCcwIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CrosshairResetAlertProps {
  onReset: () => void;
}

export function CrosshairResetAlert({ onReset }: CrosshairResetAlertProps) {
  const t = useTranslations('crosshair');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger
        render={<Button size='sm' type='button' variant='ghost' />}
      >
        <RotateCcwIcon data-icon='inline-start' />
        {tCommon('reset')}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('resetTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('resetDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tCommon('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onReset();
              setOpen(false);
            }}
            variant='destructive'
          >
            {tCommon('reset')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
