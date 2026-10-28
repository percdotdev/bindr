'use client';

import { useApplyCrosshairCodeParam } from '@/features/crosshair/hooks/use-crosshair-editor';

interface CrosshairCodeSyncProps {
  codeParam: string | null;
}

/** Mount with `key={codeParam}` so each new `?code=` value is applied. */
export function CrosshairCodeSync({ codeParam }: CrosshairCodeSyncProps) {
  useApplyCrosshairCodeParam(codeParam);
  return null;
}
