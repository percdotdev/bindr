import {
  applyConfigPatch,
  revertConfigPatch,
} from '@workspace/cs2/config/model/config-patch';
import type {
  ConfigCategory,
  ConfigSettings,
} from '@workspace/cs2/config/model/types';
import { getRecommendedConfigTemplateById } from '@workspace/cs2/config/recommended/templates';

const EXCLUSIVE_CATEGORIES = new Set<ConfigCategory>(['viewmodel', 'radar']);

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
