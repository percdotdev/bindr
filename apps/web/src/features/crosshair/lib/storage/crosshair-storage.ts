import { DEFAULT_CROSSHAIR } from '@/features/crosshair/lib/model/default-crosshair';
import type { CrosshairSettings } from '@/features/crosshair/lib/model/types';

const STORAGE_KEY = 'bindr:crosshair:v1';

const CROSSHAIR_SETTING_KEYS = Object.keys(
  DEFAULT_CROSSHAIR
) as (keyof CrosshairSettings)[];

function isCrosshairSettings(
  value: unknown
): value is Partial<CrosshairSettings> {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return CROSSHAIR_SETTING_KEYS.every(
    (key) => typeof candidate[key] === typeof DEFAULT_CROSSHAIR[key]
  );
}

function normalizeCrosshairSettings(
  value: Partial<CrosshairSettings>
): CrosshairSettings {
  return { ...DEFAULT_CROSSHAIR, ...value };
}

export function loadStoredCrosshair(): CrosshairSettings | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isCrosshairSettings(parsed)) {
      return null;
    }

    return normalizeCrosshairSettings(parsed);
  } catch {
    return null;
  }
}

export function saveStoredCrosshair(crosshair: CrosshairSettings): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(crosshair));
  } catch {
    // Private browsing, quota exceeded, or storage disabled.
  }
}

export function clearStoredCrosshair(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
