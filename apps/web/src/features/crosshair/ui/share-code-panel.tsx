'use client';

import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useState } from 'react';

interface ShareCodePanelProps {
  importError: string | null;
  onImport: (code: string) => void;
  shareCode: string;
}

export function ShareCodePanel({
  importError,
  shareCode,
  onImport,
}: ShareCodePanelProps) {
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(shareCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  function handleImport() {
    onImport(draft);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share code</CardTitle>
        <CardDescription>
          Paste a CSGO share code to import, or copy your current crosshair.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='share-code-import'>Import</Label>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <Input
              aria-invalid={importError !== null}
              id='share-code-import'
              onChange={(event) => setDraft(event.target.value)}
              placeholder='CSGO-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX'
              value={draft}
            />
            <Button onClick={handleImport} type='button'>
              Import
            </Button>
          </div>
          {importError ? (
            <p className='text-destructive text-xs'>{importError}</p>
          ) : null}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='share-code-export'>Export</Label>
          <div className='flex flex-col gap-2 sm:flex-row'>
            <Input id='share-code-export' readOnly value={shareCode} />
            <Button onClick={handleCopy} type='button' variant='secondary'>
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
