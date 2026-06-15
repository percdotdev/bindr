import { DEFAULT_CONFIG } from '@/features/config/lib/model/default-config';
import type { ConfigSettings } from '@/features/config/lib/model/types';

const STORAGE_KEY = 'bindr:config:v1';

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
}

function isViewmodelSettings(
  value: unknown
): value is ConfigSettings['viewmodel'] {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.fov === 'number' &&
    typeof candidate.offsetX === 'number' &&
    typeof candidate.offsetY === 'number' &&
    typeof candidate.offsetZ === 'number' &&
    (candidate.presetPos === undefined ||
      typeof candidate.presetPos === 'number')
  );
}

function isRadarSettings(value: unknown): value is ConfigSettings['radar'] {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.scale === 'number' &&
    typeof candidate.hudScale === 'number' &&
    isBoolean(candidate.alwaysCentered) &&
    isBoolean(candidate.rotate) &&
    typeof candidate.iconScaleMin === 'number' &&
    isBoolean(candidate.squareWithScoreboard)
  );
}

function isNetworkSettings(value: unknown): value is ConfigSettings['network'] {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.rate === 'number' &&
    typeof candidate.interpRatio === 'number' &&
    typeof candidate.interp === 'number' &&
    typeof candidate.updaterate === 'number' &&
    typeof candidate.cmdrate === 'number' &&
    typeof candidate.maxPing === 'number'
  );
}

function isPerformanceSettings(
  value: unknown
): value is ConfigSettings['performance'] {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.fpsMax === 'number' &&
    typeof candidate.fpsMaxUi === 'number' &&
    isBoolean(candidate.drawTracersFirstPerson) &&
    isBoolean(candidate.autohelp) &&
    isBoolean(candidate.gameInstructor) &&
    isBoolean(candidate.showHelp) &&
    isBoolean(candidate.disableFreezeCam) &&
    isBoolean(candidate.lowLatencySleep)
  );
}

function isHudSettings(value: unknown): value is ConfigSettings['hud'] {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    isBoolean(candidate.showBuildInfo) &&
    typeof candidate.teamidOverheadFadeNearCrosshair === 'number'
  );
}

function isConfigSettings(value: unknown): value is Partial<ConfigSettings> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  const hasValidRecommendations =
    candidate.enabledRecommendations === undefined ||
    isStringArray(candidate.enabledRecommendations);

  return (
    (candidate.viewmodel === undefined ||
      isViewmodelSettings(candidate.viewmodel)) &&
    (candidate.radar === undefined || isRadarSettings(candidate.radar)) &&
    (candidate.network === undefined || isNetworkSettings(candidate.network)) &&
    (candidate.performance === undefined ||
      isPerformanceSettings(candidate.performance)) &&
    (candidate.hud === undefined || isHudSettings(candidate.hud)) &&
    hasValidRecommendations
  );
}

function normalizeConfigSettings(
  value: Partial<ConfigSettings>
): ConfigSettings {
  return {
    viewmodel: {
      ...DEFAULT_CONFIG.viewmodel,
      ...value.viewmodel,
    },
    radar: {
      ...DEFAULT_CONFIG.radar,
      ...value.radar,
    },
    network: {
      ...DEFAULT_CONFIG.network,
      ...value.network,
    },
    performance: {
      ...DEFAULT_CONFIG.performance,
      ...value.performance,
    },
    hud: {
      ...DEFAULT_CONFIG.hud,
      ...value.hud,
    },
    enabledRecommendations: value.enabledRecommendations ?? [],
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
