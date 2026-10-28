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

// Last `?code=` value the editor wrote itself, so URL changes we caused are
// not re-applied on top of newer edits.
let lastWrittenShareCode: string | null = null;

function updateShareCodeParam(
  setCodeParam: ReturnType<typeof useQueryState>[1],
  shareCode: string | null
) {
  lastWrittenShareCode = shareCode;
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

/**
 * Applies a `?code=` value once on mount. Render it under `key={codeParam}` so
 * every external URL change (link, back/forward) remounts it and re-applies.
 */
export function useApplyCrosshairCodeParam(codeParam: string | null) {
  const hydrate = useCrosshairStore((state) => state.hydrate);

  useMountEffect(() => {
    if (
      useCrosshairStore.getState().hydrated &&
      codeParam === lastWrittenShareCode
    ) {
      return;
    }

    hydrate(codeParam);
  });
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
  const updateField = useCrosshairStore((state) => state.updateField);
  const updateRgba = useCrosshairStore((state) => state.updateRgba);
  const updateOutlineRgba = useCrosshairStore(
    (state) => state.updateOutlineRgba
  );
  const resetCrosshair = useCrosshairStore((state) => state.resetCrosshair);

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
    codeParam,
    crosshair,
    importError,
    importShareCode,
    resetCrosshair: resetCrosshairWithUrl,
    shareCode,
    updateField: updateFieldWithUrl,
    updateOutlineRgba: updateOutlineRgbaWithUrl,
    updateRgba: updateRgbaWithUrl,
  };
}
