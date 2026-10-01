/* biome-ignore-all lint/suspicious/noBitwiseOperators: Valve share-code payload is bitwise */
import type { LegacyCrosshairSettings } from '@workspace/cs2/crosshair/legacy/legacy-types';
import { CROSSHAIR_LIMITS } from '@workspace/cs2/crosshair/model/crosshair-limits';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { shareCodeChecksum } from '@workspace/cs2/crosshair/share-code/share-code-base57';
import { LEGACY_SHARE_CODE_BYTES } from '@workspace/cs2/crosshair/share-code/share-code-dictionary';

export const LEGACY_PAYLOAD_VERSION_CSGO = 1;
export const LEGACY_PAYLOAD_VERSION_PIXEL = 3;
export const LEGACY_PAYLOAD_VERSION_PIXEL_OUTLINE_MODE = 4;

/** Pixel-era `CSGO-` codes checksum bytes 1..15 only (byte 16/17 are padding). */
const PIXEL_CHECKSUM_END = 16;
const TENTHS = 10;
const HALVES = 2;
const TWENTIETHS = 20;
const HUNDREDTHS = 100;
const OUTER_SPLIT_ALPHA_OFFSET_STEPS = 6;
const SEVEN_BITS = 0x7f;
const FIVE_BITS = 0x1f;
const FOUR_BITS = 0xf;
const TWO_BITS = 0x3;
const SIGNED_BYTE_FLIP = 0x80;

function signedByte(value: number): number {
  return (value ^ SIGNED_BYTE_FLIP) - SIGNED_BYTE_FLIP;
}

export function readLegacyPayloadVersion(bytes: readonly number[]): number {
  return bytes[1] ?? 0;
}

function assertLegacyLength(bytes: readonly number[]): void {
  if (bytes.length !== LEGACY_SHARE_CODE_BYTES) {
    throw new Error('Invalid crosshair share code');
  }
}

/** `CSGO-` version 1: CS:GO float units, color presets. */
export function bytesToLegacyCrosshairSettings(
  bytes: readonly number[]
): LegacyCrosshairSettings {
  assertLegacyLength(bytes);

  if (bytes[0] !== shareCodeChecksum(bytes)) {
    throw new Error('Invalid crosshair share code');
  }

  const byte8 = bytes[8] ?? 0;
  const byte10 = bytes[10] ?? 0;
  const byte11 = bytes[11] ?? 0;
  const flags = bytes[13] ?? 0;
  const lengthLow = bytes[14] ?? 0;
  const lengthHigh = (bytes[15] ?? 0) & FIVE_BITS;

  return {
    gap: signedByte(bytes[2] ?? 0) / TENTHS,
    outline: (bytes[3] ?? 0) / HALVES,
    red: bytes[4] ?? 0,
    green: bytes[5] ?? 0,
    blue: bytes[6] ?? 0,
    alpha: bytes[7] ?? 0,
    splitDistance: byte8 & SEVEN_BITS,
    followRecoil: Boolean((byte8 >> 7) & 1),
    fixedCrosshairGap: signedByte(bytes[9] ?? 0) / TENTHS,
    color: byte10 & 7,
    outlineEnabled: (byte10 & 8) === 8,
    innerSplitAlpha: (byte10 >> 4) / TENTHS,
    outerSplitAlpha: (byte11 & FOUR_BITS) / TENTHS,
    splitSizeRatio: (byte11 >> 4) / TENTHS,
    thickness: (bytes[12] ?? 0) / TENTHS,
    style: (flags & FOUR_BITS) >> 1,
    centerDotEnabled: Boolean((flags >> 4) & 1),
    deployedWeaponGapEnabled: Boolean((flags >> 5) & 1),
    alphaEnabled: Boolean((flags >> 6) & 1),
    tStyleEnabled: Boolean((flags >> 7) & 1),
    length: ((lengthHigh << 8) + lengthLow) / TENTHS,
  };
}

/**
 * `CSGO-` versions 3 and 4 (CS2 builds 2000913–2000916): already pixel
 * units, but no outline color / scope-dot fields. The game imports these
 * with a black outline whose alpha mirrors the crosshair alpha.
 */
export function bytesToPixelLegacyCrosshairSettings(
  bytes: readonly number[]
): CrosshairSettings {
  assertLegacyLength(bytes);

  if (bytes[0] !== shareCodeChecksum(bytes, PIXEL_CHECKSUM_END)) {
    throw new Error('Invalid crosshair share code');
  }

  const version = readLegacyPayloadVersion(bytes);
  const flags = bytes[2] ?? 0;
  const alpha = bytes[6] ?? 0;
  const bits =
    ((bytes[10] ?? 0) |
      ((bytes[11] ?? 0) << 8) |
      ((bytes[12] ?? 0) << 16) |
      ((bytes[13] ?? 0) << 24)) >>>
    0;
  const screenHeight = (bytes[14] ?? 0) | ((bytes[15] ?? 0) << 8);

  const outlineMode =
    version >= LEGACY_PAYLOAD_VERSION_PIXEL_OUTLINE_MODE
      ? Math.min((bits >>> 28) & TWO_BITS, CROSSHAIR_LIMITS.outlineMode.max)
      : (flags >> 5) & 1;

  return {
    style: Math.min(flags & FOUR_BITS, CROSSHAIR_LIMITS.style.max),
    followRecoil: Boolean((flags >> 4) & 1),
    centerDotEnabled: Boolean((flags >> 6) & 1),
    tStyleEnabled: Boolean((flags >> 7) & 1),
    red: bytes[3] ?? 0,
    green: bytes[4] ?? 0,
    blue: bytes[5] ?? 0,
    alpha,
    outlineRed: 0,
    outlineGreen: 0,
    outlineBlue: 0,
    outlineAlpha: alpha,
    outlineMode,
    gap: bytes[7] ?? 0,
    length: bytes[8] ?? 0,
    dynamicSpreadLimit: bytes[9] ?? 0,
    splitDistance: bits & SEVEN_BITS,
    innerSplitAlpha: Math.min(((bits >>> 7) & FIVE_BITS) / TWENTIETHS, 1),
    outerSplitAlpha: Math.min(
      (((bits >>> 12) & FOUR_BITS) + OUTER_SPLIT_ALPHA_OFFSET_STEPS) /
        TWENTIETHS,
      1
    ),
    splitSizeRatio: Math.min(((bits >>> 16) & SEVEN_BITS) / HUNDREDTHS, 1),
    thickness: Math.min(
      (bits >>> 23) & FIVE_BITS,
      CROSSHAIR_LIMITS.thickness.max
    ),
    scopeDotScale: 1,
    scopeDotUsesCrosshairColor: false,
    screenHeight: Math.max(screenHeight, CROSSHAIR_LIMITS.screenHeight.min),
  };
}
