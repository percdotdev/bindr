import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';
import { AUDIO_RECOMMENDATIONS } from '@workspace/cs2/config/recommended/audio';
import { HUD_RECOMMENDATIONS } from '@workspace/cs2/config/recommended/hud';
import { MOUSE_RECOMMENDATIONS } from '@workspace/cs2/config/recommended/mouse';
import { NETWORK_RECOMMENDATIONS } from '@workspace/cs2/config/recommended/network';
import { PERFORMANCE_RECOMMENDATIONS } from '@workspace/cs2/config/recommended/performance';
import { RADAR_RECOMMENDATIONS } from '@workspace/cs2/config/recommended/radar';
import { VIEWMODEL_RECOMMENDATIONS } from '@workspace/cs2/config/recommended/viewmodel';

/**
 * Curated always-on cvars from csdb.gg (defaults + competitive bundles) and
 * lineups.gg CS2 autoexec guide (Mar 2026). MM-safe client cvars only.
 */
export const RECOMMENDED_CONFIG_TEMPLATES: RecommendedConfigTemplate[] = [
  ...VIEWMODEL_RECOMMENDATIONS,
  ...MOUSE_RECOMMENDATIONS,
  ...RADAR_RECOMMENDATIONS,
  ...NETWORK_RECOMMENDATIONS,
  ...AUDIO_RECOMMENDATIONS,
  ...PERFORMANCE_RECOMMENDATIONS,
  ...HUD_RECOMMENDATIONS,
];

export function getRecommendedConfigTemplateById(id: string) {
  return RECOMMENDED_CONFIG_TEMPLATES.find((template) => template.id === id);
}

export function isRecommendedConfigId(id: string): boolean {
  return id.startsWith('rec-');
}
