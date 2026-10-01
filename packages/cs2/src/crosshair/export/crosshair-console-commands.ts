import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';

const HUNDREDTHS = 100;

function formatConsoleNumber(value: number): string {
  return String(Math.round(value * HUNDREDTHS) / HUNDREDTHS);
}

function formatConsoleFlag(enabled: boolean): 0 | 1 {
  return enabled ? 1 : 0;
}

function formatChannel(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)));
}

/**
 * Convars for CS2 build 2000922+. `cl_crosshair_screen_height` goes last:
 * the game rewrites it whenever the window size changes, and the pixel
 * sizes above only make sense relative to the height they were made for.
 */
export function crosshairSettingsToConsoleLines(
  crosshair: CrosshairSettings
): string[] {
  return [
    `cl_crosshairstyle ${Math.round(crosshair.style)}`,
    `cl_crosshair_length ${Math.round(crosshair.length)}`,
    `cl_crosshair_thickness ${Math.round(crosshair.thickness)}`,
    `cl_crosshair_gap ${Math.round(crosshair.gap)}`,
    `cl_crosshaircolor_r ${formatChannel(crosshair.red)}`,
    `cl_crosshaircolor_g ${formatChannel(crosshair.green)}`,
    `cl_crosshaircolor_b ${formatChannel(crosshair.blue)}`,
    `cl_crosshaircolor_a ${formatChannel(crosshair.alpha)}`,
    `cl_crosshair_drawoutline ${Math.round(crosshair.outlineMode)}`,
    `cl_crosshairoutline_r ${formatChannel(crosshair.outlineRed)}`,
    `cl_crosshairoutline_g ${formatChannel(crosshair.outlineGreen)}`,
    `cl_crosshairoutline_b ${formatChannel(crosshair.outlineBlue)}`,
    `cl_crosshairoutline_a ${formatChannel(crosshair.outlineAlpha)}`,
    `cl_crosshairdot ${formatConsoleFlag(crosshair.centerDotEnabled)}`,
    `cl_crosshair_t ${formatConsoleFlag(crosshair.tStyleEnabled)}`,
    `cl_crosshair_recoil ${formatConsoleFlag(crosshair.followRecoil)}`,
    `cl_crosshair_dynamic_spread_limit ${Math.round(crosshair.dynamicSpreadLimit)}`,
    `cl_crosshair_dynamic_splitdist ${Math.round(crosshair.splitDistance)}`,
    `cl_crosshair_dynamic_splitalpha_innermod ${formatConsoleNumber(crosshair.innerSplitAlpha)}`,
    `cl_crosshair_dynamic_splitalpha_outermod ${formatConsoleNumber(crosshair.outerSplitAlpha)}`,
    `cl_crosshair_dynamic_maxdist_splitratio ${formatConsoleNumber(crosshair.splitSizeRatio)}`,
    `cl_ironsight_usecrosshaircolor ${formatConsoleFlag(crosshair.scopeDotUsesCrosshairColor)}`,
    `cl_ironsight_dot_scale ${formatConsoleNumber(crosshair.scopeDotScale)}`,
    `cl_crosshair_screen_height ${Math.round(crosshair.screenHeight)}`,
  ];
}

export function crosshairSettingsToConsoleCommands(
  crosshair: CrosshairSettings
): string {
  return crosshairSettingsToConsoleLines(crosshair).join('; ');
}
