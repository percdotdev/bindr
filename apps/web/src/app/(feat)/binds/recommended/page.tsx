import { RecommendedBindsPage } from '@/features/binds/ui/recommended/recommended-binds-page';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  description:
    'Curated MM-safe CS2 bind templates — grenade slots, knife, drop, lineup release, buy binds and radar toggles. Add individually or take the full set.',
  path: '/binds/recommended',
  title: 'Recommended binds',
});

export default function BindsRecommendedPage() {
  return <RecommendedBindsPage />;
}
