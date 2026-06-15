import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const HUD_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-hud-hide-build-info',
    label: 'Hide build info text',
    description:
      'Removes the version/debug overlay in the corner — cleaner competitive HUD.',
    category: 'hud',
    mmSafe: true,
    source: 'Steam — How to Hide Build Info (id=3057673955)',
    commands: ['r_show_build_info false'],
    patch: {
      hud: {
        showBuildInfo: false,
      },
    },
  },
  {
    id: 'rec-hud-teamid-fade',
    label: 'Fade teammate names at crosshair',
    description:
      'Max fade (1.0) when your crosshair is on a teammate’s head — less name clutter in fights.',
    category: 'hud',
    mmSafe: true,
    source: 'Steam — Teammate name fade (id=3245144889)',
    commands: ['cl_teamid_overhead_fade_near_crosshair 1'],
    patch: {
      hud: {
        teamidOverheadFadeNearCrosshair: 1,
      },
    },
  },
  {
    id: 'rec-hud-readable',
    label: 'Readable competitive HUD',
    description:
      'Green accent, slightly smaller HUD, teammate colors with letters, and bomb under the radar.',
    category: 'hud',
    mmSafe: true,
    source: 'lineups.gg HUD guide',
    commands: [
      'cl_hud_color 4',
      'hud_scaling 0.85',
      'cl_teammate_colors_show 2',
      'cl_hud_bomb_under_radar 1',
    ],
    patch: {
      hud: {
        hudColor: 4,
        hudScaling: 0.85,
        teammateColors: 2,
        bombUnderRadar: true,
      },
    },
  },
];
