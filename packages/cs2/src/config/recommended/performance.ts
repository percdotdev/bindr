import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const PERFORMANCE_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-perf-no-tracers',
    label: 'Hide first-person tracers',
    description: 'Less visual noise when spraying — common FPS tweak.',
    category: 'performance',
    mmSafe: true,
    source: 'CS2 client cvar',
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
    source: 'CS2 client cvar',
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
    description: 'Turns off auto-help and the game instructor.',
    category: 'performance',
    mmSafe: true,
    source: 'CS2 client cvar',
    commands: ['cl_autohelp 0', 'gameinstructor_enable 0'],
    patch: {
      performance: {
        autohelp: false,
        gameInstructor: false,
      },
    },
  },
  {
    id: 'rec-perf-low-latency',
    label: 'Engine low-latency sleep',
    description:
      'Moves the Reflex/low-latency sleep after client sim. Pair with a real `fps_max`, not 0.',
    category: 'performance',
    mmSafe: true,
    source: 'CS2 client cvar',
    commands: ['engine_low_latency_sleep_after_client_tick true'],
    patch: {
      performance: {
        lowLatencySleep: true,
      },
    },
  },
];
