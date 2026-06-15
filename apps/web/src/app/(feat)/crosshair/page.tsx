import type { Metadata } from 'next';
import { Suspense } from 'react';

import { CrosshairEditor } from '@/features/crosshair/ui/editor/crosshair-editor';

export const metadata: Metadata = {
  title: 'Crosshair editor',
  description:
    'Import CS2 share codes, preview crosshairs on map backgrounds, and export console commands.',
};

export default function CrosshairPage() {
  return (
    <Suspense>
      <CrosshairEditor />
    </Suspense>
  );
}
