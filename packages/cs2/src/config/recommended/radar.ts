import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const RADAR_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-radar-lineups',
    label: 'Competitive radar (lineups)',
    description:
      'Zoomed-out minimap with larger HUD element — common execute setup.',
    category: 'radar',
    mmSafe: true,
    source: 'lineups.gg autoexec (Mar 2026)',
    commands: [
      'cl_radar_scale 0.4',
      'cl_hud_radar_scale 1.15',
      'cl_radar_always_centered 0',
    ],
    patch: {
      radar: {
        scale: 0.4,
        hudScale: 1.15,
        alwaysCentered: false,
      },
    },
  },
  {
    id: 'rec-radar-pro',
    label: 'Pro radar (csdb)',
    description:
      'Tighter zoom (0.35) with icon scaling — csdb.gg pro radar bundle.',
    category: 'radar',
    mmSafe: true,
    source: 'csdb.gg pro radar settings',
    commands: [
      'cl_radar_scale 0.35',
      'cl_radar_always_centered 0',
      'cl_radar_rotate 1',
      'cl_radar_icon_scale_min 0.5',
      'cl_hud_radar_scale 1.15',
      'cl_radar_square_with_scoreboard 1',
    ],
    patch: {
      radar: {
        scale: 0.35,
        alwaysCentered: false,
        rotate: true,
        iconScaleMin: 0.5,
        hudScale: 1.15,
        squareWithScoreboard: true,
      },
    },
  },
];
