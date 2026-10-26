import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const MOUSE_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-mouse-raw',
    label: '1.0 zoom sensitivity ratio',
    description:
      'Keep scoped sensitivity 1:1 with hip-fire. Raw input is always on in CS2 — `m_rawinput` is gone.',
    category: 'mouse',
    mmSafe: true,
    source: 'CS2 client cvar',
    commands: ['zoom_sensitivity_ratio 1'],
    patch: {
      mouse: {
        zoomSensitivityRatio: 1,
      },
    },
  },
];
