import type { BindCategory } from '@workspace/cs2/binds/model/types';

export const BIND_CATEGORY_ORDER: BindCategory[] = [
  'utility',
  'lineups',
  'weapons',
  'buy',
  'movement',
  'radar',
  'comms',
  'misc',
];

export const BIND_CATEGORY_LABELS: Record<BindCategory, string> = {
  utility: 'Grenades & utility',
  lineups: 'Smoke lineups',
  weapons: 'Weapons',
  buy: 'Buy binds',
  movement: 'Movement',
  radar: 'Radar',
  comms: 'Communication',
  misc: 'HUD & toggles',
};
