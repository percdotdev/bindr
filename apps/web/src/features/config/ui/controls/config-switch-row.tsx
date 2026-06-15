'use client';

import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';

interface ConfigSwitchRowProps {
  description?: string;
  enabled: boolean;
  id: string;
  label: string;
  onChange: (enabled: boolean) => void;
}

export function ConfigSwitchRow({
  description,
  enabled,
  id,
  label,
  onChange,
}: ConfigSwitchRowProps) {
  return (
    <div className='flex items-center justify-between gap-4'>
      <div className='flex min-w-0 flex-col gap-0.5'>
        <Label htmlFor={id}>{label}</Label>
        {description ? (
          <span className='text-muted-foreground text-xs'>{description}</span>
        ) : null}
      </div>
      <Switch checked={enabled} id={id} onCheckedChange={onChange} />
    </div>
  );
}
