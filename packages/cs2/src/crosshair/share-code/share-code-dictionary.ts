export const SHARE_CODE_DICTIONARY =
  'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789';

/** Current game format since 2026-09-30: `CS` + 44 base-57 chars (32 bytes). */
export const SHARE_CODE_PREFIX = 'CS';
export const SHARE_CODE_DIGITS = 44;
export const SHARE_CODE_BYTES = 32;

export const SHARE_CODE_PATTERN =
  /^CS[ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789]{44}$/;

/** CS:GO-era format (also used by CS2 until 2026-09-30): `CSGO-` + 5×5 chars (18 bytes). */
export const LEGACY_SHARE_CODE_PREFIX = 'CSGO-';
export const LEGACY_SHARE_CODE_DIGITS = 25;
export const LEGACY_SHARE_CODE_BYTES = 18;

export const LEGACY_SHARE_CODE_PATTERN =
  /^CSGO(-[ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789]{5}){5}$/;

export const RAW_LEGACY_SHARE_CODE_PATTERN =
  /^[ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789]{25}$/;
