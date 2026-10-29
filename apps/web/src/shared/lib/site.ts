import { type AppLocale, routing } from '@/i18n/routing';

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

export const SITE_IMAGE = {
  alt: `${SITE.name} — CS2 crosshair, binds & config tools`,
  height: 630,
  width: 1200,
} as const;

export function socialImagePath(locale: AppLocale) {
  return locale === routing.defaultLocale
    ? '/opengraph-image'
    : `/${locale}/opengraph-image`;
}
