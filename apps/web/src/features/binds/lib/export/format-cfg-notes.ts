/**
 * Extra autoexec notes for exports. Classic single-key jump-throw aliases were
 * disabled on Valve official servers in Aug 2024 (multi-input automation ban).
 */
export function formatBindCfgNotes(): string {
  return [
    '',
    '// --- Lineup notes ---',
    '// For jump smokes on Valve MM: hold Space, press N (-attack) at jump peak.',
    '// Single-key jump-throw aliases no longer work on official matchmaking.',
    '// Offline / practice only (uncomment if your server allows it):',
    '// alias "+jumpthrow" "+jump;-attack"',
    '// alias "-jumpthrow" "-jump"',
    '// bind "v" "+jumpthrow"',
    '',
  ].join('\n');
}
