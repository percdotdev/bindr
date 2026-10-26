/* biome-ignore-all lint/suspicious/noBitwiseOperators: byte packing */
import { SHARE_CODE_DICTIONARY } from '@workspace/cs2/crosshair/share-code/share-code-dictionary';

const DICTIONARY_LENGTH = BigInt(SHARE_CODE_DICTIONARY.length);
const BYTE_MASK = BigInt(0xff);
const BITS_PER_BYTE = BigInt(8);

/** Big-endian bytes → base-57 digits, least significant digit first. */
export function bytesToBase57(
  bytes: readonly number[],
  digits: number
): string {
  let value = BigInt(0);
  for (const byte of bytes) {
    value = (value << BITS_PER_BYTE) | BigInt(byte & 0xff);
  }

  let result = '';
  for (let index = 0; index < digits; index += 1) {
    result += SHARE_CODE_DICTIONARY[Number(value % DICTIONARY_LENGTH)];
    value /= DICTIONARY_LENGTH;
  }

  return result;
}

/** Base-57 digits (least significant first) → big-endian bytes. */
export function base57ToBytes(digits: string, byteCount: number): number[] {
  let value = BigInt(0);
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    const digit = SHARE_CODE_DICTIONARY.indexOf(digits[index] ?? '');
    if (digit === -1) {
      throw new Error('Invalid crosshair share code');
    }
    value = value * DICTIONARY_LENGTH + BigInt(digit);
  }

  if (value >> (BITS_PER_BYTE * BigInt(byteCount)) !== BigInt(0)) {
    throw new Error('Invalid crosshair share code');
  }

  const bytes = new Array<number>(byteCount).fill(0);
  for (let index = byteCount - 1; index >= 0; index -= 1) {
    bytes[index] = Number(value & BYTE_MASK);
    value >>= BITS_PER_BYTE;
  }

  return bytes;
}

/** Valve checksum: sum of every byte after the first, mod 256. */
export function shareCodeChecksum(bytes: readonly number[]): number {
  let sum = 0;
  for (let index = 1; index < bytes.length; index += 1) {
    sum = (sum + (bytes[index] ?? 0)) & 0xff;
  }
  return sum;
}
