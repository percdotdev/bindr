import type { Metadata } from 'next';

import { BindEditor } from '@/features/binds/ui/editor/bind-editor';

export const metadata: Metadata = {
  title: 'Bind generator',
  description:
    'Build CS2 bind configs from a visual keyboard layout and export grouped bind lines or cfg snippets.',
};

export default function BindsPage() {
  return <BindEditor />;
}
