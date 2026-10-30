'use client';

import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type {
  ConfigSectionKey,
  ConfigSettings,
  ViewmodelField,
  ViewmodelSettings,
} from '@workspace/cs2/config/model/types';
import { getViewmodelPresetById } from '@workspace/cs2/config/model/viewmodel-presets';
import {
  applyRecommendedTemplate,
  removeRecommendedTemplate,
} from '@workspace/cs2/config/recommended/apply';
import { parseStoredConfig } from '@workspace/cs2/share/studio-share';
import { create } from 'zustand';

import { readStudioDraft, writeStudioDraft } from '@/shared/lib/studio-draft';

interface ConfigStore {
  addRecommendedConfig: (templateId: string) => boolean;
  applyViewmodelPreset: (presetId: string) => boolean;
  config: ConfigSettings;
  hydrate: () => void;
  hydrated: boolean;
  removeRecommendedConfig: (templateId: string) => boolean;
  replaceConfig: (config: ConfigSettings) => void;
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

export const useConfigStore = create<ConfigStore>((set, get) => ({
  addRecommendedConfig: (templateId) => {
    const next = applyRecommendedTemplate(get().config, templateId);
    if (!next) {
      return false;
    }

    set({ config: next });
    return true;
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
    set({ config: next });
    return true;
  },
  config: DEFAULT_CONFIG,

  hydrate: () => {
    if (get().hydrated) {
      return;
    }

    const stored = readStudioDraft('config', parseStoredConfig);
    set({
      config: stored ?? get().config,
      hydrated: true,
    });
  },
  hydrated: false,

  removeRecommendedConfig: (templateId) => {
    const next = removeRecommendedTemplate(get().config, templateId);
    if (!next) {
      return false;
    }

    set({ config: next });
    return true;
  },

  replaceConfig: (config) => {
    set({ config, hydrated: true });
  },

  resetConfig: () => {
    set({ config: DEFAULT_CONFIG });
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
    set({ config: next });
  },

  updateViewmodelField: (field, value) => {
    get().updateField('viewmodel', field, value);
  },
}));

useConfigStore.subscribe((state, previous) => {
  if (!(state.hydrated && state.config !== previous.config)) {
    return;
  }
  writeStudioDraft('config', state.config);
});
