/** Hard limits enforced by the game (convar ranges, build 2000922). */
export const CROSSHAIR_LIMITS = {
  alpha: { max: 255, min: 0, step: 1 },
  dynamicSpreadLimit: { max: 255, min: 0, step: 1 },
  gap: { max: 3840, min: -3840, step: 1 },
  innerSplitAlpha: { max: 1, min: 0, step: 0.01 },
  length: { max: 255, min: 0, step: 1 },
  outerSplitAlpha: { max: 1, min: 0.3, step: 0.01 },
  outlineMode: { max: 2, min: 0, step: 1 },
  scopeDotScale: { max: 2, min: 0.1, step: 0.01 },
  screenHeight: { max: 65_535, min: 240, step: 1 },
  splitDistance: { max: 127, min: 0, step: 1 },
  splitSizeRatio: { max: 1, min: 0, step: 0.01 },
  style: { max: 9, min: 0, step: 1 },
  thickness: { max: 32, min: 0, step: 1 },
} as const;

/** Ranges the in-game settings menu exposes (narrower than the convars). */
export const CROSSHAIR_MENU_LIMITS = {
  classicGap: { max: 128, min: -10, step: 1 },
  gap: { max: 128, min: 0, step: 1 },
} as const;

export const CROSSHAIR_SCREEN_HEIGHT_PRESETS = [
  720, 768, 800, 900, 960, 1080, 1200, 1440, 1600, 2160,
] as const;

export function clampCrosshairValue(
  value: number,
  limits: { readonly max: number; readonly min: number }
): number {
  return Math.min(limits.max, Math.max(limits.min, value));
}
