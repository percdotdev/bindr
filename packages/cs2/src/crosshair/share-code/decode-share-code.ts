import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { normalizeShareCode } from '@workspace/cs2/crosshair/share-code/normalize-share-code';
import { bytesToCrosshairSettings } from '@workspace/cs2/crosshair/share-code/share-code-bytes';
import { SHARE_CODE_DICTIONARY } from '@workspace/cs2/crosshair/share-code/share-code-dictionary';

function shareCodeToBytes(shareCode: string): number[] {
  const cleanCode = normalizeShareCode(shareCode);
  const chars = cleanCode.slice(5).replace(/-/g, '');
  const dictionaryLength = BigInt(SHARE_CODE_DICTIONARY.length);

  let num = BigInt(0);
  for (const char of chars.split('').reverse()) {
    const index = SHARE_CODE_DICTIONARY.indexOf(char);
    if (index === -1) {
      throw new Error('Invalid crosshair share code');
    }
    num = num * dictionaryLength + BigInt(index);
  }

  const hexnum = num.toString(16).padStart(36, '0');
  const bytes: number[] = [];

  for (let index = 0; index < hexnum.length; index += 2) {
    bytes.push(Number.parseInt(hexnum.slice(index, index + 2), 16));
  }

  return bytes;
}

export function decodeShareCode(shareCode: string): CrosshairSettings {
  return bytesToCrosshairSettings(shareCodeToBytes(shareCode));
}
