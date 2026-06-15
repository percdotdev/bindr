'use client';

import { useCallback, useMemo, useState } from 'react';
import { normalizeEditorCrosshair } from '@/features/crosshair/lib/crosshair-color';
import { decodeShareCode } from '@/features/crosshair/lib/decode-share-code';
import { DEFAULT_CROSSHAIR } from '@/features/crosshair/lib/default-crosshair';
import { encodeShareCode } from '@/features/crosshair/lib/encode-share-code';
import type {
  CrosshairField,
  CrosshairSettings,
} from '@/features/crosshair/lib/types';

export function useCrosshairEditor(
  initialCrosshair: CrosshairSettings = DEFAULT_CROSSHAIR
) {
  const [crosshair, setCrosshair] = useState(initialCrosshair);
  const [importError, setImportError] = useState<string | null>(null);

  const shareCode = useMemo(() => encodeShareCode(crosshair), [crosshair]);

  const updateField = useCallback(
    <K extends CrosshairField>(field: K, value: CrosshairSettings[K]) => {
      setCrosshair((current) => {
        const next = { ...current, [field]: value };

        if (field === 'red' || field === 'green' || field === 'blue') {
          next.color = 5;
        }

        if (
          field === 'outline' &&
          typeof value === 'number' &&
          value > 0 &&
          !next.outlineEnabled
        ) {
          next.outlineEnabled = true;
        }

        return next;
      });
      setImportError(null);
    },
    []
  );

  const importShareCode = useCallback((code: string) => {
    try {
      setCrosshair(normalizeEditorCrosshair(decodeShareCode(code)));
      setImportError(null);
    } catch (error) {
      setImportError(
        error instanceof Error ? error.message : 'Failed to import share code'
      );
    }
  }, []);

  const resetCrosshair = useCallback(() => {
    setCrosshair(DEFAULT_CROSSHAIR);
    setImportError(null);
  }, []);

  return {
    crosshair,
    shareCode,
    importError,
    updateField,
    importShareCode,
    resetCrosshair,
  };
}
