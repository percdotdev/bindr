import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { bytesToBase57 } from '@workspace/cs2/crosshair/share-code/share-code-base57';
import { crosshairSettingsToBytes } from '@workspace/cs2/crosshair/share-code/share-code-bytes';
import {
  SHARE_CODE_DIGITS,
  SHARE_CODE_PREFIX,
} from '@workspace/cs2/crosshair/share-code/share-code-dictionary';

/** Produces a code in the current game format (`CS` + 44 chars). */
export function encodeShareCode(crosshair: CrosshairSettings): string {
  const bytes = crosshairSettingsToBytes(crosshair);
  return `${SHARE_CODE_PREFIX}${bytesToBase57(bytes, SHARE_CODE_DIGITS)}`;
}
