import type {
  ConfigSettings,
  HudSettings,
  NetworkSettings,
  PerformanceSettings,
  RadarSettings,
  ViewmodelSettings,
} from '@/features/config/lib/model/types';

/** Valve defaults from csdb.gg command reference (viewmodel + radar + network). */
export const DEFAULT_VIEWMODEL: ViewmodelSettings = {
  fov: 60,
  offsetX: 2.5,
  offsetY: 0,
  offsetZ: -1.5,
  presetPos: 1,
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

export const DEFAULT_PERFORMANCE: PerformanceSettings = {
  fpsMax: 400,
  fpsMaxUi: 120,
  drawTracersFirstPerson: true,
  autohelp: true,
  gameInstructor: true,
  showHelp: true,
  disableFreezeCam: false,
  lowLatencySleep: false,
};

/** Stock HUD — build info visible; teamid fade at minimum in allowed range. */
export const DEFAULT_HUD: HudSettings = {
  showBuildInfo: true,
  teamidOverheadFadeNearCrosshair: 0.75,
};

export const DEFAULT_CONFIG: ConfigSettings = {
  viewmodel: DEFAULT_VIEWMODEL,
  radar: DEFAULT_RADAR,
  network: DEFAULT_NETWORK,
  performance: DEFAULT_PERFORMANCE,
  hud: DEFAULT_HUD,
  enabledRecommendations: [],
};
