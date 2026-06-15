import { ConfigEditor } from '@/features/config/ui/editor/config-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  title: 'Game config editor',
  description:
    'Tune CS2 viewmodel, mouse, radar, network, audio, performance and HUD cvars with sliders, then copy or download a cfg snippet.',
  path: '/config',
});

export default function ConfigPage() {
  return <ConfigEditor />;
}
