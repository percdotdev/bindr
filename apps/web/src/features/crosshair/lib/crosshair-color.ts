import type { CrosshairSettings } from '@/features/crosshair/lib/types';

const PRESET_COLORS: Record<number, readonly [number, number, number]> = {
  0: [255, 0, 0],
  1: [0, 255, 0],
  2: [255, 255, 0],
  3: [0, 0, 255],
  4: [0, 255, 255],
};

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

/** Editor always uses custom RGB; resolve presets on import. */
export function normalizeEditorCrosshair(
  crosshair: CrosshairSettings
): CrosshairSettings {
  const [red, green, blue] = resolveCrosshairRgb(crosshair);

  return {
    ...crosshair,
    blue,
    color: 5,
    green,
    red,
  };
}
