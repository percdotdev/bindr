import type { BindEntry } from '@workspace/cs2/binds/model/types';

const STORAGE_KEY = 'bindr:binds:v1';

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

function isOptionalBoolean(value: unknown): boolean {
  return value === undefined || typeof value === 'boolean';
}

function isBindCategory(value: unknown): boolean {
  return (
    value === undefined ||
    value === 'utility' ||
    value === 'weapons' ||
    value === 'radar' ||
    value === 'lineups'
  );
}

function isBindEntry(value: unknown): value is BindEntry {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.key === 'string' &&
    typeof candidate.command === 'string' &&
    isOptionalString(candidate.label) &&
    isOptionalString(candidate.description) &&
    isOptionalBoolean(candidate.mmSafe) &&
    isBindCategory(candidate.category)
  );
}

function isBindList(value: unknown): value is BindEntry[] {
  return Array.isArray(value) && value.every(isBindEntry);
}

export function loadStoredBinds(): BindEntry[] | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isBindList(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredBinds(binds: BindEntry[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(binds));
  } catch {
    // Private browsing, quota exceeded, or storage disabled.
  }
}

export function clearStoredBinds(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore storage errors.
  }
}
