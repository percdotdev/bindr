import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const HUD_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    category: 'hud',
    commands: ['r_show_build_info false'],
    description:
      'Removes the version/debug overlay in the corner — cleaner competitive HUD.',
    id: 'rec-hud-hide-build-info',
    label: 'Hide build info text',
    mmSafe: true,
    patch: {
      hud: {
        showBuildInfo: false,
      },
    },
    source: 'CS2 client cvar',
  },
  {
    category: 'hud',
    commands: ['cl_teamid_overhead_fade_near_crosshair 1'],
    description:
      'Max fade (1.0) when your crosshair is on a teammate — less name clutter in fights. 0 disables fade.',
    id: 'rec-hud-teamid-fade',
    label: 'Fade teammate names at crosshair',
    mmSafe: true,
    patch: {
      hud: {
        teamidOverheadFadeNearCrosshair: 1,
      },
    },
    source: 'CS2 client cvar',
  },
  {
    category: 'hud',
    commands: [
      'cl_hud_color 9',
      'hud_scaling 0.85',
      'cl_teammate_colors_show 2',
    ],
    description:
      'Green accent, slightly smaller HUD, and teammate colors with letters.',
    id: 'rec-hud-readable',
    label: 'Readable competitive HUD',
    mmSafe: true,
    patch: {
      hud: {
        hudColor: 9,
        hudScaling: 0.85,
        teammateColors: 2,
      },
    },
    source: 'CS2 client cvar',
  },
];
