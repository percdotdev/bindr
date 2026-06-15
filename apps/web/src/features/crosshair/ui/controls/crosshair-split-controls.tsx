'use client';

import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface CrosshairSplitControlsProps {
  crosshair: CrosshairSettings;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

export function CrosshairSplitControls({
  crosshair,
  onUpdate,
}: CrosshairSplitControlsProps) {
  return (
    <div className='flex flex-col gap-4'>
      <CrosshairControlSlider
        id='crosshair-split-distance'
        label='Split distance'
        max={127}
        min={0}
        onValueChange={(value) => onUpdate('splitDistance', value)}
        step={1}
        value={crosshair.splitDistance}
      />
      <CrosshairControlSlider
        id='crosshair-inner-split-alpha'
        label='Inner split alpha'
        max={1.5}
        min={0}
        onValueChange={(value) => onUpdate('innerSplitAlpha', value)}
        step={0.1}
        value={crosshair.innerSplitAlpha}
      />
      <CrosshairControlSlider
        id='crosshair-outer-split-alpha'
        label='Outer split alpha'
        max={1.5}
        min={0}
        onValueChange={(value) => onUpdate('outerSplitAlpha', value)}
        step={0.1}
        value={crosshair.outerSplitAlpha}
      />
      <CrosshairControlSlider
        id='crosshair-split-size-ratio'
        label='Split size ratio'
        max={1.5}
        min={0}
        onValueChange={(value) => onUpdate('splitSizeRatio', value)}
        step={0.1}
        value={crosshair.splitSizeRatio}
      />
    </div>
  );
}
