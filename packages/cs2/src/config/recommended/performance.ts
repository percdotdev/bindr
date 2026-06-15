import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const PERFORMANCE_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
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
];
