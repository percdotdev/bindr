'use client';

import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Slider } from '@workspace/ui/components/slider';
import { cn } from '@workspace/ui/lib/utils';
import { useEffect, useState } from 'react';

import {
  formatControlValue,
  snapToStep,
} from '@/features/crosshair/ui/controls/control-slider-math';

interface CrosshairControlSliderProps {
  disabled?: boolean;
  id: string;
  label: string;
  max: number;
  min: number;
  onValueChange: (value: number) => void;
  step: number;
  value: number;
}

export function CrosshairControlSlider({
  disabled = false,
  id,
  label,
  max,
  min,
  step,
  value,
  onValueChange,
}: CrosshairControlSliderProps) {
  const [draft, setDraft] = useState(() => formatControlValue(value, step));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setDraft(formatControlValue(value, step));
    }
  }, [isEditing, step, value]);

  const commitDraft = () => {
    if (disabled) {
      return;
    }

    const parsed = Number.parseFloat(draft);

    if (Number.isNaN(parsed)) {
      setDraft(formatControlValue(value, step));
      setIsEditing(false);
      return;
    }

    const next = snapToStep(parsed, min, max, step);
    onValueChange(next);
    setDraft(formatControlValue(next, step));
    setIsEditing(false);
  };

  return (
    <div className={cn('flex flex-col gap-2', disabled && 'opacity-50')}>
      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor={id}>{label}</Label>
        <Input
          aria-label={`${label} value`}
          className='h-7 w-20 px-2 text-right font-mono tabular-nums'
          disabled={disabled}
          id={`${id}-value`}
          inputMode='decimal'
          onBlur={commitDraft}
          onChange={(event) => {
            setDraft(event.target.value);
          }}
          onFocus={() => {
            setIsEditing(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.currentTarget.blur();
            }

            if (event.key === 'Escape') {
              setDraft(formatControlValue(value, step));
              setIsEditing(false);
              event.currentTarget.blur();
            }
          }}
          type='text'
          value={draft}
        />
      </div>
      <Slider
        aria-labelledby={id}
        disabled={disabled}
        id={id}
        max={max}
        min={min}
        onValueChange={(values) => {
          const next = Array.isArray(values) ? values[0] : values;
          if (next !== undefined) {
            onValueChange(next);
          }
        }}
        step={step}
        value={[value]}
      />
    </div>
  );
}
