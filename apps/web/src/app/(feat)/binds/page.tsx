import { BindEditor } from '@/features/binds/ui/editor/bind-editor';
import { createPageMetadata } from '@/shared/lib/page-metadata';

export const metadata = createPageMetadata({
  title: 'Bind generator',
  description:
    'Build CS2 bind configs on a visual keyboard layout, then export grouped bind lines or a ready-to-paste cfg snippet.',
  path: '/binds',
});

export default function BindsPage() {
  return <BindEditor />;
}
