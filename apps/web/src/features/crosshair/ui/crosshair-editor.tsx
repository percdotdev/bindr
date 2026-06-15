'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';

import { useCrosshairEditor } from '@/features/crosshair/hooks/use-crosshair-editor';
import { CrosshairAppearanceControls } from '@/features/crosshair/ui/crosshair-appearance-controls';
import { CrosshairPreview } from '@/features/crosshair/ui/crosshair-preview';
import { CrosshairResetAlert } from '@/features/crosshair/ui/crosshair-reset-alert';
import { ShareCodeExportDialog } from '@/features/crosshair/ui/share-code-export-dialog';
import { ShareCodeImportDialog } from '@/features/crosshair/ui/share-code-import-dialog';

export function CrosshairEditor() {
  const {
    crosshair,
    shareCode,
    importError,
    updateField,
    updateColor,
    updateCustomRgb,
    importShareCode,
    resetCrosshair,
  } = useCrosshairEditor();

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-6 p-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-medium text-sm'>Crosshair editor</h1>
          <p className='text-muted-foreground text-xs'>
            Import a Valve share code, tweak settings, and copy the result back
            into CS2.
          </p>
        </div>
        <div className='flex flex-wrap gap-2'>
          <ShareCodeImportDialog
            importError={importError}
            onImport={importShareCode}
          />
          <ShareCodeExportDialog shareCode={shareCode} />
          <CrosshairResetAlert onReset={resetCrosshair} />
        </div>
      </div>

      <CrosshairPreview crosshair={crosshair} />

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent>
          <CrosshairAppearanceControls
            crosshair={crosshair}
            onColorChange={updateColor}
            onCustomRgbChange={updateCustomRgb}
            onUpdate={updateField}
          />
        </CardContent>
      </Card>
    </div>
  );
}
