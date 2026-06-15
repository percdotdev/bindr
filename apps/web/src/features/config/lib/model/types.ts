export interface ViewmodelSettings {
  fov: number;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
}

export interface ConfigSettings {
  viewmodel: ViewmodelSettings;
}

export type ViewmodelField = keyof ViewmodelSettings;

export interface ViewmodelPreset {
  description: string;
  id: string;
  label: string;
  viewmodel: ViewmodelSettings;
}
