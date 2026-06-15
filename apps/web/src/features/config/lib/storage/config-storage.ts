import { DEFAULT_CONFIG } from '@/features/config/lib/model/default-config';
import type { ConfigSettings } from '@/features/config/lib/model/types';

const STORAGE_KEY = 'bindr:config:v1';

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
    typeof candidate.offsetZ === 'number'
  );
}

function isConfigSettings(value: unknown): value is Partial<ConfigSettings> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return isViewmodelSettings(candidate.viewmodel);
}

function normalizeConfigSettings(
  value: Partial<ConfigSettings>
): ConfigSettings {
  return {
    viewmodel: {
      ...DEFAULT_CONFIG.viewmodel,
      ...value.viewmodel,
    },
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
