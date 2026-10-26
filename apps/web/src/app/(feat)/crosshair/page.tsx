import { Suspense } from 'react';

import { CrosshairEditor } from '@/features/crosshair/ui/editor/crosshair-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  description:
    'Import CS2 crosshair share codes, tweak gap, color and style, preview on real map backgrounds, and export the share code plus console commands.',
  path: '/crosshair',
  title: 'Crosshair editor',
});

export default function CrosshairPage() {
  return (
    <Suspense>
      <CrosshairEditor />
    </Suspense>
  );
}
