import type {
  BindEntry,
  RecommendedBindTemplate,
} from '@workspace/cs2/binds/model/types';
import { RECOMMENDED_BIND_TEMPLATES } from '@workspace/cs2/binds/recommended/templates';

export function templateToBindEntry(
  template: RecommendedBindTemplate
): BindEntry {
  return {
    category: template.category,
    command: template.command,
    description: template.description,
    id: template.id,
    key: template.key,
    label: template.label,
    mmSafe: template.mmSafe,
  };
}

export function createRecommendedBinds(): BindEntry[] {
  return RECOMMENDED_BIND_TEMPLATES.map(templateToBindEntry);
}
