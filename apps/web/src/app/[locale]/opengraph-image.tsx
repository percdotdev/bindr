import { routing } from '@/i18n/routing';
import {
  OG_ALT,
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from '@/shared/lib/og-image';

export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function OpengraphImage() {
  return renderOgImage();
}
