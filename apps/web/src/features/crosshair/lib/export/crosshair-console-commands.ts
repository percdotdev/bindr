import {
  isCustomCrosshairColor,
  resolveCrosshairRgb,
} from '@/features/crosshair/lib/model/crosshair-color';
import type { CrosshairSettings } from '@/features/crosshair/lib/model/types';

function formatConsoleNumber(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function formatConsoleFlag(enabled: boolean): 0 | 1 {
  return enabled ? 1 : 0;
}

function getConsoleColorPreset(crosshair: CrosshairSettings): number {
  if (isCustomCrosshairColor(crosshair.color) || crosshair.color === 0) {
    return 5;
  }

  return crosshair.color;
}

export function crosshairSettingsToConsoleCommands(
  crosshair: CrosshairSettings
): string {
  const [red, green, blue] = resolveCrosshairRgb(crosshair);

  const commands = [
    `cl_crosshairstyle ${crosshair.style}`,
    `cl_crosshairsize ${formatConsoleNumber(crosshair.length)}`,
    `cl_crosshairgap ${formatConsoleNumber(crosshair.gap)}`,
    `cl_crosshairthickness ${formatConsoleNumber(crosshair.thickness)}`,
    `cl_crosshaircolor ${getConsoleColorPreset(crosshair)}`,
    `cl_crosshaircolor_r ${Math.round(red)}`,
    `cl_crosshaircolor_g ${Math.round(green)}`,
    `cl_crosshaircolor_b ${Math.round(blue)}`,
    `cl_crosshairalpha ${Math.round(crosshair.alpha)}`,
    `cl_crosshairusealpha ${formatConsoleFlag(crosshair.alphaEnabled)}`,
    `cl_crosshair_drawoutline ${formatConsoleFlag(crosshair.outlineEnabled)}`,
    `cl_crosshair_outlinethickness ${formatConsoleNumber(crosshair.outline)}`,
    `cl_crosshairdot ${formatConsoleFlag(crosshair.centerDotEnabled)}`,
    `cl_crosshair_t ${formatConsoleFlag(crosshair.tStyleEnabled)}`,
    `cl_crosshair_recoil ${formatConsoleFlag(crosshair.followRecoil)}`,
    `cl_crosshairgap_useweaponvalue ${formatConsoleFlag(crosshair.deployedWeaponGapEnabled)}`,
    `cl_fixedcrosshairgap ${formatConsoleNumber(crosshair.fixedCrosshairGap)}`,
    `cl_crosshair_dynamic_splitdist ${Math.round(crosshair.splitDistance)}`,
    `cl_crosshair_dynamic_splitalpha_innermod ${formatConsoleNumber(crosshair.innerSplitAlpha)}`,
    `cl_crosshair_dynamic_splitalpha_outermod ${formatConsoleNumber(crosshair.outerSplitAlpha)}`,
    `cl_crosshair_dynamic_maxdist_splitratio ${formatConsoleNumber(crosshair.splitSizeRatio)}`,
  ];

  return commands.join('; ');
}
