'use client';

import { create } from 'zustand';

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

function persistCrosshair(crosshair: CrosshairSettings) {
  saveStoredCrosshair(crosshair);
}

interface CrosshairStore {
  crosshair: CrosshairSettings;
  hydrate: (codeParam: string | null) => void;
  hydrated: boolean;
  importError: string | null;
  importShareCode: (code: string) => boolean;
  resetCrosshair: () => void;
  updateColor: (color: number) => void;
  updateCustomRgb: (rgb: { blue: number; green: number; red: number }) => void;
  updateField: <K extends CrosshairField>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
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
          crosshair: decodeShareCode(codeParam),
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

  updateColor: (color) => {
    const next = applyCrosshairColor(get().crosshair, color);
    persistCrosshair(next);
    set({ crosshair: next, importError: null });
  },

  updateCustomRgb: (rgb) => {
    const next = { ...get().crosshair, ...rgb, color: 5 };
    persistCrosshair(next);
    set({ crosshair: next, importError: null });
  },

  importShareCode: (code) => {
    try {
      const decoded = decodeShareCode(code);
      persistCrosshair(decoded);
      set({ crosshair: decoded, importError: null });
      return true;
    } catch (error) {
      set({
        importError:
          error instanceof Error
            ? error.message
            : 'Failed to import share code',
      });
      return false;
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
