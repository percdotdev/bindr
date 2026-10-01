'use client';

import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import type { CrosshairRgba } from '@/features/crosshair/lib/storage/crosshair-store';
import { CrosshairColorPicker } from '@/features/crosshair/ui/controls/crosshair-color-picker';

interface CrosshairOutlineControlsProps {
  crosshair: CrosshairSettings;
  onOutlineRgbaChange: (rgba: CrosshairRgba) => void;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

const OUTLINE_MODE_OPTIONS = [
  { value: 0, label: 'Off' },
  { value: 1, label: 'Full (1px around)' },
  { value: 2, label: 'Half (top & left only)' },
] as const;

export function CrosshairOutlineControls({
  crosshair,
  onOutlineRgbaChange,
  onUpdate,
}: CrosshairOutlineControlsProps) {
  const activeLabel =
    OUTLINE_MODE_OPTIONS.find(
      (option) => option.value === crosshair.outlineMode
    )?.label ?? 'Off';

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='crosshair-outline-mode'>Outline</Label>
        <Select
          onValueChange={(value) => {
            if (value !== null) {
              onUpdate('outlineMode', Number(value));
            }
          }}
          value={String(crosshair.outlineMode)}
        >
          <SelectTrigger className='w-full' id='crosshair-outline-mode'>
            <SelectValue>{activeLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {OUTLINE_MODE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {crosshair.outlineMode === 0 ? null : (
        <CrosshairColorPicker
          id='crosshair-outline-color'
          label='Outline color'
          onChange={onOutlineRgbaChange}
          value={{
            red: crosshair.outlineRed,
            green: crosshair.outlineGreen,
            blue: crosshair.outlineBlue,
            alpha: crosshair.outlineAlpha,
          }}
        />
      )}
    </div>
  );
}
