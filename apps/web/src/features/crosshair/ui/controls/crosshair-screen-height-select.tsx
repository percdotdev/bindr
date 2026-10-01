'use client';

import { CROSSHAIR_SCREEN_HEIGHT_PRESETS } from '@workspace/cs2/crosshair/model/crosshair-limits';
import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';

interface CrosshairScreenHeightSelectProps {
  onScreenHeightChange: (screenHeight: number) => void;
  screenHeight: number;
}

function formatScreenHeight(screenHeight: number): string {
  return `${screenHeight}p`;
}

export function CrosshairScreenHeightSelect({
  onScreenHeightChange,
  screenHeight,
}: CrosshairScreenHeightSelectProps) {
  const presets: readonly number[] = CROSSHAIR_SCREEN_HEIGHT_PRESETS;
  const options = presets.includes(screenHeight)
    ? presets
    : [...presets, screenHeight].sort((a, b) => a - b);

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor='crosshair-screen-height'>Made for screen height</Label>
      <Select
        onValueChange={(value) => {
          if (value !== null) {
            onScreenHeightChange(Number(value));
          }
        }}
        value={String(screenHeight)}
      >
        <SelectTrigger className='w-full' id='crosshair-screen-height'>
          <SelectValue>{formatScreenHeight(screenHeight)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {formatScreenHeight(option)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className='text-muted-foreground text-xs'>
        Sizes are in pixels. CS2 keeps the crosshair the same relative size when
        you play at a different resolution.
      </p>
    </div>
  );
}
