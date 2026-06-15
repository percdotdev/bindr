'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useEffect, useState } from 'react';

interface BindCommandFormProps {
  command: string;
  onRemove: () => void;
  onSave: (command: string) => void;
  selectedKey: string | null;
}

export function BindCommandForm({
  command,
  onRemove,
  onSave,
  selectedKey,
}: BindCommandFormProps) {
  const [draft, setDraft] = useState(command);

  useEffect(() => {
    setDraft(command);
  }, [command]);

  if (!selectedKey) {
    return (
      <p className='text-muted-foreground text-sm'>
        Select a key on the keyboard to add or edit a bind.
      </p>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='bind-key'>Key</Label>
        <Input
          className='font-mono'
          id='bind-key'
          readOnly
          value={selectedKey}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='bind-command'>Console command</Label>
        <Input
          className='font-mono'
          id='bind-command'
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          placeholder='+jump;-attack'
          value={draft}
        />
      </div>
      <div className='flex flex-wrap gap-2'>
        <Button
          onClick={() => {
            onSave(draft);
          }}
          type='button'
        >
          Save bind
        </Button>
        {command ? (
          <Button onClick={onRemove} type='button' variant='outline'>
            Remove bind
          </Button>
        ) : null}
      </div>
    </div>
  );
}
