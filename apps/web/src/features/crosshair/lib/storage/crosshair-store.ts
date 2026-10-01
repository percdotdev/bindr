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
import {
  clearStoredCrosshair,
  loadStoredCrosshair,
  saveStoredCrosshair,
} from '@/features/crosshair/lib/storage/crosshair-storage';

export type CrosshairRgba = CrosshairRgb & { alpha: number };

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

function persistCrosshair(crosshair: CrosshairSettings) {
  saveStoredCrosshair(crosshair);
}

interface CrosshairStore {
  crosshair: CrosshairSettings;
  hydrate: (codeParam: string | null) => void;
  hydrated: boolean;
  importError: string | null;
  importShareCode: (code: string) => ShareCodeSource | null;
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
  hydrated: false,
  importError: null,

  hydrate: (codeParam) => {
    if (get().hydrated) {
      return;
    }

    if (codeParam) {
      try {
        set({
          crosshair: decodeShareCodeDetailed(codeParam).crosshair,
          hydrated: true,
          importError: null,
        });
        return;
      } catch {
        set({
          hydrated: true,
          importError: 'Invalid share code in URL',
        });
        return;
      }
    }

    const stored = loadStoredCrosshair();
    set({
      crosshair: stored ?? DEFAULT_CROSSHAIR,
      hydrated: true,
      importError: null,
    });
  },

  updateField: (field, value) => {
    const next = applyFieldUpdate(get().crosshair, field, value);
    persistCrosshair(next);
    set({ crosshair: next, importError: null });
  },

  updateRgba: (rgba) => {
    const next = { ...get().crosshair, ...rgba };
    persistCrosshair(next);
    set({ crosshair: next, importError: null });
  },

  updateOutlineRgba: ({ red, green, blue, alpha }) => {
    const next = {
      ...get().crosshair,
      outlineRed: red,
      outlineGreen: green,
      outlineBlue: blue,
      outlineAlpha: alpha,
    };
    persistCrosshair(next);
    set({ crosshair: next, importError: null });
  },

  importShareCode: (code) => {
    try {
      const { crosshair, source } = decodeShareCodeDetailed(code);
      persistCrosshair(crosshair);
      set({ crosshair, importError: null });
      return source;
    } catch (error) {
      set({
        importError:
          error instanceof Error
            ? error.message
            : 'Failed to import share code',
      });
      return null;
    }
  },

  resetCrosshair: () => {
    clearStoredCrosshair();
    set({ crosshair: DEFAULT_CROSSHAIR, importError: null });
  },
}));

export function getCrosshairShareCode(crosshair: CrosshairSettings) {
  return encodeShareCode(crosshair);
}
