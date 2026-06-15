import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type { ConfigSettings } from '@workspace/cs2/config/model/types';

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

function isConfigSettings(value: unknown): value is Partial<ConfigSettings> {
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

function normalizeConfigSettings(
  value: Partial<ConfigSettings>
): ConfigSettings {
  return {
    viewmodel: { ...DEFAULT_CONFIG.viewmodel, ...value.viewmodel },
    mouse: { ...DEFAULT_CONFIG.mouse, ...value.mouse },
    radar: { ...DEFAULT_CONFIG.radar, ...value.radar },
    network: { ...DEFAULT_CONFIG.network, ...value.network },
    audio: { ...DEFAULT_CONFIG.audio, ...value.audio },
    performance: { ...DEFAULT_CONFIG.performance, ...value.performance },
    hud: { ...DEFAULT_CONFIG.hud, ...value.hud },
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
