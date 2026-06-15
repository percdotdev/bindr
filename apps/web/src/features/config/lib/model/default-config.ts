import type {
  ConfigSettings,
  ViewmodelSettings,
} from '@/features/config/lib/model/types';

export const DEFAULT_VIEWMODEL: ViewmodelSettings = {
  fov: 68,
  offsetX: 2.5,
  offsetY: 0,
  offsetZ: -1.5,
};

export const DEFAULT_CONFIG: ConfigSettings = {
  viewmodel: DEFAULT_VIEWMODEL,
};
