import type { Metadata } from 'next';

import { ConfigEditor } from '@/features/config/ui/editor/config-editor';

export const metadata: Metadata = {
  title: 'Game config editor',
  description:
    'Tune CS2 viewmodel, mouse, radar, network, audio, performance and HUD cvars, then copy or download a cfg snippet.',
};

export default function ConfigPage() {
  return <ConfigEditor />;
}
