import type { useTranslations } from 'next-intl';

type CommonT = ReturnType<typeof useTranslations<'common'>>;

const WORD_KEYS = new Set([
  'esc',
  'backspace',
  'tab',
  'capslock',
  'enter',
  'shift',
  'rshift',
  'ctrl',
  'rctrl',
  'alt',
  'ralt',
  'space',
]);

export function translateKeyLabel(
  t: CommonT,
  bindKey: string,
  fallback: string
): string {
  if (!WORD_KEYS.has(bindKey)) {
    return fallback;
  }

  return t(
    `keys.${bindKey as 'esc' | 'backspace' | 'tab' | 'capslock' | 'enter' | 'shift' | 'rshift' | 'ctrl' | 'rctrl' | 'alt' | 'ralt' | 'space'}`
  );
}
