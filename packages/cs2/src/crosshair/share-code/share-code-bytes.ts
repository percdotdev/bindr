/* biome-ignore-all lint/suspicious/noBitwiseOperators: Valve share-code payload is bitwise */
import {
  CROSSHAIR_LIMITS,
  clampCrosshairValue,
} from '@workspace/cs2/crosshair/model/crosshair-limits';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { shareCodeChecksum } from '@workspace/cs2/crosshair/share-code/share-code-base57';
import { SHARE_CODE_BYTES } from '@workspace/cs2/crosshair/share-code/share-code-dictionary';

/**
 * Current share-code payload (CS2 build 2000922, 2026-09-30), 32 bytes:
 *
 *   [0]      checksum = sum(bytes[1..31]) & 0xff
 *   [1]      payload version = 1
 *   [2..3]   screen height, uint16 LE
 *   [4]      style bits 0-4 | recoil bit 5 | dot bit 6 | T-style bit 7
 *   [5..8]   r g b a
 *   [9..12]  outline r g b a
 *   [13]     thickness bits 0-5 | outline mode bits 6-7
 *   [14..15] gap, int16 LE
 *   [16]     length
 *   [17]     dynamic spread limit
 *   [18..21] uint32 LE: split distance 0-6 | inner alpha ×100 7-13 |
 *            (outer alpha − 0.3) ×100 14-20 | split ratio ×100 21-27 |
 *            scope dot uses crosshair color bit 28
 *   [22]     (scope dot scale − 0.1) ×100
 *   [23..31] zero
 *
 * Reference vector (game defaults @1080: style 7, recoil on, green,
 * full black outline): `CSpb9t3x5NtrX5fWaENsr8vusEtwpiURjzqauLkOiYHMqF`
 * = 28 01 38 04 27 00 ff 00 ff 00 00 00 ff 42 04 00 08 ff 03 80 91 0c 5a 00…
 */
const PAYLOAD_VERSION = 1;
const HUNDREDTHS = 100;
const OUTER_SPLIT_ALPHA_OFFSET = 30;
const OUTER_SPLIT_ALPHA_MAX_STEPS = 70;
const SCOPE_DOT_SCALE_OFFSET = 10;
const SCOPE_DOT_SCALE_MAX_STEPS = 190;
const STYLE_MASK = 0x1f;
const THICKNESS_MASK = 0x3f;
const SEVEN_BITS = 0x7f;
const INT16_SIGN = 0x80_00;
const INT16_RANGE = 0x1_00_00;

function toHundredths(value: number, min = 0): number {
  return Math.round(value * HUNDREDTHS) - Math.round(min * HUNDREDTHS);
}

function clampLimit(
  value: number,
  limit: keyof typeof CROSSHAIR_LIMITS
): number {
  return clampCrosshairValue(value, CROSSHAIR_LIMITS[limit]);
}

function clampByte(value: number): number {
  return Math.min(0xff, Math.max(0, Math.round(value)));
}

function flag(enabled: boolean, bit: number): number {
  return enabled ? 1 << bit : 0;
}

function byteAt(bytes: readonly number[], index: number): number {
  return bytes[index] ?? 0;
}

function readUint16(bytes: readonly number[], index: number): number {
  return byteAt(bytes, index) | (byteAt(bytes, index + 1) << 8);
}

function readInt16(bytes: readonly number[], index: number): number {
  const raw = readUint16(bytes, index);
  return raw >= INT16_SIGN ? raw - INT16_RANGE : raw;
}

function readUint32(bytes: readonly number[], index: number): number {
  return (
    (byteAt(bytes, index) |
      (byteAt(bytes, index + 1) << 8) |
      (byteAt(bytes, index + 2) << 16) |
      (byteAt(bytes, index + 3) << 24)) >>>
    0
  );
}

export function bytesToCrosshairSettings(
  bytes: readonly number[]
): CrosshairSettings {
  if (bytes.length !== SHARE_CODE_BYTES) {
    throw new Error('Invalid crosshair share code');
  }

  if (bytes[0] !== shareCodeChecksum(bytes)) {
    throw new Error('Invalid crosshair share code');
  }

  if (bytes[1] !== PAYLOAD_VERSION) {
    throw new Error('Unsupported crosshair share code version');
  }

  const screenHeight = readUint16(bytes, 2);
  if (screenHeight === 0) {
    throw new Error('Invalid crosshair share code');
  }

  const flags = byteAt(bytes, 4);
  const sizeByte = byteAt(bytes, 13);
  const bits = readUint32(bytes, 18);

  return {
    style: Math.min(flags & STYLE_MASK, CROSSHAIR_LIMITS.style.max),
    followRecoil: Boolean((flags >> 5) & 1),
    centerDotEnabled: Boolean((flags >> 6) & 1),
    tStyleEnabled: Boolean((flags >> 7) & 1),
    red: byteAt(bytes, 5),
    green: byteAt(bytes, 6),
    blue: byteAt(bytes, 7),
    alpha: byteAt(bytes, 8),
    outlineRed: byteAt(bytes, 9),
    outlineGreen: byteAt(bytes, 10),
    outlineBlue: byteAt(bytes, 11),
    outlineAlpha: byteAt(bytes, 12),
    thickness: Math.min(
      sizeByte & THICKNESS_MASK,
      CROSSHAIR_LIMITS.thickness.max
    ),
    outlineMode: Math.min(sizeByte >> 6, CROSSHAIR_LIMITS.outlineMode.max),
    gap: clampLimit(readInt16(bytes, 14), 'gap'),
    length: byteAt(bytes, 16),
    dynamicSpreadLimit: byteAt(bytes, 17),
    splitDistance: bits & SEVEN_BITS,
    innerSplitAlpha:
      Math.min((bits >>> 7) & SEVEN_BITS, HUNDREDTHS) / HUNDREDTHS,
    outerSplitAlpha:
      (Math.min((bits >>> 14) & SEVEN_BITS, OUTER_SPLIT_ALPHA_MAX_STEPS) +
        OUTER_SPLIT_ALPHA_OFFSET) /
      HUNDREDTHS,
    splitSizeRatio:
      Math.min((bits >>> 21) & SEVEN_BITS, HUNDREDTHS) / HUNDREDTHS,
    scopeDotUsesCrosshairColor: Boolean((bits >>> 28) & 1),
    scopeDotScale:
      (Math.min(byteAt(bytes, 22), SCOPE_DOT_SCALE_MAX_STEPS) +
        SCOPE_DOT_SCALE_OFFSET) /
      HUNDREDTHS,
    screenHeight: Math.max(screenHeight, CROSSHAIR_LIMITS.screenHeight.min),
  };
}

export function crosshairSettingsToBytes(
  crosshair: CrosshairSettings
): number[] {
  const bytes = new Array<number>(SHARE_CODE_BYTES).fill(0);

  const screenHeight = Math.round(
    clampLimit(crosshair.screenHeight, 'screenHeight')
  );
  const gap = Math.round(clampLimit(crosshair.gap, 'gap')) & 0xff_ff;
  const bits =
    (Math.round(clampLimit(crosshair.splitDistance, 'splitDistance')) |
      (toHundredths(clampLimit(crosshair.innerSplitAlpha, 'innerSplitAlpha')) <<
        7) |
      (toHundredths(
        clampLimit(crosshair.outerSplitAlpha, 'outerSplitAlpha'),
        CROSSHAIR_LIMITS.outerSplitAlpha.min
      ) <<
        14) |
      (toHundredths(clampLimit(crosshair.splitSizeRatio, 'splitSizeRatio')) <<
        21) |
      flag(crosshair.scopeDotUsesCrosshairColor, 28)) >>>
    0;

  bytes[1] = PAYLOAD_VERSION;
  bytes[2] = screenHeight & 0xff;
  bytes[3] = (screenHeight >> 8) & 0xff;
  bytes[4] =
    Math.round(clampLimit(crosshair.style, 'style')) |
    flag(crosshair.followRecoil, 5) |
    flag(crosshair.centerDotEnabled, 6) |
    flag(crosshair.tStyleEnabled, 7);
  bytes[5] = clampByte(crosshair.red);
  bytes[6] = clampByte(crosshair.green);
  bytes[7] = clampByte(crosshair.blue);
  bytes[8] = clampByte(crosshair.alpha);
  bytes[9] = clampByte(crosshair.outlineRed);
  bytes[10] = clampByte(crosshair.outlineGreen);
  bytes[11] = clampByte(crosshair.outlineBlue);
  bytes[12] = clampByte(crosshair.outlineAlpha);
  bytes[13] =
    Math.round(clampLimit(crosshair.thickness, 'thickness')) |
    (Math.round(clampLimit(crosshair.outlineMode, 'outlineMode')) << 6);
  bytes[14] = gap & 0xff;
  bytes[15] = (gap >> 8) & 0xff;
  bytes[16] = Math.round(clampLimit(crosshair.length, 'length'));
  bytes[17] = Math.round(
    clampLimit(crosshair.dynamicSpreadLimit, 'dynamicSpreadLimit')
  );
  bytes[18] = bits & 0xff;
  bytes[19] = (bits >>> 8) & 0xff;
  bytes[20] = (bits >>> 16) & 0xff;
  bytes[21] = (bits >>> 24) & 0xff;
  bytes[22] = toHundredths(
    clampLimit(crosshair.scopeDotScale, 'scopeDotScale'),
    CROSSHAIR_LIMITS.scopeDotScale.min
  );
  bytes[0] = shareCodeChecksum(bytes);

  return bytes;
}
