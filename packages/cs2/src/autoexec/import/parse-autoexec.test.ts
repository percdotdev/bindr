import { describe, expect, test } from 'bun:test';
import { composeAutoexec } from '@workspace/cs2/autoexec/compose/compose-autoexec';
import { parseAutoexec } from '@workspace/cs2/autoexec/import/parse-autoexec';
import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import { emptySelection } from '@workspace/cs2/share/studio-slices';

const USER_BINDS = `
bind "SPACE" "+jump"
bind "ESCAPE" "cancelselect"
bind "MOUSE1" "+attack"
bind "MWHEELUP" "invprev"
bind "MOUSE_X" "yaw"
bind "'" "say awhare.club on top"
bind "\`" "toggleconsole"
bind "k" "say ONCE YOU GO BLACK, THERE'S NO GOING BACK."
unbindall
bind "w" "+forward"
`;

describe('parseAutoexec', () => {
  test('roundtrips a bindr cfg', () => {
    const cfg = composeAutoexec(
      {
        binds: [
          { command: '+jump', id: 'space', key: 'space' },
          { command: 'slot1', id: 'one', key: '1' },
        ],
        config: {
          ...DEFAULT_CONFIG,
          audio: { ...DEFAULT_CONFIG.audio, muteOnFocusLoss: false },
          hud: { ...DEFAULT_CONFIG.hud, weaponRarityGlow: true },
          mouse: { ...DEFAULT_CONFIG.mouse, sensitivity: 1.495 },
          performance: {
            ...DEFAULT_CONFIG.performance,
            fpsMax: 0,
            lowLatencySleep: true,
          },
          viewmodel: {
            fov: 68,
            offsetX: 2.5,
            offsetY: 2,
            offsetZ: -2,
            preferLeftHanded: false,
            presetPos: 0,
          },
        },
        crosshair: { ...DEFAULT_CROSSHAIR, gap: 3, green: 195 },
      },
      { banner: true, slices: emptySelection(true) }
    );

    const parsed = parseAutoexec(cfg);
    expect(parsed.status).toBe('ok');
    if (parsed.status !== 'ok') {
      return;
    }

    expect(parsed.crosshair.gap).toBe(3);
    expect(parsed.crosshair.green).toBe(195);
    expect(parsed.config.mouse.sensitivity).toBe(1.495);
    expect(parsed.config.viewmodel.fov).toBe(68);
    expect(parsed.config.viewmodel.presetPos).toBe(0);
    expect(parsed.config.audio.muteOnFocusLoss).toBe(false);
    expect(parsed.config.hud.weaponRarityGlow).toBe(true);
    expect(parsed.config.performance.fpsMax).toBe(0);
    expect(parsed.config.performance.lowLatencySleep).toBe(true);
    expect(parsed.config.enabledRecommendations).toContain('rec-vm-wide');
    expect(parsed.binds.map((bind) => bind.key).toSorted()).toEqual([
      '1',
      'space',
    ]);
    expect(parsed.includes).toEqual({
      binds: true,
      config: true,
      crosshair: true,
    });
  });

  test('maps CS2 key names and keeps the binds after unbindall', () => {
    const parsed = parseAutoexec(USER_BINDS);
    expect(parsed.status).toBe('ok');
    if (parsed.status !== 'ok') {
      return;
    }

    const byKey = new Map(parsed.binds.map((bind) => [bind.key, bind.command]));
    expect(byKey.get('w')).toBe('+forward');
    expect(byKey.has('space')).toBe(false);
    expect(parsed.includes.config).toBe(false);
    expect(parsed.includes.crosshair).toBe(false);
  });

  test('reads quoted binds, skips echo, and joins an unquoted command', () => {
    const parsed = parseAutoexec(`
      echo "ignore me"
      bind "k" "say hello there"
      sensitivity 1.2; volume 0.4
      // cl_crosshaircode is not a command
    `);
    expect(parsed.status).toBe('ok');
    if (parsed.status !== 'ok') {
      return;
    }

    expect(parsed.binds).toEqual([
      { command: 'say hello there', id: 'import-k', key: 'k' },
    ]);
    expect(parsed.config.mouse.sensitivity).toBe(1.2);
    expect(parsed.config.audio.master).toBe(0.4);
    expect(parsed.config.audio.musicVolume).toBe(
      DEFAULT_CONFIG.audio.musicVolume
    );
  });

  test('returns empty when the file has no studio commands', () => {
    expect(parseAutoexec('echo "hi"\nhost_writeconfig\n').status).toBe('empty');
    expect(parseAutoexec('x'.repeat(256_001)).status).toBe('too-large');
  });
});
