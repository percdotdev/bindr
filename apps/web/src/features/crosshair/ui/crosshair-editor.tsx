'use client';

import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Separator } from '@workspace/ui/components/separator';

import { useCrosshairEditor } from '@/features/crosshair/hooks/use-crosshair-editor';
import { CrosshairAppearanceControls } from '@/features/crosshair/ui/crosshair-appearance-controls';
import { CrosshairPreview } from '@/features/crosshair/ui/crosshair-preview';
import { ShareCodePanel } from '@/features/crosshair/ui/share-code-panel';

export function CrosshairEditor() {
  const {
    crosshair,
    shareCode,
    importError,
    updateField,
    importShareCode,
    resetCrosshair,
  } = useCrosshairEditor();

  return (
    <div className='mx-auto flex w-full max-w-5xl flex-col gap-6 p-6'>
      <div className='flex flex-col gap-2'>
        <h1 className='font-medium text-sm'>Crosshair editor</h1>
        <p className='text-muted-foreground text-xs'>
          Import a Valve share code, tweak settings, and copy the result back
          into CS2.
        </p>
      </div>

      <CrosshairPreview crosshair={crosshair} />

      <div className='grid gap-6 lg:grid-cols-2'>
        <ShareCodePanel
          importError={importError}
          onImport={importShareCode}
          shareCode={shareCode}
        />

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <CrosshairAppearanceControls
              crosshair={crosshair}
              onUpdate={updateField}
            />
            <Separator />
            <Button onClick={resetCrosshair} type='button' variant='outline'>
              Reset to default
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
