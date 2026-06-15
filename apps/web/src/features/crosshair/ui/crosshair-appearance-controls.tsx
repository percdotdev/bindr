'use client';

import type { CrosshairSettings } from '@/features/crosshair/lib/types';
import { CrosshairControlSlider } from '@/features/crosshair/ui/crosshair-control-slider';
import { CrosshairToggle } from '@/features/crosshair/ui/crosshair-toggle';

interface CrosshairAppearanceControlsProps {
  crosshair: CrosshairSettings;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

export function CrosshairAppearanceControls({
  crosshair,
  onUpdate,
}: CrosshairAppearanceControlsProps) {
  return (
    <div className='flex flex-col gap-4'>
      <CrosshairControlSlider
        id='crosshair-length'
        label='Length'
        max={10}
        min={0}
        onValueChange={(value) => onUpdate('length', value)}
        step={0.1}
        value={crosshair.length}
      />
      <CrosshairControlSlider
        id='crosshair-gap'
        label='Gap'
        max={5}
        min={-5}
        onValueChange={(value) => onUpdate('gap', value)}
        step={0.1}
        value={crosshair.gap}
      />
      <CrosshairControlSlider
        id='crosshair-thickness'
        label='Thickness'
        max={6}
        min={0.1}
        onValueChange={(value) => onUpdate('thickness', value)}
        step={0.1}
        value={crosshair.thickness}
      />
      <CrosshairControlSlider
        id='crosshair-outline'
        label='Outline thickness'
        max={3}
        min={0}
        onValueChange={(value) => onUpdate('outline', value)}
        step={0.5}
        value={crosshair.outline}
      />
      <CrosshairControlSlider
        id='crosshair-red'
        label='Red'
        max={255}
        min={0}
        onValueChange={(value) => onUpdate('red', value)}
        step={1}
        value={crosshair.red}
      />
      <CrosshairControlSlider
        id='crosshair-green'
        label='Green'
        max={255}
        min={0}
        onValueChange={(value) => onUpdate('green', value)}
        step={1}
        value={crosshair.green}
      />
      <CrosshairControlSlider
        id='crosshair-blue'
        label='Blue'
        max={255}
        min={0}
        onValueChange={(value) => onUpdate('blue', value)}
        step={1}
        value={crosshair.blue}
      />
      <div className='flex flex-wrap gap-2'>
        <CrosshairToggle
          enabled={crosshair.outlineEnabled}
          label='Outline'
          onToggle={(value) => onUpdate('outlineEnabled', value)}
        />
        <CrosshairToggle
          enabled={crosshair.centerDotEnabled}
          label='Center dot'
          onToggle={(value) => onUpdate('centerDotEnabled', value)}
        />
        <CrosshairToggle
          enabled={crosshair.tStyleEnabled}
          label='T-style'
          onToggle={(value) => onUpdate('tStyleEnabled', value)}
        />
      </div>
    </div>
  );
}
