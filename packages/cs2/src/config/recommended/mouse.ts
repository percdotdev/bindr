import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const MOUSE_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    category: 'mouse',
    commands: ['zoom_sensitivity_ratio 1'],
    description:
      'Keep scoped sensitivity 1:1 with hip-fire. Raw input is always on in CS2 — `m_rawinput` is gone.',
    id: 'rec-mouse-raw',
    label: '1.0 zoom sensitivity ratio',
    mmSafe: true,
    patch: {
      mouse: {
        zoomSensitivityRatio: 1,
      },
    },
    source: 'CS2 client cvar',
  },
];
