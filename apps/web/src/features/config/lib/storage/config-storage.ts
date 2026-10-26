import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type {
  AudioSettings,
  ConfigSettings,
  HudSettings,
  MouseSettings,
  NetworkSettings,
  PerformanceSettings,
  RadarSettings,
  ViewmodelSettings,
} from '@workspace/cs2/config/model/types';
import {
  getRecommendedConfigTemplateById,
  isRecommendedConfigId,
} from '@workspace/cs2/config/recommended/templates';

const STORAGE_KEY = 'bindr:config:v1';

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

/**
 * Section objects are validated loosely so older saved drafts that predate newer
 * cvars still load — `normalizeConfigSettings` backfills any missing fields from
 * defaults. We only reject values that are clearly not objects.
 */
function isOptionalSection(value: unknown): boolean {
  return value === undefined || isPlainObject(value);
}

function isConfigSettings(value: unknown): value is Record<string, unknown> {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    isOptionalSection(value.viewmodel) &&
    isOptionalSection(value.mouse) &&
    isOptionalSection(value.radar) &&
    isOptionalSection(value.network) &&
    isOptionalSection(value.audio) &&
    isOptionalSection(value.performance) &&
    isOptionalSection(value.hud) &&
    (value.enabledRecommendations === undefined ||
      isStringArray(value.enabledRecommendations))
  );
}

function asNumber(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function asBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function normalizeViewmodel(
  value: Record<string, unknown> | undefined
): ViewmodelSettings {
  const defaults = DEFAULT_CONFIG.viewmodel;
  const stored = value ?? {};
  const preferLeftHanded =
    typeof stored.preferLeftHanded === 'boolean'
      ? stored.preferLeftHanded
      : stored.rightHand === false;

  return {
    fov: asNumber(stored.fov, defaults.fov),
    offsetX: asNumber(stored.offsetX, defaults.offsetX),
    offsetY: asNumber(stored.offsetY, defaults.offsetY),
    offsetZ: asNumber(stored.offsetZ, defaults.offsetZ),
    presetPos: asNumber(stored.presetPos, defaults.presetPos),
    preferLeftHanded,
  };
}

function normalizeMouse(
  value: Record<string, unknown> | undefined
): MouseSettings {
  const defaults = DEFAULT_CONFIG.mouse;
  const stored = value ?? {};

  return {
    sensitivity: asNumber(stored.sensitivity, defaults.sensitivity),
    zoomSensitivityRatio: asNumber(
      stored.zoomSensitivityRatio,
      defaults.zoomSensitivityRatio
    ),
  };
}

function normalizeRadar(
  value: Record<string, unknown> | undefined
): RadarSettings {
  const defaults = DEFAULT_CONFIG.radar;
  const stored = value ?? {};

  return {
    scale: asNumber(stored.scale, defaults.scale),
    hudScale: asNumber(stored.hudScale, defaults.hudScale),
    alwaysCentered: asBoolean(stored.alwaysCentered, defaults.alwaysCentered),
    rotate: asBoolean(stored.rotate, defaults.rotate),
    iconScaleMin: asNumber(stored.iconScaleMin, defaults.iconScaleMin),
    squareWithScoreboard: asBoolean(
      stored.squareWithScoreboard,
      defaults.squareWithScoreboard
    ),
  };
}

function normalizeNetwork(
  value: Record<string, unknown> | undefined
): NetworkSettings {
  const defaults = DEFAULT_CONFIG.network;
  const stored = value ?? {};

  return {
    rate: asNumber(stored.rate, defaults.rate),
    bufferTicks: asNumber(stored.bufferTicks, defaults.bufferTicks),
    maxPing: asNumber(stored.maxPing, defaults.maxPing),
  };
}

function normalizeAudio(
  value: Record<string, unknown> | undefined
): AudioSettings {
  const defaults = DEFAULT_CONFIG.audio;
  const stored = value ?? {};
  const voipVolume =
    typeof stored.voipVolume === 'number'
      ? stored.voipVolume
      : asNumber(stored.voiceScale, defaults.voipVolume);

  return {
    master: asNumber(stored.master, defaults.master),
    voipVolume,
    muteOnFocusLoss: asBoolean(
      stored.muteOnFocusLoss,
      defaults.muteOnFocusLoss
    ),
    musicVolume: asNumber(stored.musicVolume, defaults.musicVolume),
    tenSecondWarning: asNumber(
      stored.tenSecondWarning,
      defaults.tenSecondWarning
    ),
  };
}

function normalizePerformance(
  value: Record<string, unknown> | undefined
): PerformanceSettings {
  const defaults = DEFAULT_CONFIG.performance;
  const stored = value ?? {};

  return {
    fpsMax: asNumber(stored.fpsMax, defaults.fpsMax),
    fpsMaxUi: asNumber(stored.fpsMaxUi, defaults.fpsMaxUi),
    drawTracersFirstPerson: asBoolean(
      stored.drawTracersFirstPerson,
      defaults.drawTracersFirstPerson
    ),
    autohelp: asBoolean(stored.autohelp, defaults.autohelp),
    gameInstructor: asBoolean(stored.gameInstructor, defaults.gameInstructor),
    lowLatencySleep: asBoolean(
      stored.lowLatencySleep,
      defaults.lowLatencySleep
    ),
  };
}

/** Old editor used the CS:GO 0–10 palette. Current CS2 is 0–12. */
const LEGACY_HUD_COLOR_TO_CS2: Record<number, number> = {
  0: 0,
  1: 1,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
  6: 7,
  7: 8,
  8: 9,
  9: 10,
  10: 11,
};

function migrateLegacyHudColor(
  stored: Record<string, unknown>,
  color: number
): number {
  const isLegacy = 'healthAmmoStyle' in stored || 'bombUnderRadar' in stored;
  if (!isLegacy) {
    return color;
  }

  return LEGACY_HUD_COLOR_TO_CS2[color] ?? color;
}

function normalizeHud(value: Record<string, unknown> | undefined): HudSettings {
  const defaults = DEFAULT_CONFIG.hud;
  const stored = value ?? {};

  return {
    hudColor: migrateLegacyHudColor(
      stored,
      asNumber(stored.hudColor, defaults.hudColor)
    ),
    hudScaling: asNumber(stored.hudScaling, defaults.hudScaling),
    showBuildInfo: asBoolean(stored.showBuildInfo, defaults.showBuildInfo),
    showLoadout: asBoolean(stored.showLoadout, defaults.showLoadout),
    sniperShowInaccuracy: asBoolean(
      stored.sniperShowInaccuracy,
      defaults.sniperShowInaccuracy
    ),
    teamidOverheadFadeNearCrosshair: asNumber(
      stored.teamidOverheadFadeNearCrosshair,
      defaults.teamidOverheadFadeNearCrosshair
    ),
    teammateColors: asNumber(stored.teammateColors, defaults.teammateColors),
  };
}

function normalizeEnabledRecommendations(value: unknown): string[] {
  if (!isStringArray(value)) {
    return [];
  }

  return value.filter(
    (id) => isRecommendedConfigId(id) && getRecommendedConfigTemplateById(id)
  );
}

function normalizeConfigSettings(
  value: Record<string, unknown>
): ConfigSettings {
  return {
    viewmodel: normalizeViewmodel(
      isPlainObject(value.viewmodel) ? value.viewmodel : undefined
    ),
    mouse: normalizeMouse(isPlainObject(value.mouse) ? value.mouse : undefined),
    radar: normalizeRadar(isPlainObject(value.radar) ? value.radar : undefined),
    network: normalizeNetwork(
      isPlainObject(value.network) ? value.network : undefined
    ),
    audio: normalizeAudio(isPlainObject(value.audio) ? value.audio : undefined),
    performance: normalizePerformance(
      isPlainObject(value.performance) ? value.performance : undefined
    ),
    hud: normalizeHud(isPlainObject(value.hud) ? value.hud : undefined),
    enabledRecommendations: normalizeEnabledRecommendations(
      value.enabledRecommendations
    ),
  };
}

export function loadStoredConfig(): ConfigSettings | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isConfigSettings(parsed)) {
      return null;
    }

    return normalizeConfigSettings(parsed);
  } catch {
    return null;
  }
}

export function saveStoredConfig(config: ConfigSettings): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Private browsing, quota exceeded, or storage disabled.
  }
}

export function clearStoredConfig(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
