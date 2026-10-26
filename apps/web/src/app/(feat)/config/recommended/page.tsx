import { RecommendedConfigPage } from '@/features/config/ui/recommended/recommended-config-page';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  description:
    'Curated CS2 client cvar bundles — viewmodel, mouse, radar, network, audio, performance and HUD. CS:GO leftovers stripped.',
  path: '/config/recommended',
  title: 'Recommended config',
});

export default function ConfigRecommendedPage() {
  return <RecommendedConfigPage />;
}
