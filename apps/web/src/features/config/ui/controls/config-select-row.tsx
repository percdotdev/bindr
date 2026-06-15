'use client';

import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';

export interface ConfigSelectOption {
  label: string;
  value: string;
}

interface ConfigSelectRowProps {
  description?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: ConfigSelectOption[];
  value: string;
}

export function ConfigSelectRow({
  description,
  id,
  label,
  onChange,
  options,
  value,
}: ConfigSelectRowProps) {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <Label htmlFor={id}>{label}</Label>
        {description ? (
          <span className='text-muted-foreground text-xs'>{description}</span>
        ) : null}
      </div>
      <Select
        onValueChange={(next) => {
          if (typeof next === 'string') {
            onChange(next);
          }
        }}
        value={value}
      >
        <SelectTrigger className='w-40 shrink-0' id={id}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
