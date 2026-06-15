'use client';

import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import {
  CROSSHAIR_STYLE_OPTIONS,
  getCrosshairStyleDescription,
  getCrosshairStyleLabel,
} from '@/features/crosshair/lib/model/crosshair-style';

interface CrosshairStyleSelectProps {
  onStyleChange: (style: number) => void;
  style: number;
}

export function CrosshairStyleSelect({
  onStyleChange,
  style,
}: CrosshairStyleSelectProps) {
  const description = getCrosshairStyleDescription(style);

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor='crosshair-style'>Style</Label>
      <Select
        onValueChange={(value) => {
          if (value !== null) {
            onStyleChange(Number(value));
          }
        }}
        value={String(style)}
      >
        <SelectTrigger className='w-full' id='crosshair-style'>
          <SelectValue>{getCrosshairStyleLabel(style)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {CROSSHAIR_STYLE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description ? (
        <p className='text-muted-foreground text-xs'>{description}</p>
      ) : null}
    </div>
  );
}
