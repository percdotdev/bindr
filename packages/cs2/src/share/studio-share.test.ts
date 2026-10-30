import { describe, expect, test } from 'bun:test';

import { composeAutoexec } from '@workspace/cs2/autoexec/compose/compose-autoexec';
import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import {
  applyStudioShare,
  parseStudioShare,
  pickStudioShare,
  type StudioSnapshot,
} from './studio-share';
import { decodeStudioShare, encodeStudioShare } from './studio-share-codec';
import { emptySelection } from './studio-slices';

const snapshot: StudioSnapshot = {
  binds: [{ command: 'slot1', id: 'b1', key: '1', label: 'Primary' }],
  config: {
    ...DEFAULT_CONFIG,
    mouse: { ...DEFAULT_CONFIG.mouse, sensitivity: 1.1 },
  },
  crosshair: { ...DEFAULT_CROSSHAIR, gap: 2 },
};

describe('studio share', () => {
  test('roundtrip keeps selected slices and fills defaults', async () => {
    const selection = emptySelection(false);
    selection.crosshair = true;
    selection.mouse = true;
    selection.binds = true;

    const wire = pickStudioShare(snapshot, selection);
    expect(wire).not.toBeNull();
    const token = await encodeStudioShare(wire);
    expect(token).toBeString();

    const share = token ? await decodeStudioShare(token) : null;
    expect(share?.crosshair?.gap).toBe(2);
    expect(share?.crosshair?.length).toBe(DEFAULT_CROSSHAIR.length);
    expect(share?.config.mouse?.sensitivity).toBe(1.1);
    expect(share?.config.mouse?.zoomSensitivityRatio).toBe(
      DEFAULT_CONFIG.mouse.zoomSensitivityRatio
    );
    expect(share?.config.viewmodel).toBeUndefined();
    expect(share?.binds?.[0]?.command).toBe('slot1');
  });

  test('apply replaces only the selected section', () => {
    const share = parseStudioShare({
      c: { mouse: { sensitivity: 0.8 } },
      v: 1,
      x: { gap: 1 },
    });
    expect(share).not.toBeNull();
    if (!share) {
      return;
    }

    const selection = emptySelection(false);
    selection.mouse = true;
    const next = applyStudioShare(snapshot, share, selection);
    expect(next.config.mouse.sensitivity).toBe(0.8);
    expect(next.crosshair.gap).toBe(snapshot.crosshair.gap);
    expect(next.binds).toBe(snapshot.binds);
  });

  test('cfg includes only the selected config section', () => {
    const selection = emptySelection(false);
    selection.mouse = true;
    const cfg = composeAutoexec(snapshot, { banner: false, slices: selection });
    expect(cfg).toContain('sensitivity 1.1');
    expect(cfg).toContain('// mouse');
    expect(cfg).not.toContain('// viewmodel');
    expect(cfg).not.toContain('// ===== crosshair =====');
  });

  test('quotes are stripped from shared bind commands', () => {
    const selection = emptySelection(false);
    selection.binds = true;
    const wire = pickStudioShare(
      {
        ...snapshot,
        binds: [{ command: 'say "gg"', id: 'b', key: 'y' }],
      },
      selection
    );
    const share = parseStudioShare(wire);
    expect(share?.binds?.[0]?.command).toBe('say gg');
  });

  test('a broken token does not decode', async () => {
    expect(await decodeStudioShare('not-a-real-token')).toBeNull();
    expect(parseStudioShare({ v: 2 })).toBeNull();
  });
});
