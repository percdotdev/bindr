/**
 * CS2 crosshair settings since the 2026-09-22 "Rush Hour" update.
 *
 * Sizes are integer pixel counts at `screenHeight`; the game rescales them
 * by `currentHeight / screenHeight` when the display resolution changes.
 */
export interface CrosshairSettings {
  /** 0–255, `cl_crosshaircolor_a`. */
  alpha: number;
  /** 0–255, `cl_crosshaircolor_b`. */
  blue: number;
  /** `cl_crosshairdot`. */
  centerDotEnabled: boolean;
  /** 0–255, `cl_crosshair_dynamic_spread_limit`. */
  dynamicSpreadLimit: number;
  /** `cl_crosshair_recoil`. */
  followRecoil: boolean;
  /**
   * Pixels, `cl_crosshair_gap`. Only the classic dynamic style (2) honours
   * negative values; every other style treats them as 0.
   */
  gap: number;
  /** 0–255, `cl_crosshaircolor_g`. */
  green: number;
  /** 0–1 in 0.01 steps, `cl_crosshair_dynamic_splitalpha_innermod`. */
  innerSplitAlpha: number;
  /** Pixels 0–255, `cl_crosshair_length`. */
  length: number;
  /** 0.3–1 in 0.01 steps, `cl_crosshair_dynamic_splitalpha_outermod`. */
  outerSplitAlpha: number;
  /** 0–255, `cl_crosshairoutline_a`. */
  outlineAlpha: number;
  /** 0–255, `cl_crosshairoutline_b`. */
  outlineBlue: number;
  /** 0–255, `cl_crosshairoutline_g`. */
  outlineGreen: number;
  /** 0 none · 1 full · 2 half (top-left), `cl_crosshair_drawoutline`. */
  outlineMode: number;
  /** 0–255, `cl_crosshairoutline_r`. */
  outlineRed: number;
  /** 0–255, `cl_crosshaircolor_r`. */
  red: number;
  /** 0.1–2 in 0.01 steps, `cl_ironsight_dot_scale`. */
  scopeDotScale: number;
  /** `cl_ironsight_usecrosshaircolor`. */
  scopeDotUsesCrosshairColor: boolean;
  /** Display height the pixel values were authored at, `cl_crosshair_screen_height`. */
  screenHeight: number;
  /** 0–127 px, `cl_crosshair_dynamic_splitdist`. */
  splitDistance: number;
  /**
   * 0–1 in 0.01 steps, `cl_crosshair_dynamic_maxdist_splitratio`.
   * Split size ratio for the classic style, quadrant size for Static Quadrant.
   */
  splitSizeRatio: number;
  /** 0–9, `cl_crosshairstyle`. */
  style: number;
  /** Pixels 0–32, `cl_crosshair_thickness`. */
  thickness: number;
  /** `cl_crosshair_t`. */
  tStyleEnabled: boolean;
}

export type CrosshairField = keyof CrosshairSettings;

export interface CrosshairRgb {
  blue: number;
  green: number;
  red: number;
}
