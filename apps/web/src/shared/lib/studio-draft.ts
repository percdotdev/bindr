type StudioDraftSlice = 'binds' | 'config' | 'crosshair';

const DRAFT_KEYS = {
  binds: 'bindr-studio:v1:binds',
  config: 'bindr-studio:v1:config',
  crosshair: 'bindr-studio:v1:crosshair',
} as const;

export function readStudioDraft<T>(
  slice: StudioDraftSlice,
  parse: (value: unknown) => T | null
): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(DRAFT_KEYS[slice]);
    if (!raw) {
      return null;
    }
    return parse(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function writeStudioDraft(
  slice: StudioDraftSlice,
  value: unknown
): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(DRAFT_KEYS[slice], JSON.stringify(value));
  } catch {
    // Private mode or a full quota. The tab still has the edit.
  }
}
