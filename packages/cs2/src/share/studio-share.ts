import { sanitizeBindCommand } from '@workspace/cs2/binds/model/bind-command';
import type { BindCategory, BindEntry } from '@workspace/cs2/binds/model/types';
import { BIND_CATEGORY_ORDER } from '@workspace/cs2/binds/recommended/categories';
import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type { ConfigSettings } from '@workspace/cs2/config/model/types';
import { DEFAULT_CROSSHAIR } from '@workspace/cs2/crosshair/model/default-crosshair';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';

import {
  CONFIG_SHARE_SECTIONS,
  type ConfigShareSection,
  type StudioSelection,
  type StudioSlice,
} from './studio-slices';

const MAX_BINDS = 128;
const MAX_COMMAND_LENGTH = 400;
const MAX_TEXT_LENGTH = 160;
const BIND_KEY_PATTERN = /^[\u0021-\u007e]{1,32}$/u;

const BIND_CATEGORIES = new Set<BindCategory>(BIND_CATEGORY_ORDER);

export interface StudioSnapshot {
  binds: BindEntry[];
  config: ConfigSettings;
  crosshair: CrosshairSettings;
}

/** Decoded link. A present key is part of the share, even when the list is empty. */
export interface StudioShare {
  binds?: BindEntry[];
  config: Partial<Pick<ConfigSettings, ConfigShareSection>>;
  crosshair?: CrosshairSettings;
}

interface StudioShareWire {
  b?: BindEntry[];
  c?: Partial<
    Record<ConfigShareSection, Partial<ConfigSettings[ConfigShareSection]>>
  >;
  v: 1;
  x?: Partial<CrosshairSettings>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function diffFields<T extends object>(value: T, defaults: T): Partial<T> {
  const diff: Partial<T> = {};
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    if (value[key] !== defaults[key]) {
      diff[key] = value[key];
    }
  }
  return diff;
}

function expandFields<T extends object>(value: unknown, defaults: T): T | null {
  if (!isRecord(value)) {
    return null;
  }

  const next = { ...defaults };
  for (const key of Object.keys(defaults) as (keyof T)[]) {
    if (!Object.hasOwn(value, key)) {
      continue;
    }

    const incoming = value[key as string];
    if (typeof incoming !== typeof defaults[key]) {
      return null;
    }

    if (typeof incoming === 'number' && !Number.isFinite(incoming)) {
      return null;
    }

    next[key] = incoming as T[keyof T];
  }

  return next;
}

function clipText(value: string): string {
  return value.trim().slice(0, MAX_TEXT_LENGTH);
}

function toWireBind(bind: BindEntry): BindEntry | null {
  const command = sanitizeBindCommand(bind.command).slice(
    0,
    MAX_COMMAND_LENGTH
  );
  if (!(command && BIND_KEY_PATTERN.test(bind.key)) || bind.key.includes('"')) {
    return null;
  }

  const wire: BindEntry = {
    command,
    id: bind.id.slice(0, MAX_TEXT_LENGTH) || `bind-${bind.key}`,
    key: bind.key,
  };

  if (bind.category && BIND_CATEGORIES.has(bind.category)) {
    wire.category = bind.category;
  }

  if (bind.label) {
    const label = clipText(bind.label);
    if (label) {
      wire.label = label;
    }
  }

  if (bind.description) {
    const description = clipText(bind.description);
    if (description) {
      wire.description = description;
    }
  }

  if (typeof bind.mmSafe === 'boolean') {
    wire.mmSafe = bind.mmSafe;
  }

  return wire;
}

function parseBind(value: unknown): BindEntry | null {
  if (!isRecord(value)) {
    return null;
  }

  if (typeof value.key !== 'string' || typeof value.command !== 'string') {
    return null;
  }

  const command = sanitizeBindCommand(value.command).slice(
    0,
    MAX_COMMAND_LENGTH
  );
  if (
    !(command && BIND_KEY_PATTERN.test(value.key)) ||
    value.key.includes('"')
  ) {
    return null;
  }

  const bind: BindEntry = {
    command,
    id:
      typeof value.id === 'string' && value.id.trim()
        ? value.id.trim().slice(0, MAX_TEXT_LENGTH)
        : `bind-${value.key}`,
    key: value.key,
  };

  if (
    typeof value.category === 'string' &&
    BIND_CATEGORIES.has(value.category as BindCategory)
  ) {
    bind.category = value.category as BindCategory;
  }

  if (typeof value.label === 'string') {
    const label = clipText(value.label);
    if (label) {
      bind.label = label;
    }
  }

  if (typeof value.description === 'string') {
    const description = clipText(value.description);
    if (description) {
      bind.description = description;
    }
  }

  if (typeof value.mmSafe === 'boolean') {
    bind.mmSafe = value.mmSafe;
  }

  return bind;
}

function parseBinds(value: unknown): BindEntry[] | null {
  if (!Array.isArray(value) || value.length > MAX_BINDS) {
    return null;
  }

  const byKey = new Map<string, BindEntry>();
  for (const item of value) {
    const bind = parseBind(item);
    if (!bind) {
      return null;
    }
    byKey.set(bind.key, bind);
  }

  return [...byKey.values()];
}

export function pickStudioShare(
  snapshot: StudioSnapshot,
  selection: StudioSelection
): StudioShareWire | null {
  if (selection.binds && snapshot.binds.length > MAX_BINDS) {
    return null;
  }

  const wire: StudioShareWire = { v: 1 };

  if (selection.crosshair) {
    wire.x = diffFields(snapshot.crosshair, DEFAULT_CROSSHAIR);
  }

  if (selection.binds) {
    const binds: BindEntry[] = [];
    for (const bind of snapshot.binds) {
      const wireBind = toWireBind(bind);
      if (wireBind) {
        binds.push(wireBind);
      }
    }
    wire.b = binds;
  }

  const config: NonNullable<StudioShareWire['c']> = {};
  let hasConfig = false;
  for (const section of CONFIG_SHARE_SECTIONS) {
    if (!selection[section]) {
      continue;
    }
    config[section] = diffFields(
      snapshot.config[section],
      DEFAULT_CONFIG[section]
    );
    hasConfig = true;
  }

  if (hasConfig) {
    wire.c = config;
  }

  return wire;
}

function takeSection<K extends ConfigShareSection>(
  raw: Record<string, unknown>,
  section: K
): ConfigSettings[K] | null {
  return expandFields(raw[section], DEFAULT_CONFIG[section]);
}

function writeSection(
  config: StudioShare['config'],
  section: ConfigShareSection,
  raw: Record<string, unknown>
): boolean {
  switch (section) {
    case 'audio': {
      const value = takeSection(raw, 'audio');
      if (!value) {
        return false;
      }
      config.audio = value;
      return true;
    }
    case 'hud': {
      const value = takeSection(raw, 'hud');
      if (!value) {
        return false;
      }
      config.hud = value;
      return true;
    }
    case 'mouse': {
      const value = takeSection(raw, 'mouse');
      if (!value) {
        return false;
      }
      config.mouse = value;
      return true;
    }
    case 'network': {
      const value = takeSection(raw, 'network');
      if (!value) {
        return false;
      }
      config.network = value;
      return true;
    }
    case 'performance': {
      const value = takeSection(raw, 'performance');
      if (!value) {
        return false;
      }
      config.performance = value;
      return true;
    }
    case 'radar': {
      const value = takeSection(raw, 'radar');
      if (!value) {
        return false;
      }
      config.radar = value;
      return true;
    }
    case 'viewmodel': {
      const value = takeSection(raw, 'viewmodel');
      if (!value) {
        return false;
      }
      config.viewmodel = value;
      return true;
    }
    default:
      return false;
  }
}

export function parseStudioShare(value: unknown): StudioShare | null {
  if (!isRecord(value) || value.v !== 1) {
    return null;
  }

  const share: StudioShare = { config: {} };

  if ('x' in value) {
    const crosshair = expandFields(value.x, DEFAULT_CROSSHAIR);
    if (!crosshair) {
      return null;
    }
    share.crosshair = crosshair;
  }

  if ('b' in value) {
    const binds = parseBinds(value.b);
    if (!binds) {
      return null;
    }
    share.binds = binds;
  }

  if ('c' in value) {
    if (!isRecord(value.c)) {
      return null;
    }

    for (const section of CONFIG_SHARE_SECTIONS) {
      if (!(section in value.c)) {
        continue;
      }
      if (!writeSection(share.config, section, value.c)) {
        return null;
      }
    }
  }

  if (slicesInShare(share).length === 0) {
    return null;
  }

  return share;
}

export function slicesInShare(share: StudioShare): StudioSlice[] {
  const slices: StudioSlice[] = [];
  if (share.crosshair) {
    slices.push('crosshair');
  }
  if (share.binds !== undefined) {
    slices.push('binds');
  }
  for (const section of CONFIG_SHARE_SECTIONS) {
    if (share.config[section]) {
      slices.push(section);
    }
  }
  return slices;
}

function copySelectedSection(
  config: ConfigSettings,
  section: ConfigShareSection,
  source: StudioShare['config']
) {
  switch (section) {
    case 'audio':
      if (source.audio) {
        config.audio = source.audio;
      }
      return;
    case 'hud':
      if (source.hud) {
        config.hud = source.hud;
      }
      return;
    case 'mouse':
      if (source.mouse) {
        config.mouse = source.mouse;
      }
      return;
    case 'network':
      if (source.network) {
        config.network = source.network;
      }
      return;
    case 'performance':
      if (source.performance) {
        config.performance = source.performance;
      }
      return;
    case 'radar':
      if (source.radar) {
        config.radar = source.radar;
      }
      return;
    case 'viewmodel':
      if (source.viewmodel) {
        config.viewmodel = source.viewmodel;
      }
      return;
    default:
      return;
  }
}

export function applyStudioShare(
  current: StudioSnapshot,
  share: StudioShare,
  selection: StudioSelection
): StudioSnapshot {
  const config: ConfigSettings = { ...current.config };
  for (const section of CONFIG_SHARE_SECTIONS) {
    if (selection[section]) {
      copySelectedSection(config, section, share.config);
    }
  }

  return {
    binds:
      selection.binds && share.binds !== undefined
        ? share.binds
        : current.binds,
    config,
    crosshair:
      selection.crosshair && share.crosshair
        ? share.crosshair
        : current.crosshair,
  };
}
