import type { LegacyCrosshairSettings } from '@workspace/cs2/crosshair/legacy/legacy-types';
import {
  CROSSHAIR_LIMITS,
  clampCrosshairValue,
} from '@workspace/cs2/crosshair/model/crosshair-limits';
import { allowsNegativeCrosshairGap } from '@workspace/cs2/crosshair/model/crosshair-style';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';

/** CS:GO drew the crosshair in a 480-line virtual space scaled to the screen. */
const LEGACY_REFERENCE_HEIGHT = 480;
/** CS:GO added a fixed 4 units to `cl_crosshairgap` before drawing. */
const LEGACY_GAP_BASE = 4;
const FULL_ALPHA = 255;
const CUSTOM_COLOR_PRESET = 5;

const LEGACY_PRESET_RGB: Record<number, readonly [number, number, number]> = {
  0: [255, 0, 0],
  1: [0, 255, 0],
  2: [255, 255, 0],
  3: [0, 0, 255],
  4: [0, 255, 255],
};

/**
 * CS:GO style → CS2 style. 0/2/3 were dynamic variants of the classic cross,
 * 1 was the static classic cross, 4 static, 5 shot-feedback.
 */
const LEGACY_STYLE_MAP: Record<number, number> = {
  0: 2,
  1: 4,
  2: 2,
  3: 2,
  4: 4,
  5: 5,
};

function resolveLegacyRgb(
  legacy: LegacyCrosshairSettings
): readonly [number, number, number] {
  if (legacy.color === CUSTOM_COLOR_PRESET) {
    return [legacy.red, legacy.green, legacy.blue];
  }

  return LEGACY_PRESET_RGB[legacy.color] ?? [0, 255, 0];
}

function scaleToPixels(value: number, screenHeight: number): number {
  return Math.round((value * screenHeight) / LEGACY_REFERENCE_HEIGHT);
}

/**
 * Best-effort conversion of a CS:GO-era crosshair to the pixel-based CS2
 * model. Matches the community-verified approximation of the in-game
 * import; exact pixel results may differ by ±1px.
 */
export function migrateLegacyCrosshair(
  legacy: LegacyCrosshairSettings,
  screenHeight: number = DEFAULT_CROSSHAIR.screenHeight
): CrosshairSettings {
  const [red, green, blue] = resolveLegacyRgb(legacy);
  const style = LEGACY_STYLE_MAP[legacy.style] ?? DEFAULT_CROSSHAIR.style;
  const alpha = legacy.alphaEnabled ? Math.round(legacy.alpha) : FULL_ALPHA;

  const thickness = clampCrosshairValue(
    Math.max(1, scaleToPixels(legacy.thickness, screenHeight)),
    CROSSHAIR_LIMITS.thickness
  );
  const length = clampCrosshairValue(
    scaleToPixels(legacy.length, screenHeight),
    CROSSHAIR_LIMITS.length
  );
  const rawGap =
    Math.trunc(LEGACY_GAP_BASE + legacy.gap) + Math.ceil(thickness / 2);
  const gap = clampCrosshairValue(
    allowsNegativeCrosshairGap(style) ? rawGap : Math.max(0, rawGap),
    CROSSHAIR_LIMITS.gap
  );

  return {
    ...DEFAULT_CROSSHAIR,
    style,
    followRecoil: legacy.followRecoil,
    centerDotEnabled: legacy.centerDotEnabled,
    tStyleEnabled: legacy.tStyleEnabled,
    red,
    green,
    blue,
    alpha,
    outlineRed: 0,
    outlineGreen: 0,
    outlineBlue: 0,
    outlineAlpha: alpha,
    outlineMode: legacy.outlineEnabled ? 1 : 0,
    thickness,
    length,
    gap,
    splitDistance: clampCrosshairValue(
      Math.round(legacy.splitDistance),
      CROSSHAIR_LIMITS.splitDistance
    ),
    innerSplitAlpha: clampCrosshairValue(
      legacy.innerSplitAlpha,
      CROSSHAIR_LIMITS.innerSplitAlpha
    ),
    outerSplitAlpha: clampCrosshairValue(
      legacy.outerSplitAlpha,
      CROSSHAIR_LIMITS.outerSplitAlpha
    ),
    splitSizeRatio: clampCrosshairValue(
      legacy.splitSizeRatio,
      CROSSHAIR_LIMITS.splitSizeRatio
    ),
    screenHeight,
  };
}
