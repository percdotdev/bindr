import type { BindCategory, BindEntry } from '@workspace/cs2/binds/model/types';
import { BIND_CATEGORY_ORDER } from '@workspace/cs2/binds/recommended/categories';

const STORAGE_KEY = 'bindr:binds:v1';

const BIND_CATEGORIES = new Set<BindCategory>(BIND_CATEGORY_ORDER);

const DEAD_RECOMMENDED_BIND_IDS = new Set(['rec-clear-decals']);
const CLEAR_DECALS_TAIL = /\s*;\s*r_cleardecals\b/g;

function isOptionalString(value: unknown): boolean {
  return value === undefined || typeof value === 'string';
}

function isOptionalBoolean(value: unknown): boolean {
  return value === undefined || typeof value === 'boolean';
}

function isBindCategory(value: unknown): value is BindCategory | undefined {
  return value === undefined || BIND_CATEGORIES.has(value as BindCategory);
}

function isBindEntry(value: unknown): value is BindEntry {
  if (typeof value === 'object' && value !== null) {
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

  return false;
}

function isBindList(value: unknown): value is BindEntry[] {
  return Array.isArray(value) && value.every(isBindEntry);
}

function rewriteLegacyCommand(command: string): string {
  if (command === 'toggle cl_righthand 0 1') {
    return 'switchhands';
  }

  if (command === '+attack; r_cleardecals') {
    return '+attack';
  }

  return command.replaceAll(CLEAR_DECALS_TAIL, '');
}

function migrateStoredBinds(binds: BindEntry[]): BindEntry[] {
  return binds.flatMap((bind) => {
    if (DEAD_RECOMMENDED_BIND_IDS.has(bind.id)) {
      return [];
    }

    const command = rewriteLegacyCommand(bind.command).trim();
    if (!command) {
      return [];
    }

    if (command === bind.command) {
      return [bind];
    }

    return [
      {
        ...bind,
        command,
        ...(bind.id === 'rec-hand-toggle'
          ? {
              label: 'Swap weapon hand',
              description:
                'CS2 hand swap. Persistent preference is cl_prefer_lefthanded.',
            }
          : {}),
      },
    ];
  });
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

    return migrateStoredBinds(parsed);
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
