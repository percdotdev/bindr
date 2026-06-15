import { normalizeShareCode } from '@/features/crosshair/lib/normalize-share-code';
import { crosshairSettingsToBytes } from '@/features/crosshair/lib/share-code-bytes';
import { SHARE_CODE_DICTIONARY } from '@/features/crosshair/lib/share-code-dictionary';
import type { CrosshairSettings } from '@/features/crosshair/lib/types';

function bytesToShareCode(bytes: number[]): string {
  const hexString = bytes
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  let num = BigInt(`0x${hexString}`);
  const dictionaryLength = BigInt(SHARE_CODE_DICTIONARY.length);

  let result = '';
  for (let index = 0; index < 25; index++) {
    const remainder = Number(num % dictionaryLength);
    result += SHARE_CODE_DICTIONARY[remainder];
    num /= dictionaryLength;
  }

  return `CSGO-${result.slice(0, 5)}-${result.slice(5, 10)}-${result.slice(10, 15)}-${result.slice(15, 20)}-${result.slice(20)}`;
}

export function encodeShareCode(crosshair: CrosshairSettings): string {
  const bytes = crosshairSettingsToBytes(crosshair);
  const shareCode = bytesToShareCode(bytes);
  normalizeShareCode(shareCode);
  return shareCode;
}
