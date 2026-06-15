import type { Metadata } from 'next';

import { RecommendedBindsPage } from '@/features/binds/ui/recommended/recommended-binds-page';

export const metadata: Metadata = {
  title: 'Recommended binds',
  description:
    'Curated MM-safe CS2 bind templates — grenade slots, knife, drop, lineup release, and radar toggles.',
};

export default function BindsRecommendedPage() {
  return <RecommendedBindsPage />;
}
