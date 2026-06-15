import type { Metadata } from 'next';

import { RecommendedConfigPage } from '@/features/config/ui/recommended/recommended-config-page';

export const metadata: Metadata = {
  title: 'Recommended config',
  description:
    'Curated CS2 cvar bundles — viewmodel, radar, network, and performance settings from csdb.gg and lineups.gg.',
};

export default function ConfigRecommendedPage() {
  return <RecommendedConfigPage />;
}
