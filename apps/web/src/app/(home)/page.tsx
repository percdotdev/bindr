import type { Metadata } from 'next';

import { HomePage } from '@/features/home/ui/home-page';

export const metadata: Metadata = {
  title: 'CS2 crosshairs & binds in your browser',
  description:
    'Import CS2 crosshair share codes, preview on map backgrounds, and build bind configs with bindr.lol.',
};

export default function Page() {
  return <HomePage />;
}
