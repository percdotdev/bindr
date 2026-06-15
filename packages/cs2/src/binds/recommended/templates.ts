import type { RecommendedBindTemplate } from '@workspace/cs2/binds/model/types';

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
  {
    id: 'rec-buy-full',
    key: 'kp_5',
    command:
      'buy vesthelm; buy ak47; buy m4a1; buy smokegrenade; buy flashbang; buy hegrenade; buy molotov; buy incgrenade; buy defuser',
    label: 'Full buy',
    description:
      'Rifle, armor, full utility and defuser. Wrong-team weapons are ignored, so it works on T and CT.',
    category: 'buy',
    mmSafe: true,
  },
  {
    id: 'rec-buy-force',
    key: 'kp_1',
    command:
      'buy vest; buy famas; buy galilar; buy flashbang; buy smokegrenade',
    label: 'Force buy',
    description: 'Light armor, cheap rifle and two nades for eco breaks.',
    category: 'buy',
    mmSafe: true,
  },
  {
    id: 'rec-buy-awp',
    key: 'kp_2',
    command: 'buy vesthelm; buy awp; buy smokegrenade; buy flashbang',
    label: 'AWP buy',
    description: 'AWP with armor and a couple of nades.',
    category: 'buy',
    mmSafe: true,
  },
  {
    id: 'rec-buy-pistol',
    key: 'kp_3',
    command: 'buy vesthelm; buy deagle; buy flashbang',
    label: 'Pistol + armor',
    description: 'Deagle, full armor and a flash for anti-eco rounds.',
    category: 'buy',
    mmSafe: true,
  },
  {
    id: 'rec-mwheel-jump',
    key: 'mwheeldown',
    command: '+jump',
    label: 'Mouse-wheel jump',
    description:
      'Bind jump to scroll for more consistent bunny hops. Single action — Valve MM safe.',
    category: 'movement',
    mmSafe: true,
  },
  {
    id: 'rec-ptt',
    key: 'b',
    command: '+voicerecord',
    label: 'Push-to-talk',
    description: 'Hold to talk on team voice without toggling open mic.',
    category: 'comms',
    mmSafe: true,
  },
  {
    id: 'rec-inspect',
    key: 'f',
    command: '+lookatweapon',
    label: 'Inspect weapon',
    description: 'Hold to inspect the equipped weapon or knife.',
    category: 'misc',
    mmSafe: true,
  },
  {
    id: 'rec-clear-decals',
    key: 'mouse1',
    command: '+attack; r_cleardecals',
    label: 'Clear decals on fire',
    description:
      'Wipes blood and bullet marks every time you shoot. One attack action — Valve MM safe.',
    category: 'misc',
    mmSafe: true,
  },
  {
    id: 'rec-fps-toggle',
    key: 'p',
    command: 'toggle cl_showfps 0 1',
    label: 'Toggle FPS counter',
    description: 'Show or hide the FPS overlay on demand.',
    category: 'misc',
    mmSafe: true,
  },
  {
    id: 'rec-hand-toggle',
    key: 'h',
    command: 'toggle cl_righthand 0 1',
    label: 'Swap weapon hand',
    description:
      'Flip the viewmodel between right and left hand to clear sightlines.',
    category: 'misc',
    mmSafe: true,
  },
];

export function getRecommendedTemplateById(id: string) {
  return RECOMMENDED_BIND_TEMPLATES.find((template) => template.id === id);
}

export function isRecommendedBindId(id: string): boolean {
  return id.startsWith('rec-');
}
