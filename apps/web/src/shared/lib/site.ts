const FALLBACK_URL = 'https://bindr.lol';

export const SITE = {
  name: 'bindr.lol',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL,
  tagline: 'CS2 crosshair, binds & config tools',
  locale: 'en_US',
  description:
    'Free browser tools for Counter-Strike 2: import crosshair share codes, generate binds on a visual keyboard, tune cvars, and merge everything into one autoexec.cfg. MM-safe, no download, with curated catalogs and guides.',
  keywords: [
    'CS2 crosshair',
    'CS2 crosshair code',
    'crosshair generator',
    'CS2 binds',
    'bind generator',
    'jumpthrow bind',
    'CS2 config',
    'CS2 cvars',
    'autoexec.cfg',
    'autoexec generator',
    'viewmodel',
    'Counter-Strike 2 settings',
    'CS2 2026',
  ],
} as const;
