import type { Metadata } from 'next';

import { ConfigEditor } from '@/features/config/ui/editor/config-editor';

export const metadata: Metadata = {
  title: 'Game config editor',
  description:
    'Tune CS2 viewmodel FOV and offsets with presets, then copy or download a cfg snippet.',
};

export default function ConfigPage() {
  return <ConfigEditor />;
}
