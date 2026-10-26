import type { RecommendedBindTemplate } from '@workspace/cs2/binds/model/types';

/**
 * Curated starter binds for current CS2. Grenades use CS2 slot numbers;
 * lineup release is a single `-attack` key (Valve MM safe since the Aug 2024
 * multi-input bind ban). No CS:GO leftovers (`r_cleardecals`, `cl_righthand`).
 */
export const RECOMMENDED_BIND_TEMPLATES: RecommendedBindTemplate[] = [
  {
    category: 'utility',
    command: 'slot8',
    description:
      'Instant smoke without the scroll wheel. CS2 slot 8 — most-used execute bind.',
    id: 'rec-smoke',
    key: 'c',
    label: 'Smoke',
    mmSafe: true,
  },
  {
    category: 'utility',
    command: 'slot7',
    description: 'Instant flash. CS2 slot 7 — sits under WASD on Z/X/C row.',
    id: 'rec-flash',
    key: 'x',
    label: 'Flashbang',
    mmSafe: true,
  },
  {
    category: 'utility',
    command: 'slot6',
    description: 'Instant HE. CS2 slot 6.',
    id: 'rec-he',
    key: 'z',
    label: 'HE grenade',
    mmSafe: true,
  },
  {
    category: 'utility',
    command: 'slot10',
    description:
      'Fire grenade on one key. Slot 10 (T molotov / CT incendiary).',
    id: 'rec-molotov',
    key: '5',
    label: 'Molotov / Incendiary',
    mmSafe: true,
  },
  {
    category: 'utility',
    command: 'slot9',
    description: 'Decoy grenade. CS2 slot 9.',
    id: 'rec-decoy',
    key: '4',
    label: 'Decoy',
    mmSafe: true,
  },
  {
    category: 'weapons',
    command: 'slot3',
    description: 'Fast knife for movement and bhops without scrolling.',
    id: 'rec-knife',
    key: 'q',
    label: 'Quick knife',
    mmSafe: true,
  },
  {
    category: 'weapons',
    command: 'drop',
    description:
      'Drops whatever you are holding. Select the bomb first to drop C4.',
    id: 'rec-drop',
    key: 'g',
    label: 'Drop item',
    mmSafe: true,
  },
  {
    category: 'lineups',
    command: '-attack',
    description:
      'Press with Space at jump peak for consistent smoke lineups. Single-action bind — safe on Valve MM.',
    id: 'rec-lineup-release',
    key: 'n',
    label: 'Lineup release',
    mmSafe: true,
  },
  {
    category: 'radar',
    command: 'incrementvar cl_radar_scale 0.25 1.00 0.10',
    description: 'Cycle radar zoom (0.25–1.0) to see more or less of the map.',
    id: 'rec-radar-zoom',
    key: 'f9',
    label: 'Radar zoom',
    mmSafe: true,
  },
  {
    category: 'radar',
    command: 'incrementvar cl_hud_radar_scale 0.80 1.30 0.05',
    description: 'Step minimap HUD scale during a match.',
    id: 'rec-radar-hud',
    key: 'f10',
    label: 'Radar HUD size',
    mmSafe: true,
  },
  {
    category: 'buy',
    command:
      'buy vesthelm; buy ak47; buy m4a1; buy smokegrenade; buy flashbang; buy hegrenade; buy molotov; buy incgrenade; buy defuser',
    description:
      'Rifle, armor, full utility and defuser. Wrong-team weapons are ignored, so it works on T and CT. `buy m4a1` is the M4A4.',
    id: 'rec-buy-full',
    key: 'kp_5',
    label: 'Full buy',
    mmSafe: true,
  },
  {
    category: 'buy',
    command:
      'buy vest; buy famas; buy galilar; buy flashbang; buy smokegrenade',
    description: 'Light armor, cheap rifle and two nades for eco breaks.',
    id: 'rec-buy-force',
    key: 'kp_1',
    label: 'Force buy',
    mmSafe: true,
  },
  {
    category: 'buy',
    command: 'buy vesthelm; buy awp; buy smokegrenade; buy flashbang',
    description: 'AWP with armor and a couple of nades.',
    id: 'rec-buy-awp',
    key: 'kp_2',
    label: 'AWP buy',
    mmSafe: true,
  },
  {
    category: 'buy',
    command: 'buy vesthelm; buy deagle; buy flashbang',
    description: 'Deagle, full armor and a flash for anti-eco rounds.',
    id: 'rec-buy-pistol',
    key: 'kp_3',
    label: 'Pistol + armor',
    mmSafe: true,
  },
  {
    category: 'movement',
    command: '+jump',
    description:
      'Bind jump to scroll for more consistent bunny hops. Single action — Valve MM safe.',
    id: 'rec-mwheel-jump',
    key: 'mwheeldown',
    label: 'Mouse-wheel jump',
    mmSafe: true,
  },
  {
    category: 'comms',
    command: '+voicerecord',
    description: 'Hold to talk on team voice without toggling open mic.',
    id: 'rec-ptt',
    key: 'b',
    label: 'Push-to-talk',
    mmSafe: true,
  },
  {
    category: 'misc',
    command: '+lookatweapon',
    description: 'Hold to inspect the equipped weapon or knife.',
    id: 'rec-inspect',
    key: 'f',
    label: 'Inspect weapon',
    mmSafe: true,
  },
  {
    category: 'misc',
    command: 'toggle cl_showfps 0 1',
    description: 'Show or hide the FPS overlay on demand.',
    id: 'rec-fps-toggle',
    key: 'p',
    label: 'Toggle FPS counter',
    mmSafe: true,
  },
  {
    category: 'misc',
    command: 'toggle r_show_build_info 0 1',
    description:
      'Hide or show the version/build watermark in the bottom-left corner. Default is on; Valve asks for it in bug clips, so keep a key to bring it back.',
    id: 'rec-build-info-toggle',
    key: 'f11',
    label: 'Toggle build info text',
    mmSafe: true,
  },
  {
    category: 'misc',
    command: 'switchhands',
    description:
      'CS2 hand swap. H is the default bind. Persistent preference is `cl_prefer_lefthanded` in config — `cl_righthand` is gone.',
    id: 'rec-hand-toggle',
    key: 'h',
    label: 'Swap weapon hand',
    mmSafe: true,
  },
];

export function getRecommendedTemplateById(id: string) {
  return RECOMMENDED_BIND_TEMPLATES.find((template) => template.id === id);
}

export function isRecommendedBindId(id: string): boolean {
  return id.startsWith('rec-');
}
