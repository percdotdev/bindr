import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';

import { getGuideEntry, getGuideSlugs } from '@/features/guides/lib/get-guides';
import { guideCopyKeys } from '@/features/guides/lib/guide-copy-keys';
import { GuideArticle } from '@/features/guides/ui/guide-article';
import { createPageMetadata } from '@/shared/lib/page-metadata';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const entry = getGuideEntry(slug);

  if (!entry) {
    return {};
  }

  const t = await getTranslations('guides');
  const copy = guideCopyKeys(entry.meta.slug);

  return createPageMetadata({
    description: t(copy.description),
    locale,
    path: `/guides/${slug}`,
    title: t(copy.title),
    type: 'article',
  });
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const entry = getGuideEntry(slug);

  if (!entry) {
    notFound();
  }

  const t = await getTranslations('guides');
  const copy = guideCopyKeys(entry.meta.slug);
  const { default: Content } = await entry.load(locale);

  return (
    <GuideArticle
      Content={Content}
      description={t(copy.description)}
      locale={locale}
      meta={entry.meta}
      title={t(copy.title)}
    />
  );
}
