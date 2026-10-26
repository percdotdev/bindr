import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const HUD_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-hud-classic-sniper-scope',
    label: 'Classic AWP/Scout scope',
    description:
      'Hides the Oct 2025 inaccuracy circle on AWP and SSG 08 — restores the old static overlay. Settings → Game → Sniper Sights → Show Scoped Sniper Rifle Inaccuracy → No.',
    category: 'hud',
    mmSafe: true,
    source: 'CS2 client cvar (Oct 2025)',
    commands: ['cl_sniper_show_inaccuracy 0'],
    patch: {
      hud: {
        sniperShowInaccuracy: false,
      },
    },
  },
  {
    id: 'rec-hud-hide-build-info',
    label: 'Hide build info text',
    description:
      'Removes the version/debug overlay in the corner — cleaner competitive HUD.',
    category: 'hud',
    mmSafe: true,
    source: 'CS2 client cvar',
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
      'Max fade (1.0) when your crosshair is on a teammate — less name clutter in fights. 0 disables fade.',
    category: 'hud',
    mmSafe: true,
    source: 'CS2 client cvar',
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
      'Green accent, slightly smaller HUD, and teammate colors with letters.',
    category: 'hud',
    mmSafe: true,
    source: 'CS2 client cvar',
    commands: [
      'cl_hud_color 9',
      'hud_scaling 0.85',
      'cl_teammate_colors_show 2',
    ],
    patch: {
      hud: {
        hudColor: 9,
        hudScaling: 0.85,
        teammateColors: 2,
      },
    },
  },
];
