import { DEFAULT_VIEWMODEL } from '@workspace/cs2/config/model/default-config';
import type { ViewmodelPreset } from '@workspace/cs2/config/model/types';

/** Editor presets — sourced, not invented. */
export const VIEWMODEL_PRESETS: ViewmodelPreset[] = [
  {
    id: 'valve-default',
    label: 'Valve default',
    description: 'Stock CS2 desktop viewmodel (presetpos 1).',
    source: 'CS2 client defaults',
    viewmodel: DEFAULT_VIEWMODEL,
  },
  {
    id: 'wide-competitive',
    label: 'Wide competitive',
    description:
      'Max FOV with custom offsets — presetpos 0 so the offsets stick.',
    source: 'common 2026 autoexecs',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 0,
      preferLeftHanded: false,
    },
  },
];

export function getViewmodelPresetById(id: string) {
  return VIEWMODEL_PRESETS.find((preset) => preset.id === id);
}
