import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const PERFORMANCE_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    category: 'performance',
    commands: ['r_drawtracers_firstperson 0'],
    description: 'Less visual noise when spraying — common FPS tweak.',
    id: 'rec-perf-no-tracers',
    label: 'Hide first-person tracers',
    mmSafe: true,
    patch: {
      performance: {
        drawTracersFirstPerson: false,
      },
    },
    source: 'CS2 client cvar',
  },
  {
    category: 'performance',
    commands: ['fps_max 0', 'fps_max_ui 120'],
    description: 'Uncapped in-game FPS with 120 fps menu cap.',
    id: 'rec-perf-fps',
    label: 'Uncapped FPS + UI cap',
    mmSafe: true,
    patch: {
      performance: {
        fpsMax: 0,
        fpsMaxUi: 120,
      },
    },
    source: 'CS2 client cvar',
  },
  {
    category: 'performance',
    commands: ['cl_autohelp 0', 'gameinstructor_enable 0'],
    description: 'Turns off auto-help and the game instructor.',
    id: 'rec-perf-no-clutter',
    label: 'Disable help popups',
    mmSafe: true,
    patch: {
      performance: {
        autohelp: false,
        gameInstructor: false,
      },
    },
    source: 'CS2 client cvar',
  },
  {
    category: 'performance',
    commands: ['engine_low_latency_sleep_after_client_tick true'],
    description:
      'Moves the Reflex/low-latency sleep after client sim. Pair with a real `fps_max`, not 0.',
    id: 'rec-perf-low-latency',
    label: 'Engine low-latency sleep',
    mmSafe: true,
    patch: {
      performance: {
        lowLatencySleep: true,
      },
    },
    source: 'CS2 client cvar',
  },
];
