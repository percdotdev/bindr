'use client';

import type {
  CrosshairField,
  CrosshairSettings,
} from '@workspace/cs2/crosshair/model/types';
import type { ShareCodeSource } from '@workspace/cs2/crosshair/share-code/decode-share-code';
import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';
import {
  type CrosshairRgba,
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

function currentShareCode(): string {
  return getCrosshairShareCode(useCrosshairStore.getState().crosshair);
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
  const updateRgba = useCrosshairStore((state) => state.updateRgba);
  const updateOutlineRgba = useCrosshairStore(
    (state) => state.updateOutlineRgba
  );
  const resetCrosshair = useCrosshairStore((state) => state.resetCrosshair);

  useMountEffect(() => {
    hydrate(codeParam);
  });

  const shareCode = useMemo(
    () => getCrosshairShareCode(crosshair),
    [crosshair]
  );

  const syncShareCodeUrl = useCallback(() => {
    scheduleShareCodeUrlUpdate(setCodeParam, currentShareCode());
  }, [setCodeParam]);

  const updateFieldWithUrl = useCallback(
    <K extends CrosshairField>(field: K, value: CrosshairSettings[K]) => {
      updateField(field, value);
      syncShareCodeUrl();
    },
    [syncShareCodeUrl, updateField]
  );

  const updateRgbaWithUrl = useCallback(
    (rgba: CrosshairRgba) => {
      updateRgba(rgba);
      syncShareCodeUrl();
    },
    [syncShareCodeUrl, updateRgba]
  );

  const updateOutlineRgbaWithUrl = useCallback(
    (rgba: CrosshairRgba) => {
      updateOutlineRgba(rgba);
      syncShareCodeUrl();
    },
    [syncShareCodeUrl, updateOutlineRgba]
  );

  const importShareCode = useCallback(
    (code: string): ShareCodeSource | null => {
      const source = useCrosshairStore.getState().importShareCode(code);
      if (source) {
        updateShareCodeParam(setCodeParam, currentShareCode());
      }
      return source;
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
    updateRgba: updateRgbaWithUrl,
    updateOutlineRgba: updateOutlineRgbaWithUrl,
    importShareCode,
    resetCrosshair: resetCrosshairWithUrl,
  };
}
