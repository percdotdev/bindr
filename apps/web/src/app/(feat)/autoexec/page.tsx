import type { Metadata } from 'next';

import { AutoexecEditor } from '@/features/autoexec/ui/editor/autoexec-editor';

export const metadata: Metadata = {
  title: 'Autoexec composer',
  description:
    'Merge your CS2 crosshair, config and binds into a single autoexec.cfg, then copy or download it.',
};

export default function AutoexecPage() {
  return <AutoexecEditor />;
}
