'use client';

import { CROSSHAIR_LIMITS } from '@workspace/cs2/crosshair/model/crosshair-limits';
import { showsSpreadLimitControl } from '@workspace/cs2/crosshair/model/crosshair-style';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface CrosshairDynamicControlsProps {
  crosshair: CrosshairSettings;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

export function CrosshairDynamicControls({
  crosshair,
  onUpdate,
}: CrosshairDynamicControlsProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='crosshair-follow-recoil'>Follow recoil</Label>
        <Switch
          checked={crosshair.followRecoil}
          id='crosshair-follow-recoil'
          onCheckedChange={(checked) => onUpdate('followRecoil', checked)}
        />
      </div>

      {showsSpreadLimitControl(crosshair.style) ? (
        <CrosshairControlSlider
          id='crosshair-spread-limit'
          label='Max spread (px)'
          max={CROSSHAIR_LIMITS.dynamicSpreadLimit.max}
          min={CROSSHAIR_LIMITS.dynamicSpreadLimit.min}
          onValueChange={(value) => onUpdate('dynamicSpreadLimit', value)}
          step={CROSSHAIR_LIMITS.dynamicSpreadLimit.step}
          value={crosshair.dynamicSpreadLimit}
        />
      ) : null}
    </div>
  );
}
