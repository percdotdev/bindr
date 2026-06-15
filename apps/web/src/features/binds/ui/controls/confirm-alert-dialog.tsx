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
import type { ReactElement, ReactNode } from 'react';

interface ConfirmAlertDialogProps {
  children: ReactNode;
  confirmLabel: string;
  description: string;
  destructive?: boolean;
  onConfirm: () => void;
  title: string;
  trigger: ReactElement;
}

export function ConfirmAlertDialog({
  children,
  confirmLabel,
  description,
  destructive = true,
  onConfirm,
  title,
  trigger,
}: ConfirmAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={trigger}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            variant={destructive ? 'destructive' : 'default'}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
