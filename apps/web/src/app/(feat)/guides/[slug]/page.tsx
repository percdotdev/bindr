import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getGuideEntry, getGuideSlugs } from '@/features/guides/lib/get-guides';
import { GuideArticle } from '@/features/guides/ui/guide-article';

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
  const entry = getGuideEntry(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.meta.title,
    description: entry.meta.description,
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const entry = getGuideEntry(slug);

  if (!entry) {
    notFound();
  }

  const { default: Content } = await entry.load();

  return <GuideArticle Content={Content} meta={entry.meta} />;
}
