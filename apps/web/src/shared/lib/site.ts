import { type AppLocale, routing } from '@/i18n/routing';

const PRODUCTION_URL = 'https://www.bindr.lol';

// Scrapers request the absolute og:image URL and keep the first response.
// Apex bindr.lol answers that request with a 308, so metadata has to use the
// host that returns the image. In dev that host is this server.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:${process.env.PORT ?? '3000'}`;
  }

  return PRODUCTION_URL;
}

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
  url: resolveSiteUrl(),
} as const;

export const SITE_IMAGE = {
  alt: `${SITE.name} — CS2 crosshair, binds and config`,
  height: 630,
  width: 1200,
} as const;

export function socialImagePath(locale: AppLocale) {
  return locale === routing.defaultLocale
    ? '/opengraph-image'
    : `/${locale}/opengraph-image`;
}
