import type {
  AudioSettings,
  ConfigSettings,
  HudSettings,
  MouseSettings,
  NetworkSettings,
  PerformanceSettings,
  RadarSettings,
  ViewmodelSettings,
} from '@workspace/cs2/config/model/types';

/** Valve defaults from the current CS2 client cvar dump. */
export const DEFAULT_VIEWMODEL: ViewmodelSettings = {
  fov: 60,
  offsetX: 2.5,
  offsetY: 0,
  offsetZ: -1.5,
  preferLeftHanded: false,
  presetPos: 1,
};

export const DEFAULT_MOUSE: MouseSettings = {
  sensitivity: 2.5,
  zoomSensitivityRatio: 1,
};

export const DEFAULT_RADAR: RadarSettings = {
  alwaysCentered: true,
  hudScale: 1,
  iconScaleMin: 0.6,
  rotate: true,
  scale: 0.7,
  squareWithScoreboard: true,
};

export const DEFAULT_NETWORK: NetworkSettings = {
  bufferTicks: 0,
  maxPing: 150,
  rate: 786_432,
};

export const DEFAULT_AUDIO: AudioSettings = {
  master: 1,
  musicVolume: 0.04,
  muteOnFocusLoss: true,
  tenSecondWarning: 0.05,
  voipVolume: 1,
};

export const DEFAULT_PERFORMANCE: PerformanceSettings = {
  autohelp: true,
  drawTracersFirstPerson: true,
  fpsMax: 400,
  fpsMaxUi: 120,
  gameInstructor: false,
  lowLatencySleep: false,
};

/** Stock HUD — build info visible; teamid fade at the engine default. */
export const DEFAULT_HUD: HudSettings = {
  hudColor: 0,
  hudScaling: 0.85,
  showBuildInfo: true,
  showLoadout: true,
  sniperShowInaccuracy: true,
  teamidOverheadFadeNearCrosshair: 0.5,
  teammateColors: 1,
  weaponRarityGlow: false,
};

export const DEFAULT_CONFIG: ConfigSettings = {
  audio: DEFAULT_AUDIO,
  enabledRecommendations: [],
  hud: DEFAULT_HUD,
  mouse: DEFAULT_MOUSE,
  network: DEFAULT_NETWORK,
  performance: DEFAULT_PERFORMANCE,
  radar: DEFAULT_RADAR,
  viewmodel: DEFAULT_VIEWMODEL,
};
