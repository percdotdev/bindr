'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';

import { useConfigEditor } from '@/features/config/hooks/use-config-editor';
import { ViewmodelControls } from '@/features/config/ui/controls/viewmodel-controls';
import { ConfigResetAlert } from '@/features/config/ui/editor/config-reset-alert';
import { ConfigExportPanel } from '@/features/config/ui/export/config-export-panel';

export function ConfigEditor() {
  const { applyViewmodelPreset, resetConfig, updateViewmodelField, viewmodel } =
    useConfigEditor();

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-medium text-sm'>Game config</h1>
          <p className='text-muted-foreground text-xs'>
            Tune always-on cvars like viewmodel FOV and offsets, then copy or
            download a cfg snippet for CS2.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <ConfigExportPanel viewmodel={viewmodel} />
          <ConfigResetAlert onReset={resetConfig} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Viewmodel</CardTitle>
        </CardHeader>
        <CardContent>
          <ViewmodelControls
            onPresetChange={applyViewmodelPreset}
            onUpdate={updateViewmodelField}
            viewmodel={viewmodel}
          />
        </CardContent>
      </Card>
    </div>
  );
}
