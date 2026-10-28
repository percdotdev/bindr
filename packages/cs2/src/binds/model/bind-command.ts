const LINE_BREAKS = /[\r\n]+/gu;

/**
 * CS2 cfg files have no escape sequence for `"` inside a quoted bind
 * command, and a line break ends the cfg line. Either one breaks the
 * exported `bind "<key>" "<command>"` line.
 */
export function hasInvalidBindCommandChars(command: string): boolean {
  return (
    command.includes('"') || command.includes('\n') || command.includes('\r')
  );
}

/** Strips characters that cannot be represented inside a quoted bind. */
export function sanitizeBindCommand(command: string): string {
  return command.replace(LINE_BREAKS, ' ').replaceAll('"', '').trim();
}
