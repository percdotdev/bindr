import type { Metadata } from 'next';

import { GuidesIndex } from '@/features/guides/ui/guides-index';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Setup guides and tricks for getting the most out of your Counter-Strike 2 config.',
};

export default function GuidesPage() {
  return <GuidesIndex />;
}
