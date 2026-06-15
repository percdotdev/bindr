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

interface CrosshairResetAlertProps {
  onReset: () => void;
}

export function CrosshairResetAlert({ onReset }: CrosshairResetAlertProps) {
  return (
    <AlertDialog>
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
          <AlertDialogAction onClick={onReset} variant='destructive'>
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
