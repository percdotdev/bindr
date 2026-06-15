import {
  applyConfigPatch,
  revertConfigPatch,
} from '@/features/config/lib/model/config-patch';
import { DEFAULT_CONFIG } from '@/features/config/lib/model/default-config';
import type {
  ConfigCategory,
  ConfigSettings,
  RecommendedConfigTemplate,
} from '@/features/config/lib/model/types';

/**
 * Curated always-on cvars from csdb.gg (defaults + competitive bundles) and
 * lineups.gg CS2 autoexec guide (Mar 2026). MM-safe client cvars only.
 */
export const RECOMMENDED_CONFIG_TEMPLATES: RecommendedConfigTemplate[] = [
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
  {
    id: 'rec-network-competitive',
    label: 'Competitive network rates',
    description:
      'Max rate, interp 0 + ratio 1, 128 tick cmd/update — standard MM bundle.',
    category: 'network',
    mmSafe: true,
    source: 'csdb.gg + lineups.gg autoexec',
    commands: [
      'rate 786432',
      'cl_interp_ratio 1',
      'cl_interp 0',
      'cl_cmdrate 128',
      'cl_updaterate 128',
    ],
    patch: {
      network: {
        rate: 786_432,
        interpRatio: 1,
        interp: 0,
        cmdrate: 128,
        updaterate: 128,
      },
    },
  },
  {
    id: 'rec-network-ping-cap',
    label: 'Matchmaking ping cap (80)',
    description: 'Limits MM search to 80 ms — csdb competitive network preset.',
    category: 'network',
    mmSafe: true,
    source: 'csdb.gg competitive network',
    commands: ['mm_dedicated_search_maxping 80'],
    patch: {
      network: {
        maxPing: 80,
      },
    },
  },
  {
    id: 'rec-perf-no-tracers',
    label: 'Hide first-person tracers',
    description: 'Less visual noise when spraying — common FPS tweak.',
    category: 'performance',
    mmSafe: true,
    source: 'csdb.gg FPS optimization',
    commands: ['r_drawtracers_firstperson 0'],
    patch: {
      performance: {
        drawTracersFirstPerson: false,
      },
    },
  },
  {
    id: 'rec-perf-fps',
    label: 'Uncapped FPS + UI cap',
    description: 'Uncapped in-game FPS with 120 fps menu cap.',
    category: 'performance',
    mmSafe: true,
    source: 'csdb.gg FPS optimization',
    commands: ['fps_max 0', 'fps_max_ui 120'],
    patch: {
      performance: {
        fpsMax: 0,
        fpsMaxUi: 120,
      },
    },
  },
  {
    id: 'rec-perf-no-clutter',
    label: 'Disable help popups',
    description: 'Turns off auto-help, instructor, and help prompts.',
    category: 'performance',
    mmSafe: true,
    source: 'csdb.gg FPS + lineups.gg misc',
    commands: ['cl_autohelp 0', 'gameinstructor_enable 0', 'cl_showhelp 0'],
    patch: {
      performance: {
        autohelp: false,
        gameInstructor: false,
        showHelp: false,
      },
    },
  },
  {
    id: 'rec-perf-low-latency',
    label: 'Engine low-latency sleep',
    description: 'Reduces input latency on supported setups.',
    category: 'performance',
    mmSafe: true,
    source: 'csdb.gg FPS optimization',
    commands: ['engine_low_latency_sleep_after_client_tick true'],
    patch: {
      performance: {
        lowLatencySleep: true,
      },
    },
  },
  {
    id: 'rec-perf-no-freezecam',
    label: 'Skip death freeze cam',
    description: 'Jump back to spectating faster after dying.',
    category: 'performance',
    mmSafe: true,
    source: 'lineups.gg autoexec (Mar 2026)',
    commands: ['cl_disablefreezecam 1'],
    patch: {
      performance: {
        disableFreezeCam: true,
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
  {
    id: 'rec-mouse-raw',
    label: 'Raw input + 1.0 zoom ratio',
    description:
      'Bypass OS mouse acceleration and keep scoped sensitivity 1:1 with hip-fire.',
    category: 'mouse',
    mmSafe: true,
    source: 'csdb.gg mouse reference',
    commands: ['m_rawinput 1', 'zoom_sensitivity_ratio 1'],
    patch: {
      mouse: {
        rawInput: true,
        zoomSensitivityRatio: 1,
      },
    },
  },
  {
    id: 'rec-audio-clean',
    label: 'Mute music, lower voice',
    description:
      'Silences round/menu/MVP music, keeps the bomb timer beep, and tames teammate voice volume.',
    category: 'audio',
    mmSafe: true,
    source: 'csdb.gg audio optimization',
    commands: [
      'snd_roundstart_volume 0',
      'snd_roundend_volume 0',
      'snd_mvp_volume 0',
      'snd_menumusic_volume 0',
      'snd_deathcamera_volume 0',
      'snd_tensecondwarning_volume 0.1',
      'voice_scale 0.7',
      'snd_mute_losefocus 1',
    ],
    patch: {
      audio: {
        musicVolume: 0,
        tenSecondWarning: 0.1,
        voiceScale: 0.7,
        muteOnFocusLoss: true,
      },
    },
  },
  {
    id: 'rec-perf-fps-boost',
    label: 'FPS boost (visual cuts)',
    description:
      'Disables dynamic lighting and bloom, preloads assets, and enables multicore rendering for higher FPS.',
    category: 'performance',
    mmSafe: true,
    source: 'csdb.gg FPS optimization',
    commands: [
      'r_dynamic 0',
      'mat_disable_bloom 1',
      'mat_queue_mode 2',
      'cl_forcepreload 1',
      'cl_animate_player_models 0',
    ],
    patch: {
      performance: {
        dynamicLight: false,
        disableBloom: true,
        multicore: true,
        forcePreload: true,
        animatePlayerModels: false,
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

export const CONFIG_CATEGORY_ORDER: ConfigCategory[] = [
  'viewmodel',
  'mouse',
  'radar',
  'network',
  'audio',
  'performance',
  'hud',
];

export const CONFIG_CATEGORY_LABELS: Record<ConfigCategory, string> = {
  viewmodel: 'Viewmodel',
  mouse: 'Mouse & sensitivity',
  radar: 'Radar & minimap',
  network: 'Network',
  audio: 'Audio',
  performance: 'Performance & misc',
  hud: 'HUD & UI',
};

const EXCLUSIVE_CATEGORIES = new Set<ConfigCategory>(['viewmodel', 'radar']);

export function getRecommendedConfigTemplateById(id: string) {
  return RECOMMENDED_CONFIG_TEMPLATES.find((template) => template.id === id);
}

export function isRecommendedConfigId(id: string): boolean {
  return id.startsWith('rec-');
}

export function applyRecommendedTemplate(
  config: ConfigSettings,
  templateId: string
): ConfigSettings | null {
  const template = getRecommendedConfigTemplateById(templateId);
  if (!template) {
    return null;
  }

  let next = { ...config };

  if (EXCLUSIVE_CATEGORIES.has(template.category)) {
    for (const activeId of config.enabledRecommendations) {
      const active = getRecommendedConfigTemplateById(activeId);
      if (active?.category === template.category) {
        next = revertConfigPatch(next, active.patch);
        next = {
          ...next,
          enabledRecommendations: next.enabledRecommendations.filter(
            (id) => id !== activeId
          ),
        };
      }
    }
  }

  next = applyConfigPatch(next, template.patch);
  next = {
    ...next,
    enabledRecommendations: [
      ...next.enabledRecommendations.filter((id) => id !== templateId),
      templateId,
    ],
  };

  return next;
}

export function removeRecommendedTemplate(
  config: ConfigSettings,
  templateId: string
): ConfigSettings | null {
  const template = getRecommendedConfigTemplateById(templateId);
  if (!template) {
    return null;
  }

  if (!config.enabledRecommendations.includes(templateId)) {
    return config;
  }

  return {
    ...revertConfigPatch(config, template.patch),
    enabledRecommendations: config.enabledRecommendations.filter(
      (id) => id !== templateId
    ),
  };
}

export function applyAllRecommendedTemplates(): ConfigSettings {
  let next: ConfigSettings = {
    ...DEFAULT_CONFIG,
    enabledRecommendations: [],
  };

  for (const template of RECOMMENDED_CONFIG_TEMPLATES) {
    const applied = applyRecommendedTemplate(next, template.id);
    if (applied) {
      next = applied;
    }
  }

  return next;
}
