const BIND_ITEM_KEYS = [
  'rec-build-info-toggle',
  'rec-buy-awp',
  'rec-buy-force',
  'rec-buy-full',
  'rec-buy-pistol',
  'rec-decoy',
  'rec-drop',
  'rec-flash',
  'rec-fps-toggle',
  'rec-hand-toggle',
  'rec-he',
  'rec-inspect',
  'rec-knife',
  'rec-lineup-release',
  'rec-molotov',
  'rec-mwheel-jump',
  'rec-ptt',
  'rec-radar-hud',
  'rec-radar-zoom',
  'rec-smoke',
] as const;

export type BindItemKey = (typeof BIND_ITEM_KEYS)[number];

const BIND_ITEM_KEY_SET = new Set<string>(BIND_ITEM_KEYS);

export function asBindItemKey(id: string): BindItemKey | null {
  if (!BIND_ITEM_KEY_SET.has(id)) {
    return null;
  }

  return id as BindItemKey;
}
