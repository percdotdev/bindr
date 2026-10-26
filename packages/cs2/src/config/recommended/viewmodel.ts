import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const VIEWMODEL_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-vm-valve',
    label: 'Valve default viewmodel',
    description: 'Stock viewmodel FOV and offsets — baseline before tweaking.',
    category: 'viewmodel',
    mmSafe: true,
    source: 'CS2 client defaults',
    commands: [
      'viewmodel_fov 60',
      'viewmodel_offset_x 2.5',
      'viewmodel_offset_y 0',
      'viewmodel_offset_z -1.5',
    ],
    patch: {
      viewmodel: DEFAULT_CONFIG.viewmodel,
    },
  },
  {
    id: 'rec-vm-wide',
    label: 'Wide competitive viewmodel',
    description:
      'Max FOV (68) with custom offsets. presetpos 0 unlocks the offsets — 1/2/3 override them.',
    category: 'viewmodel',
    mmSafe: true,
    source: 'common 2026 autoexecs',
    commands: [
      'viewmodel_presetpos 0',
      'viewmodel_fov 68',
      'viewmodel_offset_x 2.5',
      'viewmodel_offset_y 0',
      'viewmodel_offset_z -1.5',
    ],
    patch: {
      viewmodel: {
        fov: 68,
        offsetX: 2.5,
        offsetY: 0,
        offsetZ: -1.5,
        presetPos: 0,
      },
    },
  },
];
