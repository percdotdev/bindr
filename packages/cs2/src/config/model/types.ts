export interface ViewmodelSettings {
  fov: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  /** `cl_prefer_lefthanded` — CS2 replacement for removed `cl_righthand`. */
  preferLeftHanded: boolean;
  /**
   * `viewmodel_presetpos` — 0 custom (honours offsets), 1 desktop, 2 couch,
   * 3 classic. Presets 1–3 override the offset cvars.
   */
  presetPos: number;
}

export interface MouseSettings {
  sensitivity: number;
  /** `zoom_sensitivity_ratio` — scoped sensitivity multiplier */
  zoomSensitivityRatio: number;
}

export interface RadarSettings {
  alwaysCentered: boolean;
  hudScale: number;
  iconScaleMin: number;
  rotate: boolean;
  scale: number;
  squareWithScoreboard: boolean;
}

export interface NetworkSettings {
  /** `cl_net_buffer_ticks` — 0 / 1 / 2. Drives interp; do not set cl_interp*. */
  bufferTicks: number;
  maxPing: number;
  rate: number;
}

export interface AudioSettings {
  /** `volume` — master volume (0–1) */
  master: number;
  /** applies to round start/end, MVP, menu and death-cam music (0–1) */
  musicVolume: number;
  /**
   * `snd_mute_losefocus`. True mutes when CS2 loses focus.
   * The settings switch is the inverse: play game audio in the background.
   */
  muteOnFocusLoss: boolean;
  /** `snd_tensecondwarning_volume` — bomb timer beep (0–1) */
  tenSecondWarning: number;
  /** `snd_voipvolume` — teammate voice volume (0–1) */
  voipVolume: number;
}

export interface PerformanceSettings {
  autohelp: boolean;
  drawTracersFirstPerson: boolean;
  fpsMax: number;
  fpsMaxUi: number;
  gameInstructor: boolean;
  lowLatencySleep: boolean;
}

export interface HudSettings {
  /**
   * `cl_hud_color` — 0 team, 1 white, 2 bright white, 3 light blue, 4 blue,
   * 5 purple, 6 red, 7 orange, 8 yellow, 9 green, 10 aqua, 11 pink,
   * 12 teammate.
   */
  hudColor: number;
  /** `hud_scaling` — overall HUD size (0.5–0.95) */
  hudScaling: number;
  /** `r_show_build_info` — version/debug text in corner */
  showBuildInfo: boolean;
  /** `cl_showloadout` — always show the weapon loadout panel */
  showLoadout: boolean;
  /**
   * `cl_sniper_show_inaccuracy` — moving spread circle on AWP/SSG 08.
   * Off restores the pre–Oct 2025 static overlay.
   */
  sniperShowInaccuracy: boolean;
  /** `cl_teamid_overhead_fade_near_crosshair` (0–1, 0 = off) */
  teamidOverheadFadeNearCrosshair: number;
  /** `cl_teammate_colors_show` — 0 off, 1 colors, 2 colors + letters */
  teammateColors: number;
  /**
   * `cl_weapon_selection_rarity_color` — weapon slot glow uses skin rarity.
   * Off by default.
   */
  weaponRarityGlow: boolean;
}

export interface ConfigSettings {
  audio: AudioSettings;
  enabledRecommendations: string[];
  hud: HudSettings;
  mouse: MouseSettings;
  network: NetworkSettings;
  performance: PerformanceSettings;
  radar: RadarSettings;
  viewmodel: ViewmodelSettings;
}

export type ViewmodelField = keyof ViewmodelSettings;

export type ConfigCategory =
  | 'audio'
  | 'hud'
  | 'mouse'
  | 'network'
  | 'performance'
  | 'radar'
  | 'viewmodel';

/** Setting sections that hold cvar values (excludes enabledRecommendations). */
export type ConfigSectionKey =
  | 'audio'
  | 'hud'
  | 'mouse'
  | 'network'
  | 'performance'
  | 'radar'
  | 'viewmodel';

export interface ViewmodelPreset {
  description: string;
  id: string;
  label: string;
  source: string;
  viewmodel: ViewmodelSettings;
}

export interface ConfigPatch {
  audio?: Partial<AudioSettings>;
  hud?: Partial<HudSettings>;
  mouse?: Partial<MouseSettings>;
  network?: Partial<NetworkSettings>;
  performance?: Partial<PerformanceSettings>;
  radar?: Partial<RadarSettings>;
  viewmodel?: Partial<ViewmodelSettings>;
}

export interface RecommendedConfigTemplate {
  category: ConfigCategory;
  commands: string[];
  description: string;
  id: string;
  label: string;
  mmSafe: boolean;
  patch: ConfigPatch;
  source: string;
}
