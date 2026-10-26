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
  presetPos: 1,
  preferLeftHanded: false,
};

export const DEFAULT_MOUSE: MouseSettings = {
  sensitivity: 2.5,
  zoomSensitivityRatio: 1,
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
  bufferTicks: 0,
  maxPing: 150,
};

export const DEFAULT_AUDIO: AudioSettings = {
  master: 1,
  voipVolume: 1,
  muteOnFocusLoss: true,
  musicVolume: 0.04,
  tenSecondWarning: 0.05,
};

export const DEFAULT_PERFORMANCE: PerformanceSettings = {
  fpsMax: 400,
  fpsMaxUi: 120,
  drawTracersFirstPerson: true,
  autohelp: true,
  gameInstructor: false,
  lowLatencySleep: false,
};

/** Stock HUD — build info visible; teamid fade at the engine default. */
export const DEFAULT_HUD: HudSettings = {
  showBuildInfo: true,
  teamidOverheadFadeNearCrosshair: 0.5,
  hudColor: 0,
  hudScaling: 0.85,
  teammateColors: 1,
  showLoadout: true,
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
