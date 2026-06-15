'use client';

import { create } from 'zustand';

import { DEFAULT_CONFIG } from '@/features/config/lib/model/default-config';
import type {
  ConfigSettings,
  ViewmodelField,
  ViewmodelSettings,
} from '@/features/config/lib/model/types';
import { getViewmodelPresetById } from '@/features/config/lib/model/viewmodel-presets';
import {
  clearStoredConfig,
  loadStoredConfig,
  saveStoredConfig,
} from '@/features/config/lib/storage/config-storage';

interface ConfigStore {
  applyViewmodelPreset: (presetId: string) => boolean;
  config: ConfigSettings;
  hydrate: () => void;
  hydrated: boolean;
  resetConfig: () => void;
  updateViewmodelField: <K extends ViewmodelField>(
    field: K,
    value: ViewmodelSettings[K]
  ) => void;
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
  config: DEFAULT_CONFIG,
  hydrated: false,

  hydrate: () => {
    if (get().hydrated) {
      return;
    }

    set({
      config: loadStoredConfig() ?? DEFAULT_CONFIG,
      hydrated: true,
    });
  },

  updateViewmodelField: (field, value) => {
    const next: ConfigSettings = {
      viewmodel: {
        ...get().config.viewmodel,
        [field]: value,
      },
    };
    saveStoredConfig(next);
    set({ config: next });
  },

  applyViewmodelPreset: (presetId) => {
    const preset = getViewmodelPresetById(presetId);
    if (!preset) {
      return false;
    }

    const next: ConfigSettings = {
      viewmodel: { ...preset.viewmodel },
    };
    saveStoredConfig(next);
    set({ config: next });
    return true;
  },

  resetConfig: () => {
    clearStoredConfig();
    set({ config: DEFAULT_CONFIG });
  },
}));
