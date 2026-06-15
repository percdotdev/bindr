import {
  GUIDES,
  type GuideEntry,
  type GuideMeta,
} from '@/features/guides/lib/registry';

export function getGuideMetas(): GuideMeta[] {
  return GUIDES.map((entry) => entry.meta).sort((a, b) =>
    b.date.localeCompare(a.date)
  );
}

export function getGuideSlugs(): string[] {
  return GUIDES.map((entry) => entry.meta.slug);
}

export function getGuideEntry(slug: string): GuideEntry | undefined {
  return GUIDES.find((entry) => entry.meta.slug === slug);
}
