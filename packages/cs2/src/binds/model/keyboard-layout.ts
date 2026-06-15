export interface KeyboardKey {
  bindKey: string;
  col: number;
  colSpan?: number;
  label: string;
  row: number;
}

export const KEYBOARD_LAYOUT: KeyboardKey[] = [
  { bindKey: 'esc', label: 'Esc', row: 0, col: 0 },
  { bindKey: 'f1', label: 'F1', row: 0, col: 1 },
  { bindKey: 'f2', label: 'F2', row: 0, col: 2 },
  { bindKey: 'f3', label: 'F3', row: 0, col: 3 },
  { bindKey: 'f4', label: 'F4', row: 0, col: 4 },
  { bindKey: 'f5', label: 'F5', row: 0, col: 5 },
  { bindKey: 'f6', label: 'F6', row: 0, col: 6 },
  { bindKey: 'f7', label: 'F7', row: 0, col: 7 },
  { bindKey: 'f8', label: 'F8', row: 0, col: 8 },
  { bindKey: 'f9', label: 'F9', row: 0, col: 9 },
  { bindKey: 'f10', label: 'F10', row: 0, col: 10 },
  { bindKey: 'f11', label: 'F11', row: 0, col: 11 },
  { bindKey: 'f12', label: 'F12', row: 0, col: 12 },

  { bindKey: '`', label: '`', row: 1, col: 0 },
  { bindKey: '1', label: '1', row: 1, col: 1 },
  { bindKey: '2', label: '2', row: 1, col: 2 },
  { bindKey: '3', label: '3', row: 1, col: 3 },
  { bindKey: '4', label: '4', row: 1, col: 4 },
  { bindKey: '5', label: '5', row: 1, col: 5 },
  { bindKey: '6', label: '6', row: 1, col: 6 },
  { bindKey: '7', label: '7', row: 1, col: 7 },
  { bindKey: '8', label: '8', row: 1, col: 8 },
  { bindKey: '9', label: '9', row: 1, col: 9 },
  { bindKey: '0', label: '0', row: 1, col: 10 },
  { bindKey: '-', label: '-', row: 1, col: 11 },
  { bindKey: '=', label: '=', row: 1, col: 12 },
  { bindKey: 'backspace', label: 'Backspace', row: 1, col: 13, colSpan: 2 },

  { bindKey: 'tab', label: 'Tab', row: 2, col: 0, colSpan: 2 },
  { bindKey: 'q', label: 'Q', row: 2, col: 2 },
  { bindKey: 'w', label: 'W', row: 2, col: 3 },
  { bindKey: 'e', label: 'E', row: 2, col: 4 },
  { bindKey: 'r', label: 'R', row: 2, col: 5 },
  { bindKey: 't', label: 'T', row: 2, col: 6 },
  { bindKey: 'y', label: 'Y', row: 2, col: 7 },
  { bindKey: 'u', label: 'U', row: 2, col: 8 },
  { bindKey: 'i', label: 'I', row: 2, col: 9 },
  { bindKey: 'o', label: 'O', row: 2, col: 10 },
  { bindKey: 'p', label: 'P', row: 2, col: 11 },
  { bindKey: '[', label: '[', row: 2, col: 12 },
  { bindKey: ']', label: ']', row: 2, col: 13 },
  { bindKey: '\\', label: '\\', row: 2, col: 14 },

  { bindKey: 'capslock', label: 'Caps', row: 3, col: 0, colSpan: 2 },
  { bindKey: 'a', label: 'A', row: 3, col: 2 },
  { bindKey: 's', label: 'S', row: 3, col: 3 },
  { bindKey: 'd', label: 'D', row: 3, col: 4 },
  { bindKey: 'f', label: 'F', row: 3, col: 5 },
  { bindKey: 'g', label: 'G', row: 3, col: 6 },
  { bindKey: 'h', label: 'H', row: 3, col: 7 },
  { bindKey: 'j', label: 'J', row: 3, col: 8 },
  { bindKey: 'k', label: 'K', row: 3, col: 9 },
  { bindKey: 'l', label: 'L', row: 3, col: 10 },
  { bindKey: ';', label: ';', row: 3, col: 11 },
  { bindKey: "'", label: "'", row: 3, col: 12 },
  { bindKey: 'enter', label: 'Enter', row: 3, col: 13, colSpan: 2 },

  { bindKey: 'shift', label: 'Shift', row: 4, col: 0, colSpan: 3 },
  { bindKey: 'z', label: 'Z', row: 4, col: 3 },
  { bindKey: 'x', label: 'X', row: 4, col: 4 },
  { bindKey: 'c', label: 'C', row: 4, col: 5 },
  { bindKey: 'v', label: 'V', row: 4, col: 6 },
  { bindKey: 'b', label: 'B', row: 4, col: 7 },
  { bindKey: 'n', label: 'N', row: 4, col: 8 },
  { bindKey: 'm', label: 'M', row: 4, col: 9 },
  { bindKey: ',', label: ',', row: 4, col: 10 },
  { bindKey: '.', label: '.', row: 4, col: 11 },
  { bindKey: '/', label: '/', row: 4, col: 12 },
  { bindKey: 'rshift', label: 'Shift', row: 4, col: 13, colSpan: 2 },

  { bindKey: 'ctrl', label: 'Ctrl', row: 5, col: 0, colSpan: 2 },
  { bindKey: 'alt', label: 'Alt', row: 5, col: 2, colSpan: 2 },
  { bindKey: 'space', label: 'Space', row: 5, col: 4, colSpan: 6 },
  { bindKey: 'ralt', label: 'Alt', row: 5, col: 10, colSpan: 2 },
  { bindKey: 'rctrl', label: 'Ctrl', row: 5, col: 12, colSpan: 2 },

  { bindKey: 'mouse1', label: 'M1', row: 6, col: 0 },
  { bindKey: 'mouse2', label: 'M2', row: 6, col: 1 },
  { bindKey: 'mouse3', label: 'M3', row: 6, col: 2 },
  { bindKey: 'mouse4', label: 'M4', row: 6, col: 3 },
  { bindKey: 'mouse5', label: 'M5', row: 6, col: 4 },
  { bindKey: 'mwheelup', label: 'MW↑', row: 6, col: 5 },
  { bindKey: 'mwheeldown', label: 'MW↓', row: 6, col: 6 },
];

export const KEYBOARD_ROW_COUNT = 7;
export const KEYBOARD_COLUMN_COUNT = 15;
