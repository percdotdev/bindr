import { Suspense } from 'react';

import { CrosshairEditor } from '@/features/crosshair/ui/crosshair-editor';

export default function Page() {
  return (
    <Suspense>
      <CrosshairEditor />
    </Suspense>
  );
}
