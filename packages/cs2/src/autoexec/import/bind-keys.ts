import { KEYBOARD_LAYOUT } from '@workspace/cs2/binds/model/keyboard-layout';

const BIND_KEY_PATTERN = /^[\u0021-\u007e]{1,32}$/u;

/**
 * CS2 cfg names that are not the bindr keyboard id.
 * Scancodes (`scancode54`) are left alone.
 */
const CS2_KEY_ALIASES: Record<string, string> = {
  apostrophe: "'",
  backquote: '`',
  backslash: '\\',
  caps: 'capslock',
  comma: ',',
  control: 'ctrl',
  delete: 'del',
  down: 'downarrow',
  equal: '=',
  equals: '=',
  escape: 'esc',
  insert: 'ins',
  lalt: 'alt',
  lbrack: '[',
  lbracket: '[',
  lctrl: 'ctrl',
  left: 'leftarrow',
  lshift: 'shift',
  minus: '-',
  pagedown: 'pgdn',
  pageup: 'pgup',
  period: '.',
  quote: "'",
  rbrack: ']',
  rbracket: ']',
  return: 'enter',
  right: 'rightarrow',
  semicolon: ';',
  slash: '/',
  tilde: '`',
  up: 'uparrow',
};

const KEY_BY_NAME = new Map<string, string>();

for (const key of KEYBOARD_LAYOUT) {
  KEY_BY_NAME.set(key.bindKey.toLowerCase(), key.bindKey);
}

for (const [alias, bindKey] of Object.entries(CS2_KEY_ALIASES)) {
  KEY_BY_NAME.set(alias, bindKey);
}

/** Maps a cfg bind key onto the editor key. `MOUSE_X` stays `mouse_x`. */
export function normalizeBindKey(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed.length === 0 || trimmed.includes('"')) {
    return null;
  }

  const known = KEY_BY_NAME.get(trimmed.toLowerCase());
  if (known) {
    return known;
  }

  const key = trimmed.toLowerCase();
  if (!BIND_KEY_PATTERN.test(key)) {
    return null;
  }

  return key;
}
