import type {
  BindCategory,
  BindEntry,
  RecommendedBindTemplate,
} from '@/features/binds/lib/model/types';

/**
 * Curated starter binds aligned with common 2026 autoexec guides (lineups.gg,
 * tradeit.gg). Grenades use CS2 slot numbers; lineup release uses a single
 * `-attack` key (Valve MM safe since the Aug 2024 multi-input bind ban).
 */
export const RECOMMENDED_BIND_TEMPLATES: RecommendedBindTemplate[] = [
  {
    id: 'rec-smoke',
    key: 'c',
    command: 'slot8',
    label: 'Smoke',
    description:
      'Instant smoke without the scroll wheel. CS2 slot 8 — most-used execute bind.',
    category: 'utility',
    mmSafe: true,
  },
  {
    id: 'rec-flash',
    key: 'x',
    command: 'slot7',
    label: 'Flashbang',
    description: 'Instant flash. CS2 slot 7 — sits under WASD on Z/X/C row.',
    category: 'utility',
    mmSafe: true,
  },
  {
    id: 'rec-he',
    key: 'z',
    command: 'slot6',
    label: 'HE grenade',
    description: 'Instant HE. CS2 slot 6.',
    category: 'utility',
    mmSafe: true,
  },
  {
    id: 'rec-molotov',
    key: '5',
    command: 'slot10',
    label: 'Molotov / Incendiary',
    description:
      'Fire grenade on one key. Slot 10 (T molotov / CT incendiary).',
    category: 'utility',
    mmSafe: true,
  },
  {
    id: 'rec-decoy',
    key: '4',
    command: 'slot9',
    label: 'Decoy',
    description: 'Decoy grenade. CS2 slot 9.',
    category: 'utility',
    mmSafe: true,
  },
  {
    id: 'rec-knife',
    key: 'q',
    command: 'slot3',
    label: 'Quick knife',
    description: 'Fast knife for movement and bhops without scrolling.',
    category: 'weapons',
    mmSafe: true,
  },
  {
    id: 'rec-drop',
    key: 'g',
    command: 'drop',
    label: 'Drop bomb',
    description: 'Drop the C4 instantly during retakes or fake executes.',
    category: 'weapons',
    mmSafe: true,
  },
  {
    id: 'rec-lineup-release',
    key: 'n',
    command: '-attack',
    label: 'Lineup release',
    description:
      'Press with Space at jump peak for consistent smoke lineups. Single-action bind — safe on Valve MM.',
    category: 'lineups',
    mmSafe: true,
  },
  {
    id: 'rec-radar-zoom',
    key: 'f9',
    command: 'incrementvar cl_radar_scale 0.30 1.00 0.10',
    label: 'Radar zoom',
    description: 'Cycle radar zoom to see more or less of the map.',
    category: 'radar',
    mmSafe: true,
  },
  {
    id: 'rec-radar-hud',
    key: 'f10',
    command: 'incrementvar cl_hud_radar_scale 1.0 1.3 0.05',
    label: 'Radar HUD size',
    description: 'Step minimap HUD scale during a match.',
    category: 'radar',
    mmSafe: true,
  },
];

export const BIND_CATEGORY_ORDER: BindCategory[] = [
  'utility',
  'lineups',
  'weapons',
  'radar',
];

export const BIND_CATEGORY_LABELS: Record<BindCategory, string> = {
  utility: 'Grenades & utility',
  lineups: 'Smoke lineups',
  weapons: 'Weapons',
  radar: 'Radar',
};

export function createRecommendedBinds(): BindEntry[] {
  return RECOMMENDED_BIND_TEMPLATES.map(templateToBindEntry);
}

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

export function getRecommendedTemplateById(id: string) {
  return RECOMMENDED_BIND_TEMPLATES.find((template) => template.id === id);
}

export function isRecommendedBindId(id: string): boolean {
  return id.startsWith('rec-');
}
