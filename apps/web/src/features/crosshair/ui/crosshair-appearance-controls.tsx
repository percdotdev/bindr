'use client';

import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { isCustomCrosshairColor } from '@/features/crosshair/lib/crosshair-color';
import type { CrosshairSettings } from '@/features/crosshair/lib/types';
import { CrosshairColorPicker } from '@/features/crosshair/ui/crosshair-color-picker';
import { CrosshairControlSlider } from '@/features/crosshair/ui/crosshair-control-slider';
import { CrosshairToggle } from '@/features/crosshair/ui/crosshair-toggle';

interface CrosshairAppearanceControlsProps {
  crosshair: CrosshairSettings;
  onColorChange: (color: number) => void;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

export function CrosshairAppearanceControls({
  crosshair,
  onColorChange,
  onUpdate,
}: CrosshairAppearanceControlsProps) {
  const isCustomColor = isCustomCrosshairColor(crosshair.color);

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

      <CrosshairColorPicker
        color={crosshair.color}
        onColorChange={onColorChange}
      />

      <CrosshairControlSlider
        disabled={!isCustomColor}
        id='crosshair-red'
        label='Red'
        max={255}
        min={0}
        onValueChange={(value) => onUpdate('red', value)}
        step={1}
        value={crosshair.red}
      />
      <CrosshairControlSlider
        disabled={!isCustomColor}
        id='crosshair-green'
        label='Green'
        max={255}
        min={0}
        onValueChange={(value) => onUpdate('green', value)}
        step={1}
        value={crosshair.green}
      />
      <CrosshairControlSlider
        disabled={!isCustomColor}
        id='crosshair-blue'
        label='Blue'
        max={255}
        min={0}
        onValueChange={(value) => onUpdate('blue', value)}
        step={1}
        value={crosshair.blue}
      />

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='crosshair-alpha-enabled'>Use alpha</Label>
        <Switch
          checked={crosshair.alphaEnabled}
          id='crosshair-alpha-enabled'
          onCheckedChange={(checked) => onUpdate('alphaEnabled', checked)}
        />
      </div>
      <CrosshairControlSlider
        disabled={!crosshair.alphaEnabled}
        id='crosshair-alpha'
        label='Alpha'
        max={255}
        min={0}
        onValueChange={(value) => onUpdate('alpha', value)}
        step={1}
        value={crosshair.alpha}
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

      <CrosshairControlSlider
        disabled={!crosshair.outlineEnabled}
        id='crosshair-outline'
        label='Outline thickness'
        max={3}
        min={0}
        onValueChange={(value) => onUpdate('outline', value)}
        step={0.5}
        value={crosshair.outline}
      />
    </div>
  );
}
