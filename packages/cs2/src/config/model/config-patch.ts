import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type {
  ConfigPatch,
  ConfigSettings,
} from '@workspace/cs2/config/model/types';

export function applyConfigPatch(
  config: ConfigSettings,
  patch: ConfigPatch
): ConfigSettings {
  return {
    ...config,
    viewmodel: patch.viewmodel
      ? { ...config.viewmodel, ...patch.viewmodel }
      : config.viewmodel,
    mouse: patch.mouse ? { ...config.mouse, ...patch.mouse } : config.mouse,
    radar: patch.radar ? { ...config.radar, ...patch.radar } : config.radar,
    network: patch.network
      ? { ...config.network, ...patch.network }
      : config.network,
    audio: patch.audio ? { ...config.audio, ...patch.audio } : config.audio,
    performance: patch.performance
      ? { ...config.performance, ...patch.performance }
      : config.performance,
    hud: patch.hud ? { ...config.hud, ...patch.hud } : config.hud,
  };
}

function revertSection<T extends object>(
  current: T,
  patch: Partial<T>,
  defaults: T
): T {
  const next = { ...current };

  for (const key of Object.keys(patch) as (keyof T)[]) {
    next[key] = defaults[key];
  }

  return next;
}

export function revertConfigPatch(
  config: ConfigSettings,
  patch: ConfigPatch
): ConfigSettings {
  return {
    ...config,
    viewmodel: patch.viewmodel
      ? revertSection(
          config.viewmodel,
          patch.viewmodel,
          DEFAULT_CONFIG.viewmodel
        )
      : config.viewmodel,
    mouse: patch.mouse
      ? revertSection(config.mouse, patch.mouse, DEFAULT_CONFIG.mouse)
      : config.mouse,
    radar: patch.radar
      ? revertSection(config.radar, patch.radar, DEFAULT_CONFIG.radar)
      : config.radar,
    network: patch.network
      ? revertSection(config.network, patch.network, DEFAULT_CONFIG.network)
      : config.network,
    audio: patch.audio
      ? revertSection(config.audio, patch.audio, DEFAULT_CONFIG.audio)
      : config.audio,
    performance: patch.performance
      ? revertSection(
          config.performance,
          patch.performance,
          DEFAULT_CONFIG.performance
        )
      : config.performance,
    hud: patch.hud
      ? revertSection(config.hud, patch.hud, DEFAULT_CONFIG.hud)
      : config.hud,
  };
}
