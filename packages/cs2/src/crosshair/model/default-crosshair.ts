import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';

/**
 * In-game defaults (build 2000922) except for `style` and `followRecoil`:
 * the game ships Dynamic Quadrant with recoil follow on, a static cross is
 * the far more common starting point for a config tool.
 */
export const DEFAULT_CROSSHAIR: CrosshairSettings = {
  alpha: 255,
  blue: 0,
  centerDotEnabled: false,
  dynamicSpreadLimit: 255,
  followRecoil: false,
  gap: 4,
  green: 255,
  innerSplitAlpha: 0,
  length: 8,
  outlineAlpha: 255,
  outlineBlue: 0,
  outlineGreen: 0,
  outlineMode: 1,
  outlineRed: 0,
  outerSplitAlpha: 1,
  red: 0,
  scopeDotScale: 1,
  scopeDotUsesCrosshairColor: false,
  screenHeight: 1080,
  splitDistance: 3,
  splitSizeRatio: 1,
  style: 4,
  thickness: 2,
  tStyleEnabled: false,
};
