/** Ordered like the in-game dropdown (settings_crosshair.xml). */
export const CROSSHAIR_STYLE_OPTIONS = [
  {
    value: 4,
    label: 'Static Cross',
    description: 'Fixed cross. Most common in pro configs.',
  },
  {
    value: 3,
    label: 'Static Circle',
    description: 'Fixed ring around the center.',
  },
  {
    value: 8,
    label: 'Static Square',
    description: 'Fixed square around the center.',
  },
  {
    value: 6,
    label: 'Dot Only',
    description: 'Just the center dot. Sized by thickness.',
  },
  {
    value: 9,
    label: 'Static Quadrant',
    description: 'Fixed ring split into four arcs. Arc size is adjustable.',
  },
  {
    value: 0,
    label: 'Dynamic Cross',
    description: 'Cross that spreads with real weapon inaccuracy.',
  },
  {
    value: 1,
    label: 'Dynamic Circle',
    description: 'Ring that grows with real weapon inaccuracy.',
  },
  {
    value: 2,
    label: 'Dynamic Cross (Classic)',
    description: 'CS:GO-era dynamic cross with split arms and negative gaps.',
  },
  {
    value: 5,
    label: 'Dynamic Cross (Legacy/Shot Feedback)',
    description: 'Static cross that only reacts when firing.',
  },
  {
    value: 7,
    label: 'Dynamic Quadrant',
    description: 'Four arcs that spread with inaccuracy. Game default.',
  },
] as const;

export type CrosshairStyleValue =
  (typeof CROSSHAIR_STYLE_OPTIONS)[number]['value'];

const CLASSIC_STYLE = 2;
const DOT_ONLY_STYLE = 6;
const STATIC_QUADRANT_STYLE = 9;

const DYNAMIC_STYLES = new Set([0, 1, 2, 5, 7]);
const SPREAD_LIMIT_STYLES = new Set([0, 1, 7]);
const LENGTH_STYLES = new Set([0, 2, 4, 5, 7]);
const GAP_STYLES = new Set([0, 2, 3, 4, 5, 7, 8, 9]);

export function isDynamicCrosshairStyle(style: number): boolean {
  return DYNAMIC_STYLES.has(style);
}

export function isClassicCrosshairStyle(style: number): boolean {
  return style === CLASSIC_STYLE;
}

/** Only the classic dynamic style honours gaps below zero. */
export function allowsNegativeCrosshairGap(style: number): boolean {
  return style === CLASSIC_STYLE;
}

export function showsCrosshairLengthControl(style: number): boolean {
  return LENGTH_STYLES.has(style);
}

export function showsCrosshairGapControl(style: number): boolean {
  return GAP_STYLES.has(style);
}

export function showsCrosshairTStyleControl(style: number): boolean {
  return LENGTH_STYLES.has(style);
}

export function showsCrosshairCenterDotControl(style: number): boolean {
  return style !== DOT_ONLY_STYLE;
}

export function showsSpreadLimitControl(style: number): boolean {
  return SPREAD_LIMIT_STYLES.has(style);
}

export function showsClassicSplitControls(style: number): boolean {
  return style === CLASSIC_STYLE;
}

export function showsQuadrantSizeControl(style: number): boolean {
  return style === STATIC_QUADRANT_STYLE;
}

export function getCrosshairStyleLabel(style: number): string {
  return (
    CROSSHAIR_STYLE_OPTIONS.find((option) => option.value === style)?.label ??
    `Style ${style}`
  );
}

export function getCrosshairStyleDescription(
  style: number
): string | undefined {
  return CROSSHAIR_STYLE_OPTIONS.find((option) => option.value === style)
    ?.description;
}
