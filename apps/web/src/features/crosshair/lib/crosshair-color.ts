import type { CrosshairSettings } from '@/features/crosshair/lib/types';

const PRESET_COLORS: Record<number, readonly [number, number, number]> = {
  0: [255, 0, 0],
  1: [0, 255, 0],
  2: [255, 255, 0],
  3: [0, 0, 255],
  4: [0, 255, 255],
};

export const CROSSHAIR_PRESET_COLORS = PRESET_COLORS;

export const CROSSHAIR_PRESET_LABELS: Record<number, string> = {
  0: 'Red',
  1: 'Green',
  2: 'Yellow',
  3: 'Blue',
  4: 'Cyan',
};

export function isCustomCrosshairColor(color: number): boolean {
  return color === 5;
}

export function resolveCrosshairRgb(
  crosshair: CrosshairSettings
): readonly [number, number, number] {
  if (crosshair.color === 5) {
    return [crosshair.red, crosshair.green, crosshair.blue];
  }

  return PRESET_COLORS[crosshair.color] ?? [0, 255, 0];
}

export function resolveCrosshairAlpha(crosshair: CrosshairSettings): number {
  return crosshair.alphaEnabled ? crosshair.alpha / 255 : 1;
}

export function applyCrosshairColor(
  crosshair: CrosshairSettings,
  color: number
): CrosshairSettings {
  if (color === 5) {
    return { ...crosshair, color: 5 };
  }

  const preset = PRESET_COLORS[color];
  if (!preset) {
    return crosshair;
  }

  const [red, green, blue] = preset;

  return {
    ...crosshair,
    blue,
    color,
    green,
    red,
  };
}
