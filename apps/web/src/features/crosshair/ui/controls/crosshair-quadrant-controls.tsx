'use client';

import { CROSSHAIR_LIMITS } from '@workspace/cs2/crosshair/model/crosshair-limits';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface CrosshairQuadrantControlsProps {
  crosshair: CrosshairSettings;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

/**
 * Static Quadrant (style 9) reuses `cl_crosshair_dynamic_maxdist_splitratio`
 * as the arc length: 1 = full quarter arcs, 0 = four dots.
 */
export function CrosshairQuadrantControls({
  crosshair,
  onUpdate,
}: CrosshairQuadrantControlsProps) {
  return (
    <CrosshairControlSlider
      id='crosshair-quadrant-size'
      label='Quadrant size'
      max={CROSSHAIR_LIMITS.splitSizeRatio.max}
      min={CROSSHAIR_LIMITS.splitSizeRatio.min}
      onValueChange={(value) => onUpdate('splitSizeRatio', value)}
      step={CROSSHAIR_LIMITS.splitSizeRatio.step}
      value={crosshair.splitSizeRatio}
    />
  );
}
