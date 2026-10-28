export interface KeyboardKey {
  bindKey: string;
  col: number;
  colSpan?: number;
  label: string;
  row: number;
  rowSpan?: number;
}

export const KEYBOARD_LAYOUT: KeyboardKey[] = [
  { bindKey: 'esc', col: 0, label: 'Esc', row: 0 },
  { bindKey: 'f1', col: 1, label: 'F1', row: 0 },
  { bindKey: 'f2', col: 2, label: 'F2', row: 0 },
  { bindKey: 'f3', col: 3, label: 'F3', row: 0 },
  { bindKey: 'f4', col: 4, label: 'F4', row: 0 },
  { bindKey: 'f5', col: 5, label: 'F5', row: 0 },
  { bindKey: 'f6', col: 6, label: 'F6', row: 0 },
  { bindKey: 'f7', col: 7, label: 'F7', row: 0 },
  { bindKey: 'f8', col: 8, label: 'F8', row: 0 },
  { bindKey: 'f9', col: 9, label: 'F9', row: 0 },
  { bindKey: 'f10', col: 10, label: 'F10', row: 0 },
  { bindKey: 'f11', col: 11, label: 'F11', row: 0 },
  { bindKey: 'f12', col: 12, label: 'F12', row: 0 },

  { bindKey: '`', col: 0, label: '`', row: 1 },
  { bindKey: '1', col: 1, label: '1', row: 1 },
  { bindKey: '2', col: 2, label: '2', row: 1 },
  { bindKey: '3', col: 3, label: '3', row: 1 },
  { bindKey: '4', col: 4, label: '4', row: 1 },
  { bindKey: '5', col: 5, label: '5', row: 1 },
  { bindKey: '6', col: 6, label: '6', row: 1 },
  { bindKey: '7', col: 7, label: '7', row: 1 },
  { bindKey: '8', col: 8, label: '8', row: 1 },
  { bindKey: '9', col: 9, label: '9', row: 1 },
  { bindKey: '0', col: 10, label: '0', row: 1 },
  { bindKey: '-', col: 11, label: '-', row: 1 },
  { bindKey: '=', col: 12, label: '=', row: 1 },
  { bindKey: 'backspace', col: 13, colSpan: 2, label: 'Backspace', row: 1 },

  { bindKey: 'tab', col: 0, colSpan: 2, label: 'Tab', row: 2 },
  { bindKey: 'q', col: 2, label: 'Q', row: 2 },
  { bindKey: 'w', col: 3, label: 'W', row: 2 },
  { bindKey: 'e', col: 4, label: 'E', row: 2 },
  { bindKey: 'r', col: 5, label: 'R', row: 2 },
  { bindKey: 't', col: 6, label: 'T', row: 2 },
  { bindKey: 'y', col: 7, label: 'Y', row: 2 },
  { bindKey: 'u', col: 8, label: 'U', row: 2 },
  { bindKey: 'i', col: 9, label: 'I', row: 2 },
  { bindKey: 'o', col: 10, label: 'O', row: 2 },
  { bindKey: 'p', col: 11, label: 'P', row: 2 },
  { bindKey: '[', col: 12, label: '[', row: 2 },
  { bindKey: ']', col: 13, label: ']', row: 2 },
  { bindKey: '\\', col: 14, label: '\\', row: 2 },

  { bindKey: 'capslock', col: 0, colSpan: 2, label: 'Caps', row: 3 },
  { bindKey: 'a', col: 2, label: 'A', row: 3 },
  { bindKey: 's', col: 3, label: 'S', row: 3 },
  { bindKey: 'd', col: 4, label: 'D', row: 3 },
  { bindKey: 'f', col: 5, label: 'F', row: 3 },
  { bindKey: 'g', col: 6, label: 'G', row: 3 },
  { bindKey: 'h', col: 7, label: 'H', row: 3 },
  { bindKey: 'j', col: 8, label: 'J', row: 3 },
  { bindKey: 'k', col: 9, label: 'K', row: 3 },
  { bindKey: 'l', col: 10, label: 'L', row: 3 },
  { bindKey: ';', col: 11, label: ';', row: 3 },
  { bindKey: "'", col: 12, label: "'", row: 3 },
  { bindKey: 'enter', col: 13, colSpan: 2, label: 'Enter', row: 3 },

  { bindKey: 'shift', col: 0, colSpan: 3, label: 'Shift', row: 4 },
  { bindKey: 'z', col: 3, label: 'Z', row: 4 },
  { bindKey: 'x', col: 4, label: 'X', row: 4 },
  { bindKey: 'c', col: 5, label: 'C', row: 4 },
  { bindKey: 'v', col: 6, label: 'V', row: 4 },
  { bindKey: 'b', col: 7, label: 'B', row: 4 },
  { bindKey: 'n', col: 8, label: 'N', row: 4 },
  { bindKey: 'm', col: 9, label: 'M', row: 4 },
  { bindKey: ',', col: 10, label: ',', row: 4 },
  { bindKey: '.', col: 11, label: '.', row: 4 },
  { bindKey: '/', col: 12, label: '/', row: 4 },
  { bindKey: 'rshift', col: 13, colSpan: 2, label: 'Shift', row: 4 },

  { bindKey: 'ctrl', col: 0, colSpan: 2, label: 'Ctrl', row: 5 },
  { bindKey: 'alt', col: 2, colSpan: 2, label: 'Alt', row: 5 },
  { bindKey: 'space', col: 4, colSpan: 6, label: 'Space', row: 5 },
  { bindKey: 'ralt', col: 10, colSpan: 2, label: 'Alt', row: 5 },
  { bindKey: 'rctrl', col: 12, colSpan: 2, label: 'Ctrl', row: 5 },

  { bindKey: 'ins', col: 16, label: 'Ins', row: 1 },
  { bindKey: 'home', col: 17, label: 'Home', row: 1 },
  { bindKey: 'pgup', col: 18, label: 'PgUp', row: 1 },
  { bindKey: 'del', col: 16, label: 'Del', row: 2 },
  { bindKey: 'end', col: 17, label: 'End', row: 2 },
  { bindKey: 'pgdn', col: 18, label: 'PgDn', row: 2 },
  { bindKey: 'uparrow', col: 17, label: '↑', row: 4 },
  { bindKey: 'leftarrow', col: 16, label: '←', row: 5 },
  { bindKey: 'downarrow', col: 17, label: '↓', row: 5 },
  { bindKey: 'rightarrow', col: 18, label: '→', row: 5 },

  // CS2 (Source 2) numpad names: kp_0-kp_9 replace CS:GO's kp_end/kp_ins/...,
  // and numpad slash is kp_divide (CS2 rejects kp_slash as "isn't a valid key").
  { bindKey: 'numlock', col: 20, label: 'Num', row: 1 },
  { bindKey: 'kp_divide', col: 21, label: '/', row: 1 },
  { bindKey: 'kp_multiply', col: 22, label: '*', row: 1 },
  { bindKey: 'kp_minus', col: 23, label: '-', row: 1 },
  { bindKey: 'kp_7', col: 20, label: '7', row: 2 },
  { bindKey: 'kp_8', col: 21, label: '8', row: 2 },
  { bindKey: 'kp_9', col: 22, label: '9', row: 2 },
  { bindKey: 'kp_plus', col: 23, label: '+', row: 2, rowSpan: 2 },
  { bindKey: 'kp_4', col: 20, label: '4', row: 3 },
  { bindKey: 'kp_5', col: 21, label: '5', row: 3 },
  { bindKey: 'kp_6', col: 22, label: '6', row: 3 },
  { bindKey: 'kp_1', col: 20, label: '1', row: 4 },
  { bindKey: 'kp_2', col: 21, label: '2', row: 4 },
  { bindKey: 'kp_3', col: 22, label: '3', row: 4 },
  { bindKey: 'kp_enter', col: 23, label: 'Enter', row: 4, rowSpan: 2 },
  { bindKey: 'kp_0', col: 20, colSpan: 2, label: '0', row: 5 },
  { bindKey: 'kp_del', col: 22, label: '.', row: 5 },

  { bindKey: 'mouse1', col: 0, label: 'M1', row: 6 },
  { bindKey: 'mouse2', col: 1, label: 'M2', row: 6 },
  { bindKey: 'mouse3', col: 2, label: 'M3', row: 6 },
  { bindKey: 'mouse4', col: 3, label: 'M4', row: 6 },
  { bindKey: 'mouse5', col: 4, label: 'M5', row: 6 },
  { bindKey: 'mwheelup', col: 5, label: 'MW↑', row: 6 },
  { bindKey: 'mwheeldown', col: 6, label: 'MW↓', row: 6 },
];

export const KEYBOARD_ROW_COUNT = 7;
export const KEYBOARD_COLUMN_COUNT = 24;

/** Empty narrow columns between the main block, nav cluster and numpad. */
export const KEYBOARD_SPACER_COLUMNS: readonly number[] = [15, 19];
