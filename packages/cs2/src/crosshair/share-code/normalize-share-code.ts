import {
  LEGACY_SHARE_CODE_PATTERN,
  RAW_LEGACY_SHARE_CODE_PATTERN,
  SHARE_CODE_PATTERN,
} from '@workspace/cs2/crosshair/share-code/share-code-dictionary';

export type ShareCodeFormat = 'cs' | 'csgo';

const LEGACY_PREFIX_PATTERN = /^CSGO-?/;
const DASH_PATTERN = /-/g;

function formatLegacyShareCode(raw: string): string {
  return `CSGO-${raw.slice(0, 5)}-${raw.slice(5, 10)}-${raw.slice(10, 15)}-${raw.slice(15, 20)}-${raw.slice(20)}`;
}

/**
 * Accepts the current `CS…` code, a `CSGO-…` code, or the 25 raw characters
 * of a `CSGO-` code (with or without dashes). Case-sensitive on purpose.
 */
export function normalizeShareCode(shareCode: string): string {
  const cleanCode = shareCode.trim();

  if (SHARE_CODE_PATTERN.test(cleanCode)) {
    return cleanCode;
  }

  if (LEGACY_SHARE_CODE_PATTERN.test(cleanCode)) {
    return cleanCode;
  }

  const raw = cleanCode
    .replace(LEGACY_PREFIX_PATTERN, '')
    .replace(DASH_PATTERN, '');
  if (RAW_LEGACY_SHARE_CODE_PATTERN.test(raw)) {
    return formatLegacyShareCode(raw);
  }

  throw new Error('Invalid crosshair share code');
}

export function getShareCodeFormat(normalizedCode: string): ShareCodeFormat {
  return normalizedCode.startsWith('CSGO-') ? 'csgo' : 'cs';
}
