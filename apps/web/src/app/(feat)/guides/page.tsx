import { GuidesIndex } from '@/features/guides/ui/guides-index';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  description:
    'Setup guides and tricks for getting the most out of your Counter-Strike 2 config, crosshair, binds and autoexec.',
  path: '/guides',
  title: 'Guides',
});

export default function GuidesPage() {
  return <GuidesIndex />;
}
