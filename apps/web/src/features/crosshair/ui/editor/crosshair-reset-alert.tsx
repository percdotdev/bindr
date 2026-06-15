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
import { useState } from 'react';

interface CrosshairResetAlertProps {
  onReset: () => void;
}

export function CrosshairResetAlert({ onReset }: CrosshairResetAlertProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger
        render={<Button size='sm' type='button' variant='ghost' />}
      >
        <RotateCcwIcon data-icon='inline-start' />
        Reset
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset crosshair?</AlertDialogTitle>
          <AlertDialogDescription>
            This restores the default crosshair and clears your saved draft.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onReset();
              setOpen(false);
            }}
            variant='destructive'
          >
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
