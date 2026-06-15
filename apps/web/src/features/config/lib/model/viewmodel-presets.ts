import { DEFAULT_VIEWMODEL } from '@/features/config/lib/model/default-config';
import type { ViewmodelPreset } from '@/features/config/lib/model/types';

/** Editor presets — sourced, not invented. */
export const VIEWMODEL_PRESETS: ViewmodelPreset[] = [
  {
    id: 'valve-default',
    label: 'Valve default',
    description: 'Stock CS2 viewmodel from csdb.gg defaults.',
    source: 'csdb.gg',
    viewmodel: DEFAULT_VIEWMODEL,
  },
  {
    id: 'wide-competitive',
    label: 'Wide competitive',
    description:
      'Max FOV with custom offsets — common in 2026 autoexec guides.',
    source: 'lineups.gg autoexec (Mar 2026)',
    viewmodel: {
      fov: 68,
      offsetX: 2.5,
      offsetY: 0,
      offsetZ: -1.5,
      presetPos: 0,
    },
  },
];

export function getViewmodelPresetById(id: string) {
  return VIEWMODEL_PRESETS.find((preset) => preset.id === id);
}
