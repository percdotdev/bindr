import type {
  BindEntry,
  RecommendedBindTemplate,
} from '@workspace/cs2/binds/model/types';
import { RECOMMENDED_BIND_TEMPLATES } from '@workspace/cs2/binds/recommended/templates';

export function templateToBindEntry(
  template: RecommendedBindTemplate
): BindEntry {
  return {
    id: template.id,
    key: template.key,
    command: template.command,
    label: template.label,
    description: template.description,
    category: template.category,
    mmSafe: template.mmSafe,
  };
}

export function createRecommendedBinds(): BindEntry[] {
  return RECOMMENDED_BIND_TEMPLATES.map(templateToBindEntry);
}
