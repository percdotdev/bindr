import { describe, expect, test } from 'bun:test';

import { RECOMMENDED_BIND_TEMPLATES } from '@workspace/cs2/binds/recommended/templates';
import { formatConfigCfg } from '@workspace/cs2/config/export/format-config-cfg';
import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import { RECOMMENDED_CONFIG_TEMPLATES } from '@workspace/cs2/config/recommended/templates';
import { crosshairSettingsToConsoleLines } from '@workspace/cs2/crosshair/export/crosshair-console-commands';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';

/** Names the current CS2 client rejects. Must never be an emitted token. */
const REMOVED_COMMANDS = [
  'cl_animate_player_models',
  'cl_bob_lower_amt',
  'cl_bobamt_lat',
  'cl_bobamt_vert',
  'cl_cmdrate',
  'cl_crosshaircode',
  'cl_disablefreezecam',
  'cl_forcepreload',
  'cl_hud_bomb_under_radar',
  'cl_hud_healthammo_style',
  'cl_interp',
  'cl_interp_ratio',
  'cl_righthand',
  'cl_showhelp',
  'cl_updaterate',
  'm_rawinput',
  'mat_disable_bloom',
  'mat_queue_mode',
  'r_dynamic',
  'voice_scale',
] as const;

const COMMAND_TOKEN = /\s+/u;

function commandTokens(line: string): string[] {
  return line
    .split(';')
    .flatMap((part) => part.trim().split(COMMAND_TOKEN))
    .filter((token) => token.length > 0);
}

function emittedLines(): string[] {
  const config = {
    ...DEFAULT_CONFIG,
    performance: { ...DEFAULT_CONFIG.performance, lowLatencySleep: true },
    viewmodel: {
      ...DEFAULT_CONFIG.viewmodel,
      fov: 68,
      offsetX: 2.5,
      offsetY: 2,
      offsetZ: -2,
      presetPos: 0,
    },
  };

  return [
    ...formatConfigCfg(config).split('\n'),
    ...crosshairSettingsToConsoleLines(DEFAULT_CROSSHAIR),
    ...RECOMMENDED_CONFIG_TEMPLATES.flatMap((template) => template.commands),
    ...RECOMMENDED_BIND_TEMPLATES.map((template) => template.command),
  ];
}

describe('cs2 command catalog', () => {
  test('no exported line uses a cvar CS2 removed', () => {
    const removed = new Set<string>(REMOVED_COMMANDS);
    const hits: string[] = [];

    for (const line of emittedLines()) {
      const trimmed = line.trim();
      if (trimmed.length === 0 || trimmed.startsWith('//')) {
        continue;
      }
      for (const token of commandTokens(trimmed)) {
        if (removed.has(token)) {
          hits.push(trimmed);
        }
      }
    }

    expect(hits).toEqual([]);
  });

  test('competitive viewmodel is fov 68 with offsets 2.5 / 2 / -2', () => {
    const wide = RECOMMENDED_CONFIG_TEMPLATES.find(
      (template) => template.id === 'rec-vm-wide'
    );

    expect(wide?.commands).toEqual([
      'viewmodel_presetpos 0',
      'viewmodel_fov 68',
      'viewmodel_offset_x 2.5',
      'viewmodel_offset_y 2',
      'viewmodel_offset_z -2',
    ]);
  });
});
