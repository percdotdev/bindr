import {
  LEGACY_CROSSHAIR_FIELDS,
  type LegacyCrosshairSettings,
} from '@workspace/cs2/crosshair/legacy/legacy-types';
import { migrateLegacyCrosshair } from '@workspace/cs2/crosshair/legacy/migrate-legacy-crosshair';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';

/** Pixel-based settings (CS2 build 2000922+). */
const STORAGE_KEY = 'bindr:crosshair:v2';
/** CS:GO-era float settings; migrated on first load, then removed. */
const LEGACY_STORAGE_KEY = 'bindr:crosshair:v1';

const CROSSHAIR_SETTING_KEYS = Object.keys(
  DEFAULT_CROSSHAIR
) as (keyof CrosshairSettings)[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isCrosshairSettings(value: unknown): value is CrosshairSettings {
  if (!isRecord(value)) {
    return false;
  }

  return CROSSHAIR_SETTING_KEYS.every(
    (key) => typeof value[key] === typeof DEFAULT_CROSSHAIR[key]
  );
}

function isLegacyCrosshairSettings(
  value: unknown
): value is LegacyCrosshairSettings {
  if (!isRecord(value)) {
    return false;
  }

  return LEGACY_CROSSHAIR_FIELDS.every((key) => {
    const actual = typeof value[key];
    return actual === 'number' || actual === 'boolean';
  });
}

function readJson(key: string): unknown {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

function loadLegacyCrosshair(): CrosshairSettings | null {
  const parsed = readJson(LEGACY_STORAGE_KEY);
  if (!isLegacyCrosshairSettings(parsed)) {
    return null;
  }

  const migrated = migrateLegacyCrosshair(parsed);
  saveStoredCrosshair(migrated);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  return migrated;
}

export function loadStoredCrosshair(): CrosshairSettings | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const parsed = readJson(STORAGE_KEY);
    if (isCrosshairSettings(parsed)) {
      return { ...DEFAULT_CROSSHAIR, ...parsed };
    }

    return loadLegacyCrosshair();
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
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
