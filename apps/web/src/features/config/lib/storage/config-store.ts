'use client';

import { create } from 'zustand';

import { DEFAULT_CONFIG } from '@/features/config/lib/model/default-config';
import {
  applyAllRecommendedTemplates,
  applyRecommendedTemplate,
  removeRecommendedTemplate,
} from '@/features/config/lib/model/recommended-config';
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
  addRecommendedConfig: (templateId: string) => boolean;
  applyViewmodelPreset: (presetId: string) => boolean;
  config: ConfigSettings;
  hydrate: () => void;
  hydrated: boolean;
  loadAllRecommendedConfigs: () => void;
  removeRecommendedConfig: (templateId: string) => boolean;
  resetConfig: () => void;
  updateViewmodelField: <K extends ViewmodelField>(
    field: K,
    value: ViewmodelSettings[K]
  ) => void;
}

function persistConfig(config: ConfigSettings) {
  saveStoredConfig(config);
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
      ...get().config,
      viewmodel: {
        ...get().config.viewmodel,
        [field]: value,
      },
    };
    persistConfig(next);
    set({ config: next });
  },

  applyViewmodelPreset: (presetId) => {
    const preset = getViewmodelPresetById(presetId);
    if (!preset) {
      return false;
    }

    const next: ConfigSettings = {
      ...get().config,
      viewmodel: { ...preset.viewmodel },
    };
    persistConfig(next);
    set({ config: next });
    return true;
  },

  addRecommendedConfig: (templateId) => {
    const next = applyRecommendedTemplate(get().config, templateId);
    if (!next) {
      return false;
    }

    persistConfig(next);
    set({ config: next });
    return true;
  },

  removeRecommendedConfig: (templateId) => {
    const next = removeRecommendedTemplate(get().config, templateId);
    if (!next) {
      return false;
    }

    persistConfig(next);
    set({ config: next });
    return true;
  },

  loadAllRecommendedConfigs: () => {
    const next = applyAllRecommendedTemplates();
    persistConfig(next);
    set({ config: next });
  },

  resetConfig: () => {
    clearStoredConfig();
    set({ config: DEFAULT_CONFIG });
  },
}));
