'use client';

import { Label } from '@workspace/ui/components/label';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@workspace/ui/components/toggle-group';
import {
  CROSSHAIR_PRESET_COLORS,
  CROSSHAIR_PRESET_LABELS,
  isCustomCrosshairColor,
} from '@/features/crosshair/lib/crosshair-color';

interface CrosshairColorPickerProps {
  color: number;
  onColorChange: (color: number) => void;
}

const PRESET_COLOR_IDS = [0, 1, 2, 3, 4] as const;

export function CrosshairColorPicker({
  color,
  onColorChange,
}: CrosshairColorPickerProps) {
  const selectedValue = isCustomCrosshairColor(color)
    ? 'custom'
    : String(color);

  return (
    <div className='flex flex-col gap-2'>
      <Label>Color</Label>
      <ToggleGroup
        onValueChange={(values) => {
          const next = values[0];
          if (!next) {
            return;
          }

          if (next === 'custom') {
            onColorChange(5);
            return;
          }

          onColorChange(Number(next));
        }}
        spacing={0}
        value={[selectedValue]}
        variant='outline'
      >
        {PRESET_COLOR_IDS.map((presetId) => {
          const [red, green, blue] = CROSSHAIR_PRESET_COLORS[presetId] ?? [
            0, 255, 0,
          ];

          return (
            <ToggleGroupItem
              aria-label={CROSSHAIR_PRESET_LABELS[presetId]}
              key={presetId}
              value={String(presetId)}
            >
              <span
                className='size-4 rounded-full border border-border'
                style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
              />
            </ToggleGroupItem>
          );
        })}
        <ToggleGroupItem aria-label='Custom color' value='custom'>
          <span className='size-4 rounded-full border border-border bg-linear-to-br from-red-500 via-green-500 to-blue-500' />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
