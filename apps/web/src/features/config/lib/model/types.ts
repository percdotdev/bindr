export interface ViewmodelSettings {
  fov: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  presetPos: number;
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

export interface PerformanceSettings {
  autohelp: boolean;
  disableFreezeCam: boolean;
  drawTracersFirstPerson: boolean;
  fpsMax: number;
  fpsMaxUi: number;
  gameInstructor: boolean;
  lowLatencySleep: boolean;
  showHelp: boolean;
}

export interface ConfigSettings {
  enabledRecommendations: string[];
  network: NetworkSettings;
  performance: PerformanceSettings;
  radar: RadarSettings;
  viewmodel: ViewmodelSettings;
}

export type ViewmodelField = keyof ViewmodelSettings;

export type ConfigCategory = 'network' | 'performance' | 'radar' | 'viewmodel';

export interface ViewmodelPreset {
  description: string;
  id: string;
  label: string;
  source: string;
  viewmodel: ViewmodelSettings;
}

export interface ConfigPatch {
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
