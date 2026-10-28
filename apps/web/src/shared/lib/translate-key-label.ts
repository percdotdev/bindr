import type { useTranslations } from 'next-intl';

type CommonT = ReturnType<typeof useTranslations<'common'>>;

const WORD_KEYS = [
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
  'ins',
  'home',
  'pgup',
  'del',
  'end',
  'pgdn',
  'kp_enter',
] as const;

type WordKey = (typeof WORD_KEYS)[number];

const WORD_KEY_SET: ReadonlySet<string> = new Set(WORD_KEYS);

function isWordKey(bindKey: string): bindKey is WordKey {
  return WORD_KEY_SET.has(bindKey);
}

export function translateKeyLabel(
  t: CommonT,
  bindKey: string,
  fallback: string
): string {
  if (!isWordKey(bindKey)) {
    return fallback;
  }

  return t(`keys.${bindKey}`);
}
