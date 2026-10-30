export const CONFIG_SHARE_SECTIONS = [
  'viewmodel',
  'mouse',
  'radar',
  'network',
  'audio',
  'performance',
  'hud',
] as const;

export type ConfigShareSection = (typeof CONFIG_SHARE_SECTIONS)[number];

export type StudioSlice = 'crosshair' | 'binds' | ConfigShareSection;

export type StudioSelection = Record<StudioSlice, boolean>;

export function emptySelection(enabled: boolean): StudioSelection {
  return {
    audio: enabled,
    binds: enabled,
    crosshair: enabled,
    hud: enabled,
    mouse: enabled,
    network: enabled,
    performance: enabled,
    radar: enabled,
    viewmodel: enabled,
  };
}

export function selectionWith(
  slices: readonly StudioSlice[],
  enabled: boolean
): StudioSelection {
  const selection = emptySelection(!enabled);
  for (const slice of slices) {
    selection[slice] = enabled;
  }
  return selection;
}
