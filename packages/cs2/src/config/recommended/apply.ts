import {
  applyConfigPatch,
  revertConfigPatch,
} from '@workspace/cs2/config/model/config-patch';
import { DEFAULT_CONFIG } from '@workspace/cs2/config/model/default-config';
import type {
  ConfigCategory,
  ConfigSettings,
} from '@workspace/cs2/config/model/types';
import {
  getRecommendedConfigTemplateById,
  RECOMMENDED_CONFIG_TEMPLATES,
} from '@workspace/cs2/config/recommended/templates';

const EXCLUSIVE_CATEGORIES = new Set<ConfigCategory>(['viewmodel', 'radar']);

function countMaxActiveRecommendedTemplates(): number {
  const exclusiveCategories = new Set<ConfigCategory>();
  let count = 0;

  for (const template of RECOMMENDED_CONFIG_TEMPLATES) {
    if (!EXCLUSIVE_CATEGORIES.has(template.category)) {
      count += 1;
    } else if (!exclusiveCategories.has(template.category)) {
      exclusiveCategories.add(template.category);
      count += 1;
    }
  }

  return count;
}

/**
 * Most templates that can be active at once. Exclusive categories
 * (viewmodel, radar) only ever hold a single pick.
 */
export const MAX_ACTIVE_RECOMMENDED_CONFIGS =
  countMaxActiveRecommendedTemplates();

/**
 * True when every non-exclusive template is enabled and each exclusive
 * category has one of its templates enabled, i.e. the state "Add all" ends in.
 */
export function areAllRecommendedTemplatesApplied(
  enabledRecommendations: readonly string[]
): boolean {
  const enabled = new Set(enabledRecommendations);
  const coveredExclusiveCategories = new Set<ConfigCategory>();

  for (const id of enabled) {
    const template = getRecommendedConfigTemplateById(id);
    if (template && EXCLUSIVE_CATEGORIES.has(template.category)) {
      coveredExclusiveCategories.add(template.category);
    }
  }

  return RECOMMENDED_CONFIG_TEMPLATES.every((template) =>
    EXCLUSIVE_CATEGORIES.has(template.category)
      ? coveredExclusiveCategories.has(template.category)
      : enabled.has(template.id)
  );
}

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

export function applyAllRecommendedTemplates(): ConfigSettings {
  let next: ConfigSettings = {
    ...DEFAULT_CONFIG,
    enabledRecommendations: [],
  };

  for (const template of RECOMMENDED_CONFIG_TEMPLATES) {
    const applied = applyRecommendedTemplate(next, template.id);
    if (applied) {
      next = applied;
    }
  }

  return next;
}
