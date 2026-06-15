'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';

import { useBindEditor } from '@/features/binds/hooks/use-bind-editor';
import { BindCommandForm } from '@/features/binds/ui/controls/bind-command-form';
import { BindList } from '@/features/binds/ui/controls/bind-list';
import { KeyboardLayout } from '@/features/binds/ui/controls/keyboard-layout';
import { BindExportPanel } from '@/features/binds/ui/export/bind-export-panel';

export function BindEditor() {
  const {
    binds,
    clearBinds,
    removeBind,
    selectKey,
    selectedBind,
    selectedKey,
    upsertBind,
  } = useBindEditor();

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-medium text-sm'>Bind generator</h1>
        <p className='text-muted-foreground text-xs'>
          Click a key, assign a CS2 console command, and export bind lines or a
          cfg snippet.
        </p>
      </div>

      <BindExportPanel binds={binds} />

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
          <button
            className='text-muted-foreground text-xs underline-offset-4 hover:underline'
            onClick={clearBinds}
            type='button'
          >
            Clear all
          </button>
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
