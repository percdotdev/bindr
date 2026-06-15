'use client';

import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';

import { useBindEditor } from '@/features/binds/hooks/use-bind-editor';
import { RECOMMENDED_BIND_TEMPLATES } from '@/features/binds/lib/model/recommended-binds';
import { BindCommandForm } from '@/features/binds/ui/controls/bind-command-form';
import { BindList } from '@/features/binds/ui/controls/bind-list';
import { ConfirmAlertDialog } from '@/features/binds/ui/controls/confirm-alert-dialog';
import { KeyboardLayout } from '@/features/binds/ui/controls/keyboard-layout';
import { BindsNav } from '@/features/binds/ui/editor/binds-nav';
import { BindExportPanel } from '@/features/binds/ui/export/bind-export-panel';

export function BindEditor() {
  const {
    activeKeys,
    binds,
    clearBinds,
    loadRecommendedBinds,
    removeBind,
    selectKey,
    selectedBind,
    selectedKey,
    upsertBind,
  } = useBindEditor();

  const allRecommendedAdded = RECOMMENDED_BIND_TEMPLATES.every((template) =>
    activeKeys.has(template.key)
  );

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-3'>
        <BindsNav />
        <div className='flex flex-col gap-1'>
          <h1 className='font-medium text-sm'>Bind generator</h1>
          <p className='text-muted-foreground text-xs'>
            Build your config from scratch or pull binds from the recommended
            catalog, then export bind lines or a cfg snippet.
          </p>
        </div>
        <Link
          className='w-fit text-muted-foreground text-xs underline-offset-4 hover:underline'
          href='/binds/recommended'
        >
          Browse recommended binds →
        </Link>
        <div className='flex flex-wrap items-center gap-2'>
          <BindExportPanel binds={binds} />
          <ConfirmAlertDialog
            confirmLabel='Add all'
            description='This replaces your entire bind config with the full recommended set. Any custom binds are removed.'
            destructive={false}
            disabled={allRecommendedAdded}
            onConfirm={loadRecommendedBinds}
            title='Add all recommended binds?'
            trigger={<Button type='button' variant='outline' />}
          >
            <SparklesIcon data-icon='inline-start' />
            Add all
          </ConfirmAlertDialog>
          <ConfirmAlertDialog
            confirmLabel='Clear all'
            description='This removes every bind from your config. Saved binds in local storage are cleared too.'
            disabled={binds.length === 0}
            onConfirm={clearBinds}
            title='Clear all binds?'
            trigger={<Button type='button' variant='ghost' />}
          >
            Clear all
          </ConfirmAlertDialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Keyboard</CardTitle>
        </CardHeader>
        <CardContent>
          <KeyboardLayout
            binds={binds}
            onSelectKey={selectKey}
            selectedKey={selectedKey}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Command</CardTitle>
        </CardHeader>
        <CardContent>
          <BindCommandForm
            command={selectedBind?.command ?? ''}
            key={selectedKey ?? 'none'}
            onRemove={() => {
              if (selectedKey) {
                removeBind(selectedKey);
              }
            }}
            onSave={(command) => {
              if (selectedKey) {
                upsertBind(selectedKey, command);
              }
            }}
            selectedKey={selectedKey}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between gap-3'>
          <CardTitle>Active binds</CardTitle>
          <Link
            className='text-muted-foreground text-xs underline-offset-4 hover:underline'
            href='/binds/recommended'
          >
            Add from recommended
          </Link>
        </CardHeader>
        <CardContent>
          <BindList
            binds={binds}
            onRemove={removeBind}
            onSelectKey={selectKey}
            selectedKey={selectedKey}
          />
        </CardContent>
      </Card>
    </div>
  );
}
