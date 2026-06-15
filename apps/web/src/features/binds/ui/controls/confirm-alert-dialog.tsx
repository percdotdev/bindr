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
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useState,
} from 'react';

interface ConfirmAlertDialogProps {
  children: ReactNode;
  confirmLabel: string;
  description: string;
  destructive?: boolean;
  disabled?: boolean;
  onConfirm: () => void;
  title: string;
  trigger: ReactElement<{ disabled?: boolean }>;
}

export function ConfirmAlertDialog({
  children,
  confirmLabel,
  description,
  destructive = true,
  disabled = false,
  onConfirm,
  title,
  trigger,
}: ConfirmAlertDialogProps) {
  const [open, setOpen] = useState(false);

  if (disabled) {
    if (!isValidElement(trigger)) {
      return null;
    }

    return cloneElement(trigger, { disabled: true }, children);
  }

  return (
    <AlertDialog onOpenChange={setOpen} open={open}>
      <AlertDialogTrigger render={trigger}>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
            variant={destructive ? 'destructive' : 'default'}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
