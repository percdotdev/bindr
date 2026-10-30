'use client';

import { allowsNegativeCrosshairGap } from '@workspace/cs2/crosshair/model/crosshair-style';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import type {
  CrosshairField,
  CrosshairRgb,
  CrosshairSettings,
} from '@workspace/cs2/crosshair/model/types';
import {
  decodeShareCodeDetailed,
  type ShareCodeSource,
} from '@workspace/cs2/crosshair/share-code/decode-share-code';
import { encodeShareCode } from '@workspace/cs2/crosshair/share-code/encode-share-code';
import { create } from 'zustand';

export type CrosshairRgba = CrosshairRgb & { alpha: number };

export type CrosshairImportErrorKey =
  | 'importErrorFailed'
  | 'importErrorInvalid'
  | 'importErrorInvalidUrl'
  | 'importErrorUnsupported';

function mapImportError(error: unknown): CrosshairImportErrorKey {
  const message = error instanceof Error ? error.message : '';

  if (message.includes('Unsupported')) {
    return 'importErrorUnsupported';
  }

  if (message.includes('Invalid')) {
    return 'importErrorInvalid';
  }

  return 'importErrorFailed';
}

function applyFieldUpdate<K extends CrosshairField>(
  current: CrosshairSettings,
  field: K,
  value: CrosshairSettings[K]
): CrosshairSettings {
  const next = { ...current, [field]: value };

  if (field === 'style' && !allowsNegativeCrosshairGap(next.style)) {
    next.gap = Math.max(0, next.gap);
  }

  return next;
}

interface CrosshairStore {
  crosshair: CrosshairSettings;
  hydrate: (codeParam: string | null) => void;
  hydrated: boolean;
  importError: CrosshairImportErrorKey | null;
  importShareCode: (code: string) => ShareCodeSource | null;
  replaceCrosshair: (crosshair: CrosshairSettings) => void;
  resetCrosshair: () => void;
  updateField: <K extends CrosshairField>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
  updateOutlineRgba: (rgba: CrosshairRgba) => void;
  updateRgba: (rgba: CrosshairRgba) => void;
}

export const useCrosshairStore = create<CrosshairStore>((set, get) => ({
  crosshair: DEFAULT_CROSSHAIR,

  hydrate: (codeParam) => {
    // A `?code=` share link always wins, even after an earlier hydration
    // (e.g. client-side navigation from /autoexec to /crosshair?code=…).
    if (codeParam) {
      // Already showing this exact code (e.g. our own URL sync): nothing to do.
      if (get().hydrated && codeParam === encodeShareCode(get().crosshair)) {
        return;
      }

      try {
        set({
          crosshair: decodeShareCodeDetailed(codeParam).crosshair,
          hydrated: true,
          importError: null,
        });
      } catch {
        set({
          crosshair: get().hydrated ? get().crosshair : DEFAULT_CROSSHAIR,
          hydrated: true,
          importError: 'importErrorInvalidUrl',
        });
      }
      return;
    }

    if (get().hydrated) {
      return;
    }

    set({ hydrated: true, importError: null });
  },
  hydrated: false,
  importError: null,

  importShareCode: (code) => {
    try {
      const { crosshair, source } = decodeShareCodeDetailed(code);
      set({ crosshair, importError: null });
      return source;
    } catch (error) {
      set({
        importError: mapImportError(error),
      });
      return null;
    }
  },

  replaceCrosshair: (crosshair) => {
    set({ crosshair, hydrated: true, importError: null });
  },

  resetCrosshair: () => {
    set({ crosshair: DEFAULT_CROSSHAIR, importError: null });
  },

  updateField: (field, value) => {
    const next = applyFieldUpdate(get().crosshair, field, value);
    set({ crosshair: next, importError: null });
  },

  updateOutlineRgba: ({ red, green, blue, alpha }) => {
    const next = {
      ...get().crosshair,
      outlineAlpha: alpha,
      outlineBlue: blue,
      outlineGreen: green,
      outlineRed: red,
    };
    set({ crosshair: next, importError: null });
  },

  updateRgba: (rgba) => {
    const next = { ...get().crosshair, ...rgba };
    set({ crosshair: next, importError: null });
  },
}));

export function getCrosshairShareCode(crosshair: CrosshairSettings) {
  return encodeShareCode(crosshair);
}
