import type { CrosshairSettings } from '@/features/crosshair/lib/types';

const STORAGE_KEY = 'bindr:crosshair:v1';

function isCrosshairSettings(value: unknown): value is CrosshairSettings {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.gap === 'number' &&
    typeof candidate.length === 'number' &&
    typeof candidate.color === 'number' &&
    typeof candidate.red === 'number' &&
    typeof candidate.style === 'number'
  );
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

    return parsed;
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
