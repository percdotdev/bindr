'use client';

import { Button } from '@workspace/ui/components/button';
import { ColorPicker } from '@workspace/ui/components/color-picker';
import { Label } from '@workspace/ui/components/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@workspace/ui/components/toggle-group';
import { useState } from 'react';
import {
  CROSSHAIR_PRESET_COLORS,
  CROSSHAIR_PRESET_HEXES,
  CROSSHAIR_PRESET_LABELS,
  crosshairHexToRgb,
  crosshairRgbToHex,
  isCustomCrosshairColor,
} from '@/features/crosshair/lib/crosshair-color';

interface CrosshairColorPickerProps {
  blue: number;
  color: number;
  green: number;
  onColorChange: (color: number) => void;
  onCustomRgbChange: (rgb: {
    blue: number;
    green: number;
    red: number;
  }) => void;
  red: number;
}

const PRESET_COLOR_IDS = [0, 1, 2, 3, 4] as const;

export function CrosshairColorPicker({
  blue,
  color,
  green,
  onColorChange,
  onCustomRgbChange,
  red,
}: CrosshairColorPickerProps) {
  const [customOpen, setCustomOpen] = useState(false);
  const isCustom = isCustomCrosshairColor(color);

  return (
    <div className='flex flex-col gap-2'>
      <Label>Color</Label>
      <div className='flex flex-wrap items-center gap-2'>
        <ToggleGroup
          onValueChange={(values) => {
            const next = values[0];
            if (!next) {
              return;
            }

            setCustomOpen(false);
            onColorChange(Number(next));
          }}
          spacing={0}
          value={isCustom ? [] : [String(color)]}
          variant='outline'
        >
          {PRESET_COLOR_IDS.map((presetId) => {
            const [presetRed, presetGreen, presetBlue] =
              CROSSHAIR_PRESET_COLORS[presetId] ?? [0, 255, 0];

            return (
              <ToggleGroupItem
                aria-label={CROSSHAIR_PRESET_LABELS[presetId]}
                key={presetId}
                value={String(presetId)}
              >
                <span
                  className='size-4 rounded-full border border-border'
                  style={{
                    backgroundColor: `rgb(${presetRed}, ${presetGreen}, ${presetBlue})`,
                  }}
                />
              </ToggleGroupItem>
            );
          })}
        </ToggleGroup>

        <Popover
          onOpenChange={(open) => {
            setCustomOpen(open);
            if (open) {
              onColorChange(5);
            }
          }}
          open={customOpen}
        >
          <PopoverTrigger
            render={
              <Button
                aria-pressed={isCustom}
                size='sm'
                type='button'
                variant={isCustom ? 'default' : 'outline'}
              />
            }
          >
            <span className='size-4 rounded-full border border-border bg-linear-to-br from-red-500 via-green-500 to-blue-500' />
            Custom
          </PopoverTrigger>
          <PopoverContent align='start' className='w-auto p-0'>
            {customOpen ? (
              <ColorPicker
                className='border-0 shadow-none'
                onChange={(hex) => {
                  const rgb = crosshairHexToRgb(hex);
                  if (!rgb) {
                    return;
                  }

                  onCustomRgbChange(rgb);
                }}
                showAlpha={false}
                swatches={[...CROSSHAIR_PRESET_HEXES]}
                value={crosshairRgbToHex(red, green, blue)}
              />
            ) : null}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
