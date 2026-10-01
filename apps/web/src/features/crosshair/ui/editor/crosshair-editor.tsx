'use client';

import {
  isDynamicCrosshairStyle,
  showsClassicSplitControls,
  showsQuadrantSizeControl,
} from '@workspace/cs2/crosshair/model/crosshair-style';
import { useCrosshairEditor } from '@/features/crosshair/hooks/use-crosshair-editor';
import { CrosshairAppearanceControls } from '@/features/crosshair/ui/controls/crosshair-appearance-controls';
import { CrosshairDynamicControls } from '@/features/crosshair/ui/controls/crosshair-dynamic-controls';
import { CrosshairOutlineControls } from '@/features/crosshair/ui/controls/crosshair-outline-controls';
import { CrosshairQuadrantControls } from '@/features/crosshair/ui/controls/crosshair-quadrant-controls';
import { CrosshairScopeDotControls } from '@/features/crosshair/ui/controls/crosshair-scope-dot-controls';
import { CrosshairScreenHeightSelect } from '@/features/crosshair/ui/controls/crosshair-screen-height-select';
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
    updateRgba,
    updateOutlineRgba,
    importShareCode,
    resetCrosshair,
  } = useCrosshairEditor();

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <h1 className='font-medium text-sm'>Crosshair editor</h1>
          <p className='text-muted-foreground text-xs'>
            Import a CS2 share code, tweak pixel-exact settings, and copy the
            result back into the game.
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
          onRgbaChange={updateRgba}
          onUpdate={updateField}
        />
      </CollapsibleSection>

      <CollapsibleSection title='Outline'>
        <CrosshairOutlineControls
          crosshair={crosshair}
          onOutlineRgbaChange={updateOutlineRgba}
          onUpdate={updateField}
        />
      </CollapsibleSection>

      {isDynamicCrosshairStyle(crosshair.style) ? (
        <CollapsibleSection title='Dynamic'>
          <CrosshairDynamicControls
            crosshair={crosshair}
            onUpdate={updateField}
          />
        </CollapsibleSection>
      ) : null}

      {showsClassicSplitControls(crosshair.style) ? (
        <CollapsibleSection title='Split'>
          <CrosshairSplitControls
            crosshair={crosshair}
            onUpdate={updateField}
          />
        </CollapsibleSection>
      ) : null}

      {showsQuadrantSizeControl(crosshair.style) ? (
        <CollapsibleSection title='Quadrant'>
          <CrosshairQuadrantControls
            crosshair={crosshair}
            onUpdate={updateField}
          />
        </CollapsibleSection>
      ) : null}

      <CollapsibleSection defaultOpen={false} title='Scope dot'>
        <CrosshairScopeDotControls
          crosshair={crosshair}
          onUpdate={updateField}
        />
      </CollapsibleSection>

      <CollapsibleSection defaultOpen={false} title='Resolution'>
        <CrosshairScreenHeightSelect
          onScreenHeightChange={(value) => updateField('screenHeight', value)}
          screenHeight={crosshair.screenHeight}
        />
      </CollapsibleSection>
    </div>
  );
}
