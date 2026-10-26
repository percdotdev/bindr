const FALLBACK_URL = 'https://bindr.lol';

export const SITE = {
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
  name: 'bindr.lol',
  ogLocales: {
    en: 'en_US',
    es: 'es_ES',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL,
} as const;
