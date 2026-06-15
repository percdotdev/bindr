import { Suspense } from 'react';

import { CrosshairEditor } from '@/features/crosshair/ui/editor/crosshair-editor';

export default function CrosshairPage() {
  return (
    <Suspense>
      <CrosshairEditor />
    </Suspense>
  );
}
