import {
  bytesToLegacyCrosshairSettings,
  bytesToPixelLegacyCrosshairSettings,
  LEGACY_PAYLOAD_VERSION_CSGO,
  LEGACY_PAYLOAD_VERSION_PIXEL,
  LEGACY_PAYLOAD_VERSION_PIXEL_OUTLINE_MODE,
  readLegacyPayloadVersion,
} from '@workspace/cs2/crosshair/legacy/legacy-share-code-bytes';
import { migrateLegacyCrosshair } from '@workspace/cs2/crosshair/legacy/migrate-legacy-crosshair';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import {
  getShareCodeFormat,
  normalizeShareCode,
} from '@workspace/cs2/crosshair/share-code/normalize-share-code';
import { base57ToBytes } from '@workspace/cs2/crosshair/share-code/share-code-base57';
import { bytesToCrosshairSettings } from '@workspace/cs2/crosshair/share-code/share-code-bytes';
import {
  LEGACY_SHARE_CODE_BYTES,
  LEGACY_SHARE_CODE_PREFIX,
  SHARE_CODE_BYTES,
  SHARE_CODE_PREFIX,
} from '@workspace/cs2/crosshair/share-code/share-code-dictionary';

/**
 * - `current`: native `CS…` code, lossless.
 * - `pixel-legacy`: `CSGO-` code from the first CS2 pixel builds; lossless
 *   except outline color (black) and scope-dot settings (defaults).
 * - `converted`: CS:GO-era `CSGO-` code; units approximated to pixels.
 */
export type ShareCodeSource = 'current' | 'pixel-legacy' | 'converted';

export interface DecodedShareCode {
  crosshair: CrosshairSettings;
  source: ShareCodeSource;
}

function decodeLegacyShareCode(normalizedCode: string): DecodedShareCode {
  const digits = normalizedCode
    .slice(LEGACY_SHARE_CODE_PREFIX.length)
    .replace(/-/g, '');
  const bytes = base57ToBytes(digits, LEGACY_SHARE_CODE_BYTES);
  const version = readLegacyPayloadVersion(bytes);

  if (version === LEGACY_PAYLOAD_VERSION_CSGO) {
    return {
      crosshair: migrateLegacyCrosshair(bytesToLegacyCrosshairSettings(bytes)),
      source: 'converted',
    };
  }

  if (
    version === LEGACY_PAYLOAD_VERSION_PIXEL ||
    version === LEGACY_PAYLOAD_VERSION_PIXEL_OUTLINE_MODE
  ) {
    return {
      crosshair: bytesToPixelLegacyCrosshairSettings(bytes),
      source: 'pixel-legacy',
    };
  }

  throw new Error('Unsupported crosshair share code version');
}

export function decodeShareCodeDetailed(shareCode: string): DecodedShareCode {
  const normalizedCode = normalizeShareCode(shareCode);

  if (getShareCodeFormat(normalizedCode) === 'csgo') {
    return decodeLegacyShareCode(normalizedCode);
  }

  const bytes = base57ToBytes(
    normalizedCode.slice(SHARE_CODE_PREFIX.length),
    SHARE_CODE_BYTES
  );

  return { crosshair: bytesToCrosshairSettings(bytes), source: 'current' };
}

export function decodeShareCode(shareCode: string): CrosshairSettings {
  return decodeShareCodeDetailed(shareCode).crosshair;
}
