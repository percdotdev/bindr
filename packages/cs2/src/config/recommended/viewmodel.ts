import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const VIEWMODEL_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-vm-valve',
    label: 'Valve default viewmodel',
    description: 'Stock viewmodel FOV and offsets — baseline before tweaking.',
    category: 'viewmodel',
    mmSafe: true,
    source: 'csdb.gg defaults',
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
      'Max FOV (68) with right-side offsets — popular in pro autoexecs.',
    category: 'viewmodel',
    mmSafe: true,
    source: 'lineups.gg autoexec (Mar 2026)',
    commands: [
      'viewmodel_fov 68',
      'viewmodel_offset_x 2.5',
      'viewmodel_offset_y 0',
      'viewmodel_offset_z -1.5',
      'viewmodel_presetpos 0',
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
  {
    id: 'rec-vm-low-bob',
    label: 'Reduced weapon bob',
    description:
      'Cuts weapon sway and run dip for a steadier viewmodel — common pro tweak.',
    category: 'viewmodel',
    mmSafe: true,
    source: 'csdb.gg viewmodel reference',
    commands: ['cl_bobamt_lat 0.1', 'cl_bobamt_vert 0.1', 'cl_bob_lower_amt 5'],
    patch: {
      viewmodel: {
        bobLat: 0.1,
        bobVert: 0.1,
        bobLowerAmt: 5,
      },
    },
  },
];
