import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const MOUSE_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
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
];
