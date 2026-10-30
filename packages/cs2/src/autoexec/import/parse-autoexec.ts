import { normalizeBindKey } from '@workspace/cs2/autoexec/import/bind-keys';
import {
  splitCfgStatements,
  stripCfgComment,
  tokenizeCfgStatement,
} from '@workspace/cs2/autoexec/import/cfg-lines';
import { sanitizeBindCommand } from '@workspace/cs2/binds/model/bind-command';
import type { BindEntry } from '@workspace/cs2/binds/model/types';
import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type {
  ConfigPatch,
  ConfigSectionKey,
  ConfigSettings,
} from '@workspace/cs2/config/model/types';
import { RECOMMENDED_CONFIG_TEMPLATES } from '@workspace/cs2/config/recommended/templates';
import { CROSSHAIR_LIMITS } from '@workspace/cs2/crosshair/model/crosshair-limits';
import { allowsNegativeCrosshairGap } from '@workspace/cs2/crosshair/model/crosshair-style';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import type {
  CrosshairField,
  CrosshairSettings,
} from '@workspace/cs2/crosshair/model/types';
import { decodeShareCodeDetailed } from '@workspace/cs2/crosshair/share-code/decode-share-code';

const MAX_AUTOEXEC_CHARS = 256_000;
const MAX_BINDS = 128;
const MAX_COMMAND_LENGTH = 400;
const CHANNEL_MAX = 255;
const SHARE_CODE_COMMENT = /\/\/\s*share code:\s*(?<code>\S+)/iu;
const BOM = /^\uFEFF/u;
const NUMBER_TOKEN = /^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/u;
const COMMAND_SPLIT = /\s+/u;
const LINE_SPLIT = /\r?\n/u;
const RATE_OPTIONS = [196_608, 262_144, 524_288, 786_432] as const;
const EXCLUSIVE_CATEGORIES = new Set(['viewmodel', 'radar']);
const IGNORED_COMMANDS = new Set([
  'alias',
  'con_logfile',
  'echo',
  'exec',
  'exec_async',
  'host_writeconfig',
]);

interface ImportState {
  binds: Map<string, BindEntry>;
  config: ConfigSettings;
  crosshair: CrosshairSettings;
  includes: {
    binds: boolean;
    config: boolean;
    crosshair: boolean;
  };
  seen: Set<string>;
}

interface NumberSpec {
  cvar: string;
  field: string;
  max: number;
  min: number;
  section: ConfigSectionKey;
  step: number;
}

interface BoolSpec {
  cvar: string;
  field: string;
  section: ConfigSectionKey;
}

interface CrosshairNumberSpec {
  cvar: string;
  field: CrosshairField;
  max: number;
  min: number;
  step: number;
}

export interface ImportedAutoexecSlices {
  binds: boolean;
  config: boolean;
  crosshair: boolean;
}

export type ParsedAutoexec =
  | { status: 'empty' }
  | { status: 'too-large' }
  | {
      binds: BindEntry[];
      config: ConfigSettings;
      crosshair: CrosshairSettings;
      includes: ImportedAutoexecSlices;
      status: 'ok';
    };

const CONFIG_NUMBERS: NumberSpec[] = [
  {
    cvar: 'viewmodel_fov',
    field: 'fov',
    max: 68,
    min: 54,
    section: 'viewmodel',
    step: 1,
  },
  {
    cvar: 'viewmodel_offset_x',
    field: 'offsetX',
    max: 2.5,
    min: -2.5,
    section: 'viewmodel',
    step: 0.01,
  },
  {
    cvar: 'viewmodel_offset_y',
    field: 'offsetY',
    max: 2,
    min: -2,
    section: 'viewmodel',
    step: 0.01,
  },
  {
    cvar: 'viewmodel_offset_z',
    field: 'offsetZ',
    max: 2,
    min: -2,
    section: 'viewmodel',
    step: 0.01,
  },
  {
    cvar: 'viewmodel_presetpos',
    field: 'presetPos',
    max: 3,
    min: 0,
    section: 'viewmodel',
    step: 1,
  },
  {
    cvar: 'sensitivity',
    field: 'sensitivity',
    max: 6,
    min: 0.1,
    section: 'mouse',
    step: 0.001,
  },
  {
    cvar: 'zoom_sensitivity_ratio',
    field: 'zoomSensitivityRatio',
    max: 2,
    min: 0.5,
    section: 'mouse',
    step: 0.001,
  },
  {
    cvar: 'cl_radar_scale',
    field: 'scale',
    max: 1,
    min: 0.25,
    section: 'radar',
    step: 0.01,
  },
  {
    cvar: 'cl_hud_radar_scale',
    field: 'hudScale',
    max: 1.3,
    min: 0.8,
    section: 'radar',
    step: 0.01,
  },
  {
    cvar: 'cl_radar_icon_scale_min',
    field: 'iconScaleMin',
    max: 1.25,
    min: 0.4,
    section: 'radar',
    step: 0.01,
  },
  {
    cvar: 'cl_net_buffer_ticks',
    field: 'bufferTicks',
    max: 2,
    min: 0,
    section: 'network',
    step: 1,
  },
  {
    cvar: 'mm_dedicated_search_maxping',
    field: 'maxPing',
    max: 350,
    min: 25,
    section: 'network',
    step: 1,
  },
  {
    cvar: 'volume',
    field: 'master',
    max: 1,
    min: 0,
    section: 'audio',
    step: 0.01,
  },
  {
    cvar: 'snd_voipvolume',
    field: 'voipVolume',
    max: 1,
    min: 0,
    section: 'audio',
    step: 0.01,
  },
  {
    cvar: 'snd_tensecondwarning_volume',
    field: 'tenSecondWarning',
    max: 1,
    min: 0,
    section: 'audio',
    step: 0.01,
  },
  {
    cvar: 'fps_max',
    field: 'fpsMax',
    max: 600,
    min: 0,
    section: 'performance',
    step: 1,
  },
  {
    cvar: 'fps_max_ui',
    field: 'fpsMaxUi',
    max: 240,
    min: 30,
    section: 'performance',
    step: 1,
  },
  {
    cvar: 'cl_hud_color',
    field: 'hudColor',
    max: 12,
    min: 0,
    section: 'hud',
    step: 1,
  },
  {
    cvar: 'hud_scaling',
    field: 'hudScaling',
    max: 0.95,
    min: 0.5,
    section: 'hud',
    step: 0.01,
  },
  {
    cvar: 'cl_teammate_colors_show',
    field: 'teammateColors',
    max: 2,
    min: 0,
    section: 'hud',
    step: 1,
  },
  {
    cvar: 'cl_teamid_overhead_fade_near_crosshair',
    field: 'teamidOverheadFadeNearCrosshair',
    max: 1,
    min: 0,
    section: 'hud',
    step: 0.01,
  },
];

const MUSIC_CVARS = [
  'snd_deathcamera_volume',
  'snd_menumusic_volume',
  'snd_mvp_volume',
  'snd_roundend_volume',
  'snd_roundstart_volume',
] as const;

const CONFIG_BOOLS: BoolSpec[] = [
  {
    cvar: 'cl_prefer_lefthanded',
    field: 'preferLeftHanded',
    section: 'viewmodel',
  },
  {
    cvar: 'cl_radar_always_centered',
    field: 'alwaysCentered',
    section: 'radar',
  },
  { cvar: 'cl_radar_rotate', field: 'rotate', section: 'radar' },
  {
    cvar: 'cl_radar_square_with_scoreboard',
    field: 'squareWithScoreboard',
    section: 'radar',
  },
  {
    cvar: 'snd_mute_losefocus',
    field: 'muteOnFocusLoss',
    section: 'audio',
  },
  {
    cvar: 'r_drawtracers_firstperson',
    field: 'drawTracersFirstPerson',
    section: 'performance',
  },
  { cvar: 'cl_autohelp', field: 'autohelp', section: 'performance' },
  {
    cvar: 'gameinstructor_enable',
    field: 'gameInstructor',
    section: 'performance',
  },
  {
    cvar: 'engine_low_latency_sleep_after_client_tick',
    field: 'lowLatencySleep',
    section: 'performance',
  },
  { cvar: 'cl_showloadout', field: 'showLoadout', section: 'hud' },
  {
    cvar: 'cl_sniper_show_inaccuracy',
    field: 'sniperShowInaccuracy',
    section: 'hud',
  },
  {
    cvar: 'cl_weapon_selection_rarity_color',
    field: 'weaponRarityGlow',
    section: 'hud',
  },
  { cvar: 'r_show_build_info', field: 'showBuildInfo', section: 'hud' },
];

const CROSSHAIR_NUMBERS: CrosshairNumberSpec[] = [
  {
    cvar: 'cl_crosshairstyle',
    field: 'style',
    max: CROSSHAIR_LIMITS.style.max,
    min: CROSSHAIR_LIMITS.style.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshair_length',
    field: 'length',
    max: CROSSHAIR_LIMITS.length.max,
    min: CROSSHAIR_LIMITS.length.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshairsize',
    field: 'length',
    max: CROSSHAIR_LIMITS.length.max,
    min: CROSSHAIR_LIMITS.length.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshair_thickness',
    field: 'thickness',
    max: CROSSHAIR_LIMITS.thickness.max,
    min: CROSSHAIR_LIMITS.thickness.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshairthickness',
    field: 'thickness',
    max: CROSSHAIR_LIMITS.thickness.max,
    min: CROSSHAIR_LIMITS.thickness.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshair_gap',
    field: 'gap',
    max: CROSSHAIR_LIMITS.gap.max,
    min: CROSSHAIR_LIMITS.gap.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshairgap',
    field: 'gap',
    max: CROSSHAIR_LIMITS.gap.max,
    min: CROSSHAIR_LIMITS.gap.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshaircolor_r',
    field: 'red',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshaircolor_g',
    field: 'green',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshaircolor_b',
    field: 'blue',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshaircolor_a',
    field: 'alpha',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshairalpha',
    field: 'alpha',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshair_drawoutline',
    field: 'outlineMode',
    max: CROSSHAIR_LIMITS.outlineMode.max,
    min: CROSSHAIR_LIMITS.outlineMode.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshairoutline_r',
    field: 'outlineRed',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshairoutline_g',
    field: 'outlineGreen',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshairoutline_b',
    field: 'outlineBlue',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshairoutline_a',
    field: 'outlineAlpha',
    max: CHANNEL_MAX,
    min: 0,
    step: 1,
  },
  {
    cvar: 'cl_crosshair_dynamic_spread_limit',
    field: 'dynamicSpreadLimit',
    max: CROSSHAIR_LIMITS.dynamicSpreadLimit.max,
    min: CROSSHAIR_LIMITS.dynamicSpreadLimit.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshair_dynamic_splitdist',
    field: 'splitDistance',
    max: CROSSHAIR_LIMITS.splitDistance.max,
    min: CROSSHAIR_LIMITS.splitDistance.min,
    step: 1,
  },
  {
    cvar: 'cl_crosshair_dynamic_splitalpha_innermod',
    field: 'innerSplitAlpha',
    max: CROSSHAIR_LIMITS.innerSplitAlpha.max,
    min: CROSSHAIR_LIMITS.innerSplitAlpha.min,
    step: 0.01,
  },
  {
    cvar: 'cl_crosshair_dynamic_splitalpha_outermod',
    field: 'outerSplitAlpha',
    max: CROSSHAIR_LIMITS.outerSplitAlpha.max,
    min: CROSSHAIR_LIMITS.outerSplitAlpha.min,
    step: 0.01,
  },
  {
    cvar: 'cl_crosshair_dynamic_maxdist_splitratio',
    field: 'splitSizeRatio',
    max: CROSSHAIR_LIMITS.splitSizeRatio.max,
    min: CROSSHAIR_LIMITS.splitSizeRatio.min,
    step: 0.01,
  },
  {
    cvar: 'cl_ironsight_dot_scale',
    field: 'scopeDotScale',
    max: CROSSHAIR_LIMITS.scopeDotScale.max,
    min: CROSSHAIR_LIMITS.scopeDotScale.min,
    step: 0.01,
  },
  {
    cvar: 'cl_crosshair_screen_height',
    field: 'screenHeight',
    max: CROSSHAIR_LIMITS.screenHeight.max,
    min: CROSSHAIR_LIMITS.screenHeight.min,
    step: 1,
  },
];

const CROSSHAIR_BOOLS: { cvar: string; field: CrosshairField }[] = [
  { cvar: 'cl_crosshairdot', field: 'centerDotEnabled' },
  { cvar: 'cl_crosshair_t', field: 'tStyleEnabled' },
  { cvar: 'cl_crosshair_recoil', field: 'followRecoil' },
  {
    cvar: 'cl_ironsight_usecrosshaircolor',
    field: 'scopeDotUsesCrosshairColor',
  },
];

type CvarApply = (state: ImportState, raw: string, cvar: string) => void;

const CVAR_APPLY: Record<string, CvarApply> = {};

for (const spec of CONFIG_NUMBERS) {
  CVAR_APPLY[spec.cvar] = (state, raw, cvar) => {
    const value = readRange(raw, spec.min, spec.max, spec.step);
    if (value === null) {
      return;
    }
    writeConfig(state, spec.section, spec.field, value, cvar);
  };
}

for (const cvar of MUSIC_CVARS) {
  CVAR_APPLY[cvar] = (state, raw, name) => {
    const value = readRange(raw, 0, 1, 0.01);
    if (value === null) {
      return;
    }
    writeConfig(state, 'audio', 'musicVolume', value, name);
  };
}

CVAR_APPLY.rate = (state, raw, cvar) => {
  const value = readNumber(raw);
  if (value === null) {
    return;
  }
  writeConfig(state, 'network', 'rate', nearestRate(value), cvar);
};

for (const spec of CONFIG_BOOLS) {
  CVAR_APPLY[spec.cvar] = (state, raw, cvar) => {
    const value = readBool(raw);
    if (value === null) {
      return;
    }
    writeConfig(state, spec.section, spec.field, value, cvar);
  };
}

for (const spec of CROSSHAIR_NUMBERS) {
  CVAR_APPLY[spec.cvar] = (state, raw, cvar) => {
    const value = readRange(raw, spec.min, spec.max, spec.step);
    if (value === null) {
      return;
    }
    state.crosshair = { ...state.crosshair, [spec.field]: value };
    state.includes.crosshair = true;
    state.seen.add(cvar);
  };
}

for (const spec of CROSSHAIR_BOOLS) {
  CVAR_APPLY[spec.cvar] = (state, raw, cvar) => {
    const value = readBool(raw);
    if (value === null) {
      return;
    }
    state.crosshair = { ...state.crosshair, [spec.field]: value };
    state.includes.crosshair = true;
    state.seen.add(cvar);
  };
}

export function parseAutoexec(text: string): ParsedAutoexec {
  if (text.length > MAX_AUTOEXEC_CHARS) {
    return { status: 'too-large' };
  }

  const state = createState();
  applyShareCode(state, text);
  walkCfg(state, text);
  finishCrosshair(state);

  if (
    !(state.includes.binds || state.includes.config || state.includes.crosshair)
  ) {
    return { status: 'empty' };
  }

  return {
    binds: [...state.binds.values()],
    config: {
      ...state.config,
      enabledRecommendations: matchingRecommendations(state),
    },
    crosshair: state.crosshair,
    includes: state.includes,
    status: 'ok',
  };
}

function createState(): ImportState {
  return {
    binds: new Map(),
    config: {
      audio: { ...DEFAULT_CONFIG.audio },
      enabledRecommendations: [],
      hud: { ...DEFAULT_CONFIG.hud },
      mouse: { ...DEFAULT_CONFIG.mouse },
      network: { ...DEFAULT_CONFIG.network },
      performance: { ...DEFAULT_CONFIG.performance },
      radar: { ...DEFAULT_CONFIG.radar },
      viewmodel: { ...DEFAULT_CONFIG.viewmodel },
    },
    crosshair: { ...DEFAULT_CROSSHAIR },
    includes: { binds: false, config: false, crosshair: false },
    seen: new Set(),
  };
}

function applyShareCode(state: ImportState, text: string): void {
  let shareCode: string | null = null;
  for (const line of text.split(LINE_SPLIT)) {
    const found = SHARE_CODE_COMMENT.exec(line)?.groups?.code;
    if (found) {
      shareCode = found;
    }
  }

  if (!shareCode) {
    return;
  }

  try {
    state.crosshair = decodeShareCodeDetailed(shareCode).crosshair;
    state.includes.crosshair = true;
  } catch {
    // The comment is not a usable code. Later cvar lines can still apply.
  }
}

function walkCfg(state: ImportState, text: string): void {
  const source = text.replace(BOM, '');
  for (const line of source.split(LINE_SPLIT)) {
    const code = stripCfgComment(line);
    for (const statement of splitCfgStatements(code)) {
      const tokens = tokenizeCfgStatement(statement);
      if (tokens.length === 0) {
        continue;
      }
      applyStatement(state, tokens);
    }
  }
}

function applyStatement(state: ImportState, tokens: string[]): void {
  const [commandRaw, raw] = tokens;
  const command = commandRaw?.toLowerCase();
  if (!command || IGNORED_COMMANDS.has(command)) {
    return;
  }

  if (command === 'unbindall') {
    state.binds.clear();
    state.includes.binds = true;
    return;
  }

  if (command === 'unbind') {
    const key = raw ? normalizeBindKey(raw) : null;
    if (!key) {
      return;
    }
    state.binds.delete(key);
    state.includes.binds = true;
    return;
  }

  if (command === 'bind') {
    applyBind(state, tokens);
    return;
  }

  const apply = CVAR_APPLY[command];
  if (!(apply && raw)) {
    return;
  }

  apply(state, raw, command);
}

function applyBind(state: ImportState, tokens: string[]): void {
  const [, rawKey, ...commandParts] = tokens;
  const key = rawKey ? normalizeBindKey(rawKey) : null;
  if (!key) {
    return;
  }

  const command = sanitizeBindCommand(commandParts.join(' ')).slice(
    0,
    MAX_COMMAND_LENGTH
  );
  state.includes.binds = true;

  if (!command) {
    state.binds.delete(key);
    return;
  }

  const existing = state.binds.get(key);
  if (!existing && state.binds.size >= MAX_BINDS) {
    return;
  }

  state.binds.set(key, {
    command,
    id: existing?.id ?? `import-${key}`,
    key,
  });
}

function finishCrosshair(state: ImportState): void {
  if (allowsNegativeCrosshairGap(state.crosshair.style)) {
    return;
  }

  state.crosshair = {
    ...state.crosshair,
    gap: Math.max(0, state.crosshair.gap),
  };
}

function matchingRecommendations(state: ImportState): string[] {
  const chosen: { category: string; id: string }[] = [];

  for (const template of RECOMMENDED_CONFIG_TEMPLATES) {
    const touched = template.commands.some((command) => {
      const name = command.trim().split(COMMAND_SPLIT)[0]?.toLowerCase();
      return name ? state.seen.has(name) : false;
    });
    if (!(touched && patchMatches(state.config, template.patch))) {
      continue;
    }

    if (EXCLUSIVE_CATEGORIES.has(template.category)) {
      const index = chosen.findIndex(
        (item) => item.category === template.category
      );
      if (index >= 0) {
        chosen.splice(index, 1);
      }
    }

    chosen.push({ category: template.category, id: template.id });
  }

  return chosen.map((template) => template.id);
}

function patchMatches(config: ConfigSettings, patch: ConfigPatch): boolean {
  for (const section of Object.keys(patch) as (keyof ConfigPatch)[]) {
    const fields = patch[section];
    if (!fields) {
      continue;
    }

    const current = config[section];
    for (const field of Object.keys(fields)) {
      const key = field as keyof typeof fields;
      if (current[key] !== fields[key]) {
        return false;
      }
    }
  }

  return true;
}

function writeConfig(
  state: ImportState,
  section: ConfigSectionKey,
  field: string,
  value: boolean | number,
  cvar: string
): void {
  const current = state.config[section] as unknown as Record<
    string,
    boolean | number
  >;
  state.config = {
    ...state.config,
    [section]: { ...current, [field]: value },
  };
  state.includes.config = true;
  state.seen.add(cvar);
}

function readNumber(raw: string): number | null {
  if (!NUMBER_TOKEN.test(raw)) {
    return null;
  }

  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function readRange(
  raw: string,
  min: number,
  max: number,
  step: number
): number | null {
  const value = readNumber(raw);
  if (value === null) {
    return null;
  }

  return clampStep(value, min, max, step);
}

function readBool(raw: string): boolean | null {
  const lower = raw.toLowerCase();
  if (lower === '1' || lower === 'true' || lower === 'yes') {
    return true;
  }
  if (lower === '0' || lower === 'false' || lower === 'no') {
    return false;
  }
  return null;
}

function clampStep(
  value: number,
  min: number,
  max: number,
  step: number
): number {
  const clamped = Math.min(max, Math.max(min, value));
  const steps = Math.round((clamped - min) / step);
  const snapped = min + steps * step;
  const decimals = (step.toString().split('.')[1] ?? '').length;
  return Number(snapped.toFixed(decimals));
}

function nearestRate(value: number): number {
  let best: number = RATE_OPTIONS[0];
  let bestDistance = Math.abs(value - best);

  for (const option of RATE_OPTIONS) {
    const distance = Math.abs(value - option);
    if (distance < bestDistance) {
      best = option;
      bestDistance = distance;
    }
  }

  return best;
}
