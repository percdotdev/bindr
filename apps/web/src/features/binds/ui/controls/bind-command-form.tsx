'use client';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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
  const t = useTranslations('binds');
  const [draft, setDraft] = useState(command);

  if (!selectedKey) {
    return (
      <p className='text-muted-foreground text-sm'>{t('selectKeyHint')}</p>
    );
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='bind-key'>{t('keyLabel')}</Label>
        <Input
          className='font-mono'
          id='bind-key'
          readOnly
          value={selectedKey}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='bind-command'>{t('commandLabel')}</Label>
        <Input
          className='font-mono'
          id='bind-command'
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          placeholder='slot8'
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
          {t('saveBind')}
        </Button>
        {command ? (
          <Button onClick={onRemove} type='button' variant='outline'>
            {t('removeBind')}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
