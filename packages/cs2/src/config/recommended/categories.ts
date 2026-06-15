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
  viewmodel: 'Viewmodel',
  mouse: 'Mouse & sensitivity',
  radar: 'Radar & minimap',
  network: 'Network',
  audio: 'Audio',
  performance: 'Performance & misc',
  hud: 'HUD & UI',
};
