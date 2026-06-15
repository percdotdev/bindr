'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

function updateShareCodeParam(
  setCodeParam: ReturnType<typeof useQueryState>[1],
  shareCode: string | null
) {
  setCodeParam(shareCode).catch(() => undefined);
}

export function useCrosshairEditor(
  initialCrosshair: CrosshairSettings = DEFAULT_CROSSHAIR
) {
  const [crosshair, setCrosshair] = useState(initialCrosshair);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const skipUrlSyncRef = useRef(false);

  const [codeParam, setCodeParam] = useQueryState(
    'code',
    parseAsString.withOptions({
      clearOnDefault: true,
      history: 'replace',
    })
  );

  const shareCode = useMemo(() => encodeShareCode(crosshair), [crosshair]);

  useEffect(() => {
    if (hasInitialized) {
      return;
    }

    if (codeParam) {
      try {
        setCrosshair(decodeShareCode(codeParam));
        setHasInitialized(true);
        return;
      } catch {
        setImportError('Invalid share code in URL');
      }
    }

    const stored = loadStoredCrosshair();
    if (stored) {
      setCrosshair(stored);
    }

    setHasInitialized(true);
  }, [codeParam, hasInitialized]);

  useEffect(() => {
    if (!hasInitialized) {
      return;
    }

    saveStoredCrosshair(crosshair);
  }, [crosshair, hasInitialized]);

  useEffect(() => {
    if (!hasInitialized || skipUrlSyncRef.current) {
      skipUrlSyncRef.current = false;
      return;
    }

    const timeout = window.setTimeout(() => {
      updateShareCodeParam(setCodeParam, shareCode);
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [hasInitialized, setCodeParam, shareCode]);

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

  const importShareCode = useCallback(
    (code: string): boolean => {
      try {
        const decoded = decodeShareCode(code);
        skipUrlSyncRef.current = true;
        setCrosshair(decoded);
        updateShareCodeParam(setCodeParam, encodeShareCode(decoded));
        setImportError(null);
        return true;
      } catch (error) {
        setImportError(
          error instanceof Error ? error.message : 'Failed to import share code'
        );
        return false;
      }
    },
    [setCodeParam]
  );

  const resetCrosshair = useCallback(() => {
    skipUrlSyncRef.current = true;
    setCrosshair(DEFAULT_CROSSHAIR);
    clearStoredCrosshair();
    updateShareCodeParam(setCodeParam, null);
    setImportError(null);
  }, [setCodeParam]);

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
