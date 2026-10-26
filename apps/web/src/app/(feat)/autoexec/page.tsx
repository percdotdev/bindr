import { AutoexecEditor } from '@/features/autoexec/ui/editor/autoexec-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  description:
    'Merge your CS2 crosshair, config and binds into a single autoexec.cfg with per-section toggles and an ASCII banner, then copy or download it.',
  path: '/autoexec',
  title: 'Autoexec composer',
});

export default function AutoexecPage() {
  return <AutoexecEditor />;
}
