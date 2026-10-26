import type { ConfigCategory } from '@workspace/cs2/config/model/types';

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
  audio: 'Audio',
  hud: 'HUD & UI',
  mouse: 'Mouse & sensitivity',
  network: 'Network',
  performance: 'Performance & misc',
  radar: 'Radar & minimap',
  viewmodel: 'Viewmodel',
};
