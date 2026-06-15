export interface CrosshairSettings {
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

export type CrosshairField = keyof CrosshairSettings;
