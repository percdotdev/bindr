'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

import type {
  CrosshairField,
  CrosshairSettings,
} from '@/features/crosshair/lib/model/types';
import {
  getCrosshairShareCode,
  useCrosshairStore,
} from '@/features/crosshair/lib/storage/crosshair-store';
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
  shareCode: string
) {
  if (urlSyncTimer) {
    clearTimeout(urlSyncTimer);
  }

  urlSyncTimer = setTimeout(() => {
    updateShareCodeParam(setCodeParam, shareCode);
  }, 300);
}

export function useCrosshairEditor() {
  const [codeParam, setCodeParam] = useQueryState(
    'code',
    parseAsString.withOptions({
      clearOnDefault: true,
      history: 'replace',
    })
  );

  const crosshair = useCrosshairStore((state) => state.crosshair);
  const importError = useCrosshairStore((state) => state.importError);
  const hydrate = useCrosshairStore((state) => state.hydrate);
  const updateField = useCrosshairStore((state) => state.updateField);
  const updateColor = useCrosshairStore((state) => state.updateColor);
  const updateCustomRgb = useCrosshairStore((state) => state.updateCustomRgb);
  const resetCrosshair = useCrosshairStore((state) => state.resetCrosshair);

  useMountEffect(() => {
    hydrate(codeParam);
  });

  const shareCode = useMemo(
    () => getCrosshairShareCode(crosshair),
    [crosshair]
  );

  const syncShareCodeUrl = useCallback(
    (nextShareCode: string | null) => {
      if (nextShareCode === null) {
        updateShareCodeParam(setCodeParam, null);
        return;
      }

      scheduleShareCodeUrlUpdate(setCodeParam, nextShareCode);
    },
    [setCodeParam]
  );

  const updateFieldWithUrl = useCallback(
    <K extends CrosshairField>(field: K, value: CrosshairSettings[K]) => {
      updateField(field, value);
      syncShareCodeUrl(
        getCrosshairShareCode(useCrosshairStore.getState().crosshair)
      );
    },
    [syncShareCodeUrl, updateField]
  );

  const updateColorWithUrl = useCallback(
    (color: number) => {
      updateColor(color);
      syncShareCodeUrl(
        getCrosshairShareCode(useCrosshairStore.getState().crosshair)
      );
    },
    [syncShareCodeUrl, updateColor]
  );

  const updateCustomRgbWithUrl = useCallback(
    (rgb: { blue: number; green: number; red: number }) => {
      updateCustomRgb(rgb);
      syncShareCodeUrl(
        getCrosshairShareCode(useCrosshairStore.getState().crosshair)
      );
    },
    [syncShareCodeUrl, updateCustomRgb]
  );

  const importShareCode = useCallback(
    (code: string): boolean => {
      const ok = useCrosshairStore.getState().importShareCode(code);
      if (ok) {
        updateShareCodeParam(
          setCodeParam,
          getCrosshairShareCode(useCrosshairStore.getState().crosshair)
        );
      }
      return ok;
    },
    [setCodeParam]
  );

  const resetCrosshairWithUrl = useCallback(() => {
    resetCrosshair();
    updateShareCodeParam(setCodeParam, null);
  }, [resetCrosshair, setCodeParam]);

  return {
    crosshair,
    shareCode,
    importError,
    updateField: updateFieldWithUrl,
    updateColor: updateColorWithUrl,
    updateCustomRgb: updateCustomRgbWithUrl,
    importShareCode,
    resetCrosshair: resetCrosshairWithUrl,
  };
}
