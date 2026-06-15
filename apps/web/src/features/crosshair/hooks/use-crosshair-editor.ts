'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { applyCrosshairColor } from '@/features/crosshair/lib/crosshair-color';
import {
  clearStoredCrosshair,
  loadStoredCrosshair,
  saveStoredCrosshair,
} from '@/features/crosshair/lib/crosshair-storage';
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
  const [hasLoadedStorage, setHasLoadedStorage] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const shareCode = useMemo(() => encodeShareCode(crosshair), [crosshair]);

  useEffect(() => {
    const stored = loadStoredCrosshair();
    if (stored) {
      setCrosshair(stored);
    }
    setHasLoadedStorage(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedStorage) {
      return;
    }

    saveStoredCrosshair(crosshair);
  }, [crosshair, hasLoadedStorage]);

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

        if (
          field === 'alpha' &&
          typeof value === 'number' &&
          value < 255 &&
          !next.alphaEnabled
        ) {
          next.alphaEnabled = true;
        }

        return next;
      });
      setImportError(null);
    },
    []
  );

  const updateColor = useCallback((color: number) => {
    setCrosshair((current) => applyCrosshairColor(current, color));
    setImportError(null);
  }, []);

  const updateCustomRgb = useCallback(
    (rgb: { blue: number; green: number; red: number }) => {
      setCrosshair((current) => ({
        ...current,
        ...rgb,
        color: 5,
      }));
      setImportError(null);
    },
    []
  );

  const importShareCode = useCallback((code: string): boolean => {
    try {
      setCrosshair(decodeShareCode(code));
      setImportError(null);
      return true;
    } catch (error) {
      setImportError(
        error instanceof Error ? error.message : 'Failed to import share code'
      );
      return false;
    }
  }, []);

  const resetCrosshair = useCallback(() => {
    setCrosshair(DEFAULT_CROSSHAIR);
    clearStoredCrosshair();
    setImportError(null);
  }, []);

  return {
    crosshair,
    shareCode,
    importError,
    updateField,
    updateColor,
    updateCustomRgb,
    importShareCode,
    resetCrosshair,
  };
}
