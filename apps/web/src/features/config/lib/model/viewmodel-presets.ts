import { DEFAULT_VIEWMODEL } from '@/features/config/lib/model/default-config';
import type { ViewmodelPreset } from '@/features/config/lib/model/types';

export const VIEWMODEL_PRESETS: ViewmodelPreset[] = [
  {
    id: 'classic',
    label: 'Classic',
    description: 'Default CS2 viewmodel — lower FOV, centered weapon.',
    viewmodel: {
      fov: 60,
      offsetX: 1,
      offsetY: 1,
      offsetZ: -1,
    },
  },
  {
    id: 'competitive',
    label: 'Competitive',
    description: 'Wide FOV with minimal weapon clutter — common pro baseline.',
    viewmodel: DEFAULT_VIEWMODEL,
  },
  {
    id: 'desktop',
    label: 'Desktop',
    description:
      'Pushed left and down — more screen space for crosshair tracking.',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 2,
      offsetZ: -2,
    },
  },
];

export function getViewmodelPresetById(id: string) {
  return VIEWMODEL_PRESETS.find((preset) => preset.id === id);
}
