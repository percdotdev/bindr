'use client';

import {
  CROSSHAIR_COLOR_SWATCHES,
  crosshairHexToRgba,
  crosshairRgbaToHex,
} from '@workspace/cs2/crosshair/model/crosshair-color';
import { Button } from '@workspace/ui/components/button';
import { ColorPicker } from '@workspace/ui/components/color-picker';
import { Label } from '@workspace/ui/components/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@workspace/ui/components/popover';
import { useState } from 'react';
import type { CrosshairRgba } from '@/features/crosshair/lib/storage/crosshair-store';

interface CrosshairColorPickerProps {
  id: string;
  label: string;
  onChange: (rgba: CrosshairRgba) => void;
  value: CrosshairRgba;
}

const CHECKERBOARD =
  'repeating-conic-gradient(rgba(127,127,127,0.5) 0% 25%, transparent 0% 50%) 50% / 8px 8px';

export function CrosshairColorPicker({
  id,
  label,
  onChange,
  value,
}: CrosshairColorPickerProps) {
  const [open, setOpen] = useState(false);
  const hex = crosshairRgbaToHex(
    value.red,
    value.green,
    value.blue,
    value.alpha
  );

  return (
    <div className='flex items-center justify-between gap-2'>
      <Label htmlFor={id}>{label}</Label>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger
          render={
            <Button
              className='font-mono tabular-nums'
              id={id}
              size='sm'
              type='button'
              variant='outline'
            />
          }
        >
          <span
            aria-hidden
            className='size-4 rounded-full border border-border'
            style={{ background: CHECKERBOARD }}
          >
            <span
              className='block size-full rounded-full'
              style={{
                backgroundColor: `rgba(${value.red}, ${value.green}, ${value.blue}, ${value.alpha / 255})`,
              }}
            />
          </span>
          {hex}
        </PopoverTrigger>
        <PopoverContent align='end' className='w-auto p-0'>
          {open ? (
            <ColorPicker
              className='border-0 shadow-none'
              onChange={(nextHex) => {
                const rgba = crosshairHexToRgba(nextHex);
                if (rgba) {
                  onChange(rgba);
                }
              }}
              swatches={[...CROSSHAIR_COLOR_SWATCHES]}
              value={hex}
            />
          ) : null}
        </PopoverContent>
      </Popover>
    </div>
  );
}
