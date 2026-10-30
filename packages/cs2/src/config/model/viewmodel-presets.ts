import { DEFAULT_VIEWMODEL } from '@workspace/cs2/config/model/default-config';
import type { ViewmodelPreset } from '@workspace/cs2/config/model/types';

/** Editor presets — sourced, not invented. */
export const VIEWMODEL_PRESETS: ViewmodelPreset[] = [
  {
    description: 'Stock CS2 desktop viewmodel (presetpos 1).',
    id: 'valve-default',
    label: 'Valve default',
    source: 'CS2 client defaults',
    viewmodel: DEFAULT_VIEWMODEL,
  },
  {
    description:
      'FOV 68, offsets 2.5 / 2 / -2. presetpos 0 so the offsets stick.',
    id: 'wide-competitive',
    label: 'Wide competitive',
    source: 'CS2 competitive viewmodel',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 2,
      offsetZ: -2,
      preferLeftHanded: false,
      presetPos: 0,
    },
  },
];

export function getViewmodelPresetById(id: string) {
  return VIEWMODEL_PRESETS.find((preset) => preset.id === id);
}
