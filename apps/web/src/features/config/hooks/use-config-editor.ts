'use client';

import { useConfigStore } from '@/features/config/lib/storage/config-store';
import { useMountEffect } from '@/shared/hooks/use-mount-effect';

export function useConfigEditor() {
  const hydrate = useConfigStore((state) => state.hydrate);
  const config = useConfigStore((state) => state.config);
  const updateField = useConfigStore((state) => state.updateField);
  const updateViewmodelField = useConfigStore(
    (state) => state.updateViewmodelField
  );
  const applyViewmodelPreset = useConfigStore(
    (state) => state.applyViewmodelPreset
  );
  const addRecommendedConfig = useConfigStore(
    (state) => state.addRecommendedConfig
  );
  const removeRecommendedConfig = useConfigStore(
    (state) => state.removeRecommendedConfig
  );
  const loadAllRecommendedConfigs = useConfigStore(
    (state) => state.loadAllRecommendedConfigs
  );
  const resetConfig = useConfigStore((state) => state.resetConfig);

  useMountEffect(hydrate);

  return {
    addRecommendedConfig,
    applyViewmodelPreset,
    config,
    enabledRecommendations: config.enabledRecommendations,
    loadAllRecommendedConfigs,
    removeRecommendedConfig,
    resetConfig,
    updateField,
    updateViewmodelField,
    viewmodel: config.viewmodel,
  };
}
