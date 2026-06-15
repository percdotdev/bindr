/* biome-ignore-all lint/suspicious/noBitwiseOperators: Valve share-code payload is bitwise */
import type { CrosshairSettings } from '@/features/crosshair/lib/types';

function signedByte(value: number): number {
  return (value ^ 0x80) - 0x80;
}

function readLength(bytes: number[]): number {
  const low = bytes[14] ?? 0;
  const high = (bytes[15] ?? 0) & 0x1f;

  return ((high << 8) + low) / 10;
}

function readFlagsByte(bytes: number[], index: number) {
  const value = bytes[index] ?? 0;

  return {
    style: (value & 0xf) >> 1,
    centerDotEnabled: Boolean((value >> 4) & 1),
    deployedWeaponGapEnabled: Boolean((value >> 5) & 1),
    alphaEnabled: Boolean((value >> 6) & 1),
    tStyleEnabled: Boolean((value >> 7) & 1),
  };
}

export function bytesToCrosshairSettings(bytes: number[]): CrosshairSettings {
  const checksum = bytes[0];
  const calculatedChecksum =
    bytes.slice(1).reduce((sum, byte) => sum + byte, 0) % 256;

  if (checksum !== calculatedChecksum) {
    throw new Error('Invalid crosshair share code');
  }

  const byte8 = bytes[8] ?? 0;
  const byte10 = bytes[10] ?? 0;
  const byte11 = bytes[11] ?? 0;
  const flags = readFlagsByte(bytes, 13);

  return {
    gap: signedByte(bytes[2] ?? 0) / 10,
    outline: (bytes[3] ?? 0) / 2,
    red: bytes[4] ?? 0,
    green: bytes[5] ?? 0,
    blue: bytes[6] ?? 0,
    alpha: bytes[7] ?? 255,
    splitDistance: byte8 & 0x7f,
    followRecoil: Boolean((byte8 >> 7) & 1),
    fixedCrosshairGap: signedByte(bytes[9] ?? 0) / 10,
    color: byte10 & 7,
    outlineEnabled: (byte10 & 8) === 8,
    innerSplitAlpha: (byte10 >> 4) / 10,
    outerSplitAlpha: (byte11 & 0xf) / 10,
    splitSizeRatio: (byte11 >> 4) / 10,
    thickness: (bytes[12] ?? 0) / 10,
    style: flags.style,
    centerDotEnabled: flags.centerDotEnabled,
    deployedWeaponGapEnabled: flags.deployedWeaponGapEnabled,
    alphaEnabled: flags.alphaEnabled,
    tStyleEnabled: flags.tStyleEnabled,
    length: readLength(bytes),
  };
}

export function crosshairSettingsToBytes(crosshair: CrosshairSettings) {
  const bytes = new Array<number>(18).fill(0);
  bytes[1] = 1;
  bytes[2] = Math.round(crosshair.gap * 10) & 0xff;
  bytes[3] = Math.round(crosshair.outline * 2);
  bytes[4] = Math.round(crosshair.red);
  bytes[5] = Math.round(crosshair.green);
  bytes[6] = Math.round(crosshair.blue);
  bytes[7] = Math.round(crosshair.alpha);
  bytes[8] =
    (Math.round(crosshair.splitDistance) & 0x7f) |
    (crosshair.followRecoil ? 0x80 : 0);
  bytes[9] = Math.round(crosshair.fixedCrosshairGap * 10) & 0xff;
  bytes[10] =
    (Math.round(crosshair.color) & 7) |
    (crosshair.outlineEnabled ? 8 : 0) |
    ((Math.round(crosshair.innerSplitAlpha * 10) & 0xf) << 4);
  bytes[11] =
    (Math.round(crosshair.outerSplitAlpha * 10) & 0xf) |
    ((Math.round(crosshair.splitSizeRatio * 10) & 0xf) << 4);
  bytes[12] = Math.round(crosshair.thickness * 10);
  bytes[13] =
    ((Math.round(crosshair.style) & 0xf) << 1) |
    (crosshair.centerDotEnabled ? 0x10 : 0) |
    (crosshair.deployedWeaponGapEnabled ? 0x20 : 0) |
    (crosshair.alphaEnabled ? 0x40 : 0) |
    (crosshair.tStyleEnabled ? 0x80 : 0);

  const sizeValue = Math.round(crosshair.length * 10);
  bytes[14] = sizeValue & 0xff;
  bytes[15] = (sizeValue >> 8) & 0x1f;
  bytes[0] = bytes.slice(1).reduce((sum, byte) => sum + byte, 0) & 0xff;

  return bytes;
}
