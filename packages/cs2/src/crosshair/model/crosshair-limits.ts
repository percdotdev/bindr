/** Hard limits enforced by the game (convar ranges, build 2000922). */
export const CROSSHAIR_LIMITS = {
  alpha: { min: 0, max: 255, step: 1 },
  dynamicSpreadLimit: { min: 0, max: 255, step: 1 },
  gap: { min: -3840, max: 3840, step: 1 },
  innerSplitAlpha: { min: 0, max: 1, step: 0.01 },
  length: { min: 0, max: 255, step: 1 },
  outerSplitAlpha: { min: 0.3, max: 1, step: 0.01 },
  outlineMode: { min: 0, max: 2, step: 1 },
  scopeDotScale: { min: 0.1, max: 2, step: 0.01 },
  screenHeight: { min: 240, max: 65_535, step: 1 },
  splitDistance: { min: 0, max: 127, step: 1 },
  splitSizeRatio: { min: 0, max: 1, step: 0.01 },
  style: { min: 0, max: 9, step: 1 },
  thickness: { min: 0, max: 32, step: 1 },
} as const;

/** Ranges the in-game settings menu exposes (narrower than the convars). */
export const CROSSHAIR_MENU_LIMITS = {
  classicGap: { min: -10, max: 128, step: 1 },
  gap: { min: 0, max: 128, step: 1 },
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
