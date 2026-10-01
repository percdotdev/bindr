'use client';

import { CROSSHAIR_LIMITS } from '@workspace/cs2/crosshair/model/crosshair-limits';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface CrosshairSplitControlsProps {
  crosshair: CrosshairSettings;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

/** Classic dynamic cross (style 2) only. */
export function CrosshairSplitControls({
  crosshair,
  onUpdate,
}: CrosshairSplitControlsProps) {
  return (
    <div className='flex flex-col gap-4'>
      <CrosshairControlSlider
        id='crosshair-split-distance'
        label='Split distance (px)'
        max={CROSSHAIR_LIMITS.splitDistance.max}
        min={CROSSHAIR_LIMITS.splitDistance.min}
        onValueChange={(value) => onUpdate('splitDistance', value)}
        step={CROSSHAIR_LIMITS.splitDistance.step}
        value={crosshair.splitDistance}
      />
      <CrosshairControlSlider
        id='crosshair-inner-split-alpha'
        label='Inner split alpha'
        max={CROSSHAIR_LIMITS.innerSplitAlpha.max}
        min={CROSSHAIR_LIMITS.innerSplitAlpha.min}
        onValueChange={(value) => onUpdate('innerSplitAlpha', value)}
        step={CROSSHAIR_LIMITS.innerSplitAlpha.step}
        value={crosshair.innerSplitAlpha}
      />
      <CrosshairControlSlider
        id='crosshair-outer-split-alpha'
        label='Outer split alpha'
        max={CROSSHAIR_LIMITS.outerSplitAlpha.max}
        min={CROSSHAIR_LIMITS.outerSplitAlpha.min}
        onValueChange={(value) => onUpdate('outerSplitAlpha', value)}
        step={CROSSHAIR_LIMITS.outerSplitAlpha.step}
        value={crosshair.outerSplitAlpha}
      />
      <CrosshairControlSlider
        id='crosshair-split-size-ratio'
        label='Split size ratio'
        max={CROSSHAIR_LIMITS.splitSizeRatio.max}
        min={CROSSHAIR_LIMITS.splitSizeRatio.min}
        onValueChange={(value) => onUpdate('splitSizeRatio', value)}
        step={CROSSHAIR_LIMITS.splitSizeRatio.step}
        value={crosshair.splitSizeRatio}
      />
    </div>
  );
}
