import type {
  AudioSettings,
  ConfigSettings,
  HudSettings,
  MouseSettings,
  NetworkSettings,
  PerformanceSettings,
  RadarSettings,
  ViewmodelSettings,
} from '@/features/config/lib/model/types';

/** Valve defaults from csdb.gg command reference. */
export const DEFAULT_VIEWMODEL: ViewmodelSettings = {
  fov: 60,
  offsetX: 2.5,
  offsetY: 0,
  offsetZ: -1.5,
  presetPos: 1,
  rightHand: true,
  bobLat: 0.4,
  bobVert: 0.25,
  bobLowerAmt: 21,
};

export const DEFAULT_MOUSE: MouseSettings = {
  sensitivity: 2.5,
  zoomSensitivityRatio: 1,
  rawInput: true,
};

export const DEFAULT_RADAR: RadarSettings = {
  scale: 0.7,
  hudScale: 1,
  alwaysCentered: true,
  rotate: true,
  iconScaleMin: 0.6,
  squareWithScoreboard: true,
};

export const DEFAULT_NETWORK: NetworkSettings = {
  rate: 786_432,
  interpRatio: 2,
  interp: 0.031_25,
  updaterate: 128,
  cmdrate: 128,
  maxPing: 150,
};

export const DEFAULT_AUDIO: AudioSettings = {
  master: 1,
  voiceScale: 1,
  muteOnFocusLoss: true,
  musicVolume: 0.04,
  tenSecondWarning: 0.05,
};

export const DEFAULT_PERFORMANCE: PerformanceSettings = {
  fpsMax: 400,
  fpsMaxUi: 120,
  drawTracersFirstPerson: true,
  autohelp: true,
  gameInstructor: true,
  showHelp: true,
  disableFreezeCam: false,
  lowLatencySleep: false,
  dynamicLight: true,
  forcePreload: false,
  multicore: false,
  animatePlayerModels: true,
  disableBloom: false,
};

/** Stock HUD — build info visible; teamid fade at minimum in allowed range. */
export const DEFAULT_HUD: HudSettings = {
  showBuildInfo: true,
  teamidOverheadFadeNearCrosshair: 0.75,
  hudColor: 0,
  hudScaling: 0.85,
  teammateColors: 1,
  healthAmmoStyle: 0,
  showLoadout: true,
  bombUnderRadar: false,
};

export const DEFAULT_CONFIG: ConfigSettings = {
  viewmodel: DEFAULT_VIEWMODEL,
  mouse: DEFAULT_MOUSE,
  radar: DEFAULT_RADAR,
  network: DEFAULT_NETWORK,
  audio: DEFAULT_AUDIO,
  performance: DEFAULT_PERFORMANCE,
  hud: DEFAULT_HUD,
  enabledRecommendations: [],
};
