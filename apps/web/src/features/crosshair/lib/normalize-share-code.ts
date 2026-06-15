import {
  RAW_SHARE_CODE_PATTERN,
  SHARE_CODE_PATTERN,
} from '@/features/crosshair/lib/share-code-dictionary';

export function normalizeShareCode(shareCode: string): string {
  let cleanCode = shareCode.trim();

  if (!cleanCode.startsWith('CSGO-')) {
    const raw = cleanCode.replace(/-/g, '');
    if (RAW_SHARE_CODE_PATTERN.test(raw)) {
      cleanCode = `CSGO-${raw.slice(0, 5)}-${raw.slice(5, 10)}-${raw.slice(10, 15)}-${raw.slice(15, 20)}-${raw.slice(20)}`;
    }
  }

  if (!SHARE_CODE_PATTERN.test(cleanCode)) {
    throw new Error('Invalid crosshair share code');
  }

  return cleanCode;
}
