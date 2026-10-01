'use client';

import { CROSSHAIR_LIMITS } from '@workspace/cs2/crosshair/model/crosshair-limits';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface CrosshairScopeDotControlsProps {
  crosshair: CrosshairSettings;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

/** Dot shown while scoped (AWP, SSG, scoped rifles). Stored in the share code. */
export function CrosshairScopeDotControls({
  crosshair,
  onUpdate,
}: CrosshairScopeDotControlsProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='crosshair-scope-dot-color'>Use crosshair color</Label>
        <Switch
          checked={crosshair.scopeDotUsesCrosshairColor}
          id='crosshair-scope-dot-color'
          onCheckedChange={(checked) =>
            onUpdate('scopeDotUsesCrosshairColor', checked)
          }
        />
      </div>
      <CrosshairControlSlider
        id='crosshair-scope-dot-scale'
        label='Dot scale'
        max={CROSSHAIR_LIMITS.scopeDotScale.max}
        min={CROSSHAIR_LIMITS.scopeDotScale.min}
        onValueChange={(value) => onUpdate('scopeDotScale', value)}
        step={CROSSHAIR_LIMITS.scopeDotScale.step}
        value={crosshair.scopeDotScale}
      />
    </div>
  );
}
