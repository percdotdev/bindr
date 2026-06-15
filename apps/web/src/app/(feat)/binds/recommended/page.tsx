import { RecommendedBindsPage } from '@/features/binds/ui/recommended/recommended-binds-page';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  title: 'Recommended binds',
  description:
    'Curated MM-safe CS2 bind templates — grenade slots, jumpthrow, knife, drop, lineup release and radar toggles. Add individually or take the full set.',
  path: '/binds/recommended',
});

export default function BindsRecommendedPage() {
  return <RecommendedBindsPage />;
}
