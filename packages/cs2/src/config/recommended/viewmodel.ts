import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const VIEWMODEL_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    category: 'viewmodel',
    commands: [
      'viewmodel_presetpos 1',
      'viewmodel_fov 60',
      'viewmodel_offset_x 2.5',
      'viewmodel_offset_y 0',
      'viewmodel_offset_z -1.5',
    ],
    description: 'Stock viewmodel FOV and offsets — baseline before tweaking.',
    id: 'rec-vm-valve',
    label: 'Valve default viewmodel',
    mmSafe: true,
    patch: {
      viewmodel: DEFAULT_CONFIG.viewmodel,
    },
    source: 'CS2 client defaults',
  },
  {
    category: 'viewmodel',
    commands: [
      'viewmodel_presetpos 0',
      'viewmodel_fov 68',
      'viewmodel_offset_x 2.5',
      'viewmodel_offset_y 2',
      'viewmodel_offset_z -2',
    ],
    description:
      'FOV 68, offsets 2.5 / 2 / -2. presetpos 0 so the offsets stick — 1/2/3 override them.',
    id: 'rec-vm-wide',
    label: 'Wide competitive viewmodel',
    mmSafe: true,
    patch: {
      viewmodel: {
        fov: 68,
        offsetX: 2.5,
        offsetY: 2,
        offsetZ: -2,
        presetPos: 0,
      },
    },
    source: 'CS2 competitive viewmodel',
  },
];
