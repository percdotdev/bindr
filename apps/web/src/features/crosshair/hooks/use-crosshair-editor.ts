'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useMemo, useState } from 'react';

import { applyCrosshairColor } from '@/features/crosshair/lib/model/crosshair-color';
import { DEFAULT_CROSSHAIR } from '@/features/crosshair/lib/model/default-crosshair';
import type {
  CrosshairField,
  CrosshairSettings,
} from '@/features/crosshair/lib/model/types';
import { decodeShareCode } from '@/features/crosshair/lib/share-code/decode-share-code';
import { encodeShareCode } from '@/features/crosshair/lib/share-code/encode-share-code';
import {
  clearStoredCrosshair,
  loadStoredCrosshair,
  saveStoredCrosshair,
} from '@/features/crosshair/lib/storage/crosshair-storage';
import { useMountEffect } from '@/shared/hooks/use-mount-effect';

function updateShareCodeParam(
  setCodeParam: ReturnType<typeof useQueryState>[1],
  shareCode: string | null
) {
  setCodeParam(shareCode).catch(() => undefined);
}

let urlSyncTimer: ReturnType<typeof setTimeout> | undefined;

function scheduleShareCodeUrlUpdate(
  setCodeParam: ReturnType<typeof useQueryState>[1],
  crosshair: CrosshairSettings
) {
  if (urlSyncTimer) {
    clearTimeout(urlSyncTimer);
  }

  urlSyncTimer = setTimeout(() => {
    updateShareCodeParam(setCodeParam, encodeShareCode(crosshair));
  }, 300);
}

function applyFieldUpdate<K extends CrosshairField>(
  current: CrosshairSettings,
  field: K,
  value: CrosshairSettings[K]
): CrosshairSettings {
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
}

export function useCrosshairEditor(
  initialCrosshair: CrosshairSettings = DEFAULT_CROSSHAIR
) {
  const [crosshair, setCrosshair] = useState(initialCrosshair);
  const [importError, setImportError] = useState<string | null>(null);

  const [codeParam, setCodeParam] = useQueryState(
    'code',
    parseAsString.withOptions({
      clearOnDefault: true,
      history: 'replace',
    })
  );

  const shareCode = useMemo(() => encodeShareCode(crosshair), [crosshair]);

  useMountEffect(() => {
    if (codeParam) {
      try {
        setCrosshair(decodeShareCode(codeParam));
        return;
      } catch {
        setImportError('Invalid share code in URL');
      }
    }

    const stored = loadStoredCrosshair();
    if (stored) {
      setCrosshair(stored);
    }
  });

  const updateField = useCallback(
    <K extends CrosshairField>(field: K, value: CrosshairSettings[K]) => {
      setCrosshair((current) => {
        const next = applyFieldUpdate(current, field, value);
        saveStoredCrosshair(next);
        scheduleShareCodeUrlUpdate(setCodeParam, next);
        return next;
      });
      setImportError(null);
    },
    [setCodeParam]
  );

  const updateColor = useCallback(
    (color: number) => {
      setCrosshair((current) => {
        const next = applyCrosshairColor(current, color);
        saveStoredCrosshair(next);
        scheduleShareCodeUrlUpdate(setCodeParam, next);
        return next;
      });
      setImportError(null);
    },
    [setCodeParam]
  );

  const updateCustomRgb = useCallback(
    (rgb: { blue: number; green: number; red: number }) => {
      setCrosshair((current) => {
        const next = { ...current, ...rgb, color: 5 };
        saveStoredCrosshair(next);
        scheduleShareCodeUrlUpdate(setCodeParam, next);
        return next;
      });
      setImportError(null);
    },
    [setCodeParam]
  );

  const importShareCode = useCallback(
    (code: string): boolean => {
      try {
        const decoded = decodeShareCode(code);
        const encoded = encodeShareCode(decoded);
        setCrosshair(decoded);
        saveStoredCrosshair(decoded);
        updateShareCodeParam(setCodeParam, encoded);
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
