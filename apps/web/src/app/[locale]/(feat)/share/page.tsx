import { decodeStudioShare } from '@workspace/cs2/share/studio-share-codec';
import { getLocale, getTranslations } from 'next-intl/server';

import { ShareImport } from '@/features/share/ui/share-import';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface SharePageProps {
  searchParams: Promise<{ d?: string | string[] }>;
}

function readToken(value: string | string[] | undefined): string | null {
  if (typeof value !== 'string' || value.length === 0) {
    return null;
  }
  return value;
}

export async function generateMetadata({ searchParams }: SharePageProps) {
  const { d } = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations('pages.share');
  const metadata = createPageMetadata({
    description: t('description'),
    locale,
    path: '/share',
    title: t('title'),
  });

  if (readToken(d)) {
    return {
      ...metadata,
      robots: { follow: false, index: false },
    };
  }

  return metadata;
}

export default async function SharePage({ searchParams }: SharePageProps) {
  const { d } = await searchParams;
  const token = readToken(d);
  if (!token) {
    return <ShareImport share={null} status='empty' />;
  }

  const share = await decodeStudioShare(token);
  if (!share) {
    return <ShareImport share={null} status='invalid' />;
  }

  return <ShareImport share={share} status='ready' />;
}
