'use client';

import { create } from 'zustand';

import { DEFAULT_CONFIG } from '@/features/config/lib/model/default-config';
import {
  applyAllRecommendedTemplates,
  applyRecommendedTemplate,
  removeRecommendedTemplate,
} from '@/features/config/lib/model/recommended-config';
import type {
  ConfigSectionKey,
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
  updateField: <S extends ConfigSectionKey, K extends keyof ConfigSettings[S]>(
    section: S,
    field: K,
    value: ConfigSettings[S][K]
  ) => void;
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

  updateField: (section, field, value) => {
    const current = get().config;
    const next: ConfigSettings = {
      ...current,
      [section]: {
        ...current[section],
        [field]: value,
      },
    };
    persistConfig(next);
    set({ config: next });
  },

  updateViewmodelField: (field, value) => {
    get().updateField('viewmodel', field, value);
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
