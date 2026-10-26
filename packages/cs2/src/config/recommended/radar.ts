import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const RADAR_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    category: 'radar',
    commands: [
      'cl_radar_scale 0.4',
      'cl_hud_radar_scale 1.15',
      'cl_radar_always_centered 0',
    ],
    description:
      'Zoomed-out minimap with larger HUD element — common execute setup.',
    id: 'rec-radar-lineups',
    label: 'Competitive radar (lineups)',
    mmSafe: true,
    patch: {
      radar: {
        alwaysCentered: false,
        hudScale: 1.15,
        scale: 0.4,
      },
    },
    source: 'CS2 client cvar',
  },
  {
    category: 'radar',
    commands: [
      'cl_radar_scale 0.35',
      'cl_radar_always_centered 0',
      'cl_radar_rotate 1',
      'cl_radar_icon_scale_min 0.5',
      'cl_hud_radar_scale 1.15',
      'cl_radar_square_with_scoreboard 1',
    ],
    description: 'Tighter zoom (0.35) with icon scaling.',
    id: 'rec-radar-pro',
    label: 'Pro radar',
    mmSafe: true,
    patch: {
      radar: {
        alwaysCentered: false,
        hudScale: 1.15,
        iconScaleMin: 0.5,
        rotate: true,
        scale: 0.35,
        squareWithScoreboard: true,
      },
    },
    source: 'CS2 client cvar',
  },
];
