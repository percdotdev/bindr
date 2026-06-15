import { RecommendedConfigPage } from '@/features/config/ui/recommended/recommended-config-page';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  title: 'Recommended config',
  description:
    'Curated CS2 cvar bundles — viewmodel, mouse, radar, network, audio, performance and HUD settings from csdb.gg and lineups.gg.',
  path: '/config/recommended',
});

export default function ConfigRecommendedPage() {
  return <RecommendedConfigPage />;
}
