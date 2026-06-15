export interface ViewmodelSettings {
  /** cl_bobamt_lat — lateral weapon bob */
  bobLat: number;
  /** cl_bob_lower_amt — how far the viewmodel dips when running */
  bobLowerAmt: number;
  /** cl_bobamt_vert — vertical weapon bob */
  bobVert: number;
  fov: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  presetPos: number;
  /** cl_righthand — 1 right-handed, 0 left-handed */
  rightHand: boolean;
}

export interface MouseSettings {
  /** m_rawinput — bypass OS mouse acceleration */
  rawInput: boolean;
  sensitivity: number;
  /** zoom_sensitivity_ratio — scoped sensitivity multiplier */
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
  cmdrate: number;
  interp: number;
  interpRatio: number;
  maxPing: number;
  rate: number;
  updaterate: number;
}

export interface AudioSettings {
  /** volume — master volume (0–1) */
  master: number;
  /** applies to round start/end, MVP, menu and death-cam music (0–1) */
  musicVolume: number;
  /** snd_mute_losefocus — mute when alt-tabbed */
  muteOnFocusLoss: boolean;
  /** snd_tensecondwarning_volume — bomb timer beep (0–1) */
  tenSecondWarning: number;
  /** voice_scale — teammate voice volume (0–1) */
  voiceScale: number;
}

export interface PerformanceSettings {
  /** cl_animate_player_models — animate models in menus */
  animatePlayerModels: boolean;
  autohelp: boolean;
  /** mat_disable_bloom — disable bloom/glow */
  disableBloom: boolean;
  disableFreezeCam: boolean;
  drawTracersFirstPerson: boolean;
  /** r_dynamic — dynamic lighting (off boosts FPS) */
  dynamicLight: boolean;
  /** cl_forcepreload — preload assets at map load */
  forcePreload: boolean;
  fpsMax: number;
  fpsMaxUi: number;
  gameInstructor: boolean;
  lowLatencySleep: boolean;
  /** mat_queue_mode — multicore rendering (true = 2, false = -1 auto) */
  multicore: boolean;
  showHelp: boolean;
}

export interface HudSettings {
  /** cl_hud_bomb_under_radar — place bomb icon under the radar */
  bombUnderRadar: boolean;
  /** cl_hud_healthammo_style — 0 default, 1 simple */
  healthAmmoStyle: number;
  /** cl_hud_color — accent color (0–10) */
  hudColor: number;
  /** hud_scaling — overall HUD size (0.5–0.95) */
  hudScaling: number;
  /** r_show_build_info — version/debug text in corner */
  showBuildInfo: boolean;
  /** cl_showloadout — always show the weapon loadout panel */
  showLoadout: boolean;
  /** cl_teamid_overhead_fade_near_crosshair (0.75–1) */
  teamidOverheadFadeNearCrosshair: number;
  /** cl_teammate_colors_show — 0 off, 1 colors, 2 colors + letters */
  teammateColors: number;
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
