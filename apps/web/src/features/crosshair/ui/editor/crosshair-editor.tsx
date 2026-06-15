'use client';

import {
  showsDynamicCrosshairControls,
  showsSplitCrosshairControls,
} from '@workspace/cs2/crosshair/model/crosshair-style';
import { useCrosshairEditor } from '@/features/crosshair/hooks/use-crosshair-editor';
import { CrosshairAppearanceControls } from '@/features/crosshair/ui/controls/crosshair-appearance-controls';
import { CrosshairDynamicControls } from '@/features/crosshair/ui/controls/crosshair-dynamic-controls';
import { CrosshairSplitControls } from '@/features/crosshair/ui/controls/crosshair-split-controls';
import { CrosshairStyleSelect } from '@/features/crosshair/ui/controls/crosshair-style-select';
import { CrosshairResetAlert } from '@/features/crosshair/ui/editor/crosshair-reset-alert';
import { ShareCodeImportDialog } from '@/features/crosshair/ui/editor/share-code-import-dialog';
import { CrosshairCopyMenu } from '@/features/crosshair/ui/preview/crosshair-copy-menu';
import { CrosshairPreview } from '@/features/crosshair/ui/preview/crosshair-preview';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';

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
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-medium text-sm'>Crosshair editor</h1>
          <p className='text-muted-foreground text-xs'>
            Import a Valve share code, tweak settings, and copy the result back
            into CS2.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <ShareCodeImportDialog
            importError={importError}
            onImport={importShareCode}
          />
          <CrosshairCopyMenu crosshair={crosshair} shareCode={shareCode} />
          <CrosshairResetAlert onReset={resetCrosshair} />
        </div>
      </div>

      <CrosshairPreview crosshair={crosshair} />

      <CollapsibleSection
        contentClassName='flex flex-col gap-6'
        title='Crosshair'
      >
        <CrosshairStyleSelect
          onStyleChange={(style) => updateField('style', style)}
          style={crosshair.style}
        />
        <CrosshairAppearanceControls
          crosshair={crosshair}
          onColorChange={updateColor}
          onCustomRgbChange={updateCustomRgb}
          onUpdate={updateField}
        />
      </CollapsibleSection>

      {showsDynamicCrosshairControls(crosshair.style) ? (
        <CollapsibleSection title='Dynamic'>
          <CrosshairDynamicControls
            crosshair={crosshair}
            onUpdate={updateField}
          />
        </CollapsibleSection>
      ) : null}

      {showsSplitCrosshairControls(crosshair.style) ? (
        <CollapsibleSection title='Split'>
          <CrosshairSplitControls
            crosshair={crosshair}
            onUpdate={updateField}
          />
        </CollapsibleSection>
      ) : null}
    </div>
  );
}
