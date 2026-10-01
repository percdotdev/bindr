import type {
  CrosshairRgb,
  CrosshairSettings,
} from '@workspace/cs2/crosshair/model/types';

/** Handy swatches for the picker — the game no longer has color presets. */
export const CROSSHAIR_COLOR_SWATCHES = [
  '#00ff00',
  '#ff0000',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
  '#ffffff',
  '#000000',
] as const;

const HEX_PATTERN = /^[0-9A-Fa-f]{6}$/;
const HEX_ALPHA_PATTERN = /^[0-9A-Fa-f]{8}$/;
const MAX_CHANNEL = 255;

function channelToHex(channel: number): string {
  return Math.min(MAX_CHANNEL, Math.max(0, Math.round(channel)))
    .toString(16)
    .padStart(2, '0');
}

export function crosshairRgbToHex(
  red: number,
  green: number,
  blue: number
): string {
  return `#${channelToHex(red)}${channelToHex(green)}${channelToHex(blue)}`;
}

export function crosshairRgbaToHex(
  red: number,
  green: number,
  blue: number,
  alpha: number
): string {
  return `${crosshairRgbToHex(red, green, blue)}${channelToHex(alpha)}`;
}

export function crosshairHexToRgb(hex: string): CrosshairRgb | null {
  const raw = hex.trim().replace('#', '');

  if (!(HEX_PATTERN.test(raw) || HEX_ALPHA_PATTERN.test(raw))) {
    return null;
  }

  return {
    red: Number.parseInt(raw.slice(0, 2), 16),
    green: Number.parseInt(raw.slice(2, 4), 16),
    blue: Number.parseInt(raw.slice(4, 6), 16),
  };
}

export function crosshairHexToRgba(
  hex: string
): (CrosshairRgb & { alpha: number }) | null {
  const rgb = crosshairHexToRgb(hex);
  if (!rgb) {
    return null;
  }

  const raw = hex.trim().replace('#', '');
  const alpha = HEX_ALPHA_PATTERN.test(raw)
    ? Number.parseInt(raw.slice(6, 8), 16)
    : MAX_CHANNEL;

  return { ...rgb, alpha };
}

export function resolveCrosshairRgb(
  crosshair: CrosshairSettings
): readonly [number, number, number] {
  return [crosshair.red, crosshair.green, crosshair.blue];
}

export function resolveCrosshairAlpha(crosshair: CrosshairSettings): number {
  return crosshair.alpha / MAX_CHANNEL;
}

export function resolveCrosshairOutlineRgb(
  crosshair: CrosshairSettings
): readonly [number, number, number] {
  return [crosshair.outlineRed, crosshair.outlineGreen, crosshair.outlineBlue];
}

export function resolveCrosshairOutlineAlpha(
  crosshair: CrosshairSettings
): number {
  return crosshair.outlineAlpha / MAX_CHANNEL;
}
