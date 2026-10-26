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
  buy: 'Buy binds',
  comms: 'Communication',
  lineups: 'Smoke lineups',
  misc: 'HUD & toggles',
  movement: 'Movement',
  radar: 'Radar',
  utility: 'Grenades & utility',
  weapons: 'Weapons',
};
