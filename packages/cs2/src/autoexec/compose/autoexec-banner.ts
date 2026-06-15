// ASCII wordmark (figlet "Slant"). Kept free of `"`, `//` and `;` so every line
// survives the Source 2 console parser when wrapped in echo "...".
const BANNER_ART = [
  '    __    _           __    ',
  '   / /_  (_)___  ____/ /____',
  '  / __ \\/ / __ \\/ __  / ___/',
  ' / /_/ / / / / / /_/ / /    ',
  '/_.___/_/_/ /_/\\__,_/_/     ',
];

const BANNER_RULE = '===============================================';
const BANNER_TAGLINE = '   bindr.lol  -  browser CS2 config studio';

function echoLine(text: string): string {
  return `echo "${text.trimEnd()}"`;
}

export function formatAutoexecBanner(): string[] {
  return [
    '// banner',
    echoLine(''),
    echoLine(BANNER_RULE),
    ...BANNER_ART.map(echoLine),
    echoLine(BANNER_TAGLINE),
    echoLine(BANNER_RULE),
    echoLine(''),
  ];
}
