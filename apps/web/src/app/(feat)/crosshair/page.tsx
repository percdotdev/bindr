import { Suspense } from 'react';

import { CrosshairEditor } from '@/features/crosshair/ui/editor/crosshair-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  title: 'Crosshair editor',
  description:
    'Import CS2 crosshair share codes, tweak gap, color and style, preview on real map backgrounds, and export console commands.',
  path: '/crosshair',
});

export default function CrosshairPage() {
  return (
    <Suspense>
      <CrosshairEditor />
    </Suspense>
  );
}
