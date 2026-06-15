export const CROSSHAIR_STYLE_OPTIONS = [
  {
    value: 0,
    label: 'Default',
    description: 'Dynamic crosshair that expands while moving or shooting.',
  },
  {
    value: 1,
    label: 'Default static',
    description: 'Default shape without movement expansion.',
  },
  {
    value: 2,
    label: 'Classic split',
    description: 'Classic cross with dynamic split arms.',
  },
  {
    value: 3,
    label: 'Classic dynamic',
    description: 'Classic cross that expands while moving or shooting.',
  },
  {
    value: 4,
    label: 'Classic static',
    description: 'Fixed classic cross. Most common in pro configs.',
  },
  {
    value: 5,
    label: 'Legacy',
    description: 'Legacy cross with static and dynamic behavior.',
  },
] as const;

export type CrosshairStyleValue =
  (typeof CROSSHAIR_STYLE_OPTIONS)[number]['value'];

const STATIC_STYLES = new Set<CrosshairStyleValue>([1, 4]);

export function showsDynamicCrosshairControls(style: number): boolean {
  return !STATIC_STYLES.has(style as CrosshairStyleValue);
}

export function showsSplitCrosshairControls(style: number): boolean {
  return style === 0 || style === 2 || style === 3 || style === 5;
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
