/**
 * Shape of a CS:GO-era (`CSGO-…` version 1) crosshair. Units are the old
 * resolution-relative floats, colors are preset indices (5 = custom RGB).
 */
export interface LegacyCrosshairSettings {
  alpha: number;
  alphaEnabled: boolean;
  blue: number;
  centerDotEnabled: boolean;
  color: number;
  deployedWeaponGapEnabled: boolean;
  fixedCrosshairGap: number;
  followRecoil: boolean;
  gap: number;
  green: number;
  innerSplitAlpha: number;
  length: number;
  outerSplitAlpha: number;
  outline: number;
  outlineEnabled: boolean;
  red: number;
  splitDistance: number;
  splitSizeRatio: number;
  style: number;
  thickness: number;
  tStyleEnabled: boolean;
}

export const LEGACY_CROSSHAIR_FIELDS: readonly (keyof LegacyCrosshairSettings)[] =
  [
    'alpha',
    'alphaEnabled',
    'blue',
    'centerDotEnabled',
    'color',
    'deployedWeaponGapEnabled',
    'fixedCrosshairGap',
    'followRecoil',
    'gap',
    'green',
    'innerSplitAlpha',
    'length',
    'outerSplitAlpha',
    'outline',
    'outlineEnabled',
    'red',
    'splitDistance',
    'splitSizeRatio',
    'style',
    'thickness',
    'tStyleEnabled',
  ];
