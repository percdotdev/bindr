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
import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ShareCodeExportDialogProps {
  shareCode: string;
}

export function ShareCodeExportDialog({
  shareCode,
}: ShareCodeExportDialogProps) {
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareCode);
      toast.success('Share code copied');
    } catch {
      toast.error('Could not copy share code');
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={<Button size='sm' type='button' variant='outline' />}
      >
        <CopyIcon data-icon='inline-start' />
        Export
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Export share code</DialogTitle>
          <DialogDescription>
            Copy this code into CS2 crosshair settings or share it with others.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='share-code-export'>Share code</Label>
          <Input id='share-code-export' readOnly value={shareCode} />
        </div>
        <DialogFooter>
          <Button onClick={handleCopy} type='button'>
            Copy to clipboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
