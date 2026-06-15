'use client';

import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import type { CrosshairSettings } from '@/features/crosshair/lib/model/types';
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

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='crosshair-deployed-weapon-gap'>
          Deployed weapon gap
        </Label>
        <Switch
          checked={crosshair.deployedWeaponGapEnabled}
          id='crosshair-deployed-weapon-gap'
          onCheckedChange={(checked) =>
            onUpdate('deployedWeaponGapEnabled', checked)
          }
        />
      </div>

      <CrosshairControlSlider
        id='crosshair-fixed-gap'
        label='Fixed gap'
        max={5}
        min={-5}
        onValueChange={(value) => onUpdate('fixedCrosshairGap', value)}
        step={0.1}
        value={crosshair.fixedCrosshairGap}
      />
    </div>
  );
}
