'use client';

import { Button } from '@workspace/ui/components/button';

interface CrosshairToggleProps {
  enabled: boolean;
  label: string;
  onToggle: (enabled: boolean) => void;
}

export function CrosshairToggle({
  enabled,
  label,
  onToggle,
}: CrosshairToggleProps) {
  return (
    <Button
      aria-pressed={enabled}
      onClick={() => onToggle(!enabled)}
      size='sm'
      type='button'
      variant={enabled ? 'default' : 'outline'}
    >
      {label}
    </Button>
  );
}
