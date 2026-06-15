'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import Link from 'next/link';

import { useAutoexec } from '@/features/autoexec/hooks/use-autoexec';
import type { AutoexecSectionId } from '@/features/autoexec/lib/compose/compose-autoexec';
import { AutoexecExportPanel } from '@/features/autoexec/ui/export/autoexec-export-panel';

interface SectionMeta {
  description: string;
  href: string;
  id: AutoexecSectionId;
  label: string;
}

const SECTIONS: SectionMeta[] = [
  {
    id: 'crosshair',
    label: 'Crosshair',
    description: 'Console commands and the CSGO share code.',
    href: '/crosshair',
  },
  {
    id: 'config',
    label: 'Game config',
    description: 'Viewmodel, mouse, radar, network, audio, performance, HUD.',
    href: '/config',
  },
  {
    id: 'binds',
    label: 'Binds',
    description: 'Key to command bindings, grouped by category.',
    href: '/binds',
  },
];

export function AutoexecEditor() {
  const { bindCount, cfg, include, toggleSection } = useAutoexec();

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='font-medium text-sm'>Autoexec composer</h1>
        <p className='text-muted-foreground text-xs'>
          Merge your crosshair, config and binds into a single{' '}
          <code className='rounded-none bg-muted px-1 py-0.5'>
            autoexec.cfg
          </code>
          . Toggle sections below, then copy or download.
        </p>
      </div>

      <AutoexecExportPanel cfg={cfg} />

      <Card>
        <CardHeader>
          <CardTitle>Include</CardTitle>
          <p className='text-muted-foreground text-xs'>
            Pick which feature slices go into the file. Edit each one in its own
            tool.
          </p>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          {SECTIONS.map((section) => {
            const id = `autoexec-${section.id}`;
            const isBinds = section.id === 'binds';

            return (
              <div
                className='flex items-center justify-between gap-4'
                key={section.id}
              >
                <div className='flex min-w-0 flex-col gap-0.5'>
                  <Label htmlFor={id}>
                    {section.label}
                    {isBinds ? (
                      <span className='ml-2 text-muted-foreground text-xs'>
                        {bindCount} bind{bindCount === 1 ? '' : 's'}
                      </span>
                    ) : null}
                  </Label>
                  <span className='text-muted-foreground text-xs'>
                    {section.description}{' '}
                    <Link
                      className='underline-offset-4 hover:underline'
                      href={section.href}
                    >
                      Edit →
                    </Link>
                  </span>
                </div>
                <Switch
                  checked={include[section.id]}
                  id={id}
                  onCheckedChange={() => toggleSection(section.id)}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <p className='text-muted-foreground text-xs'>
            Run once in console with{' '}
            <code className='rounded-none bg-muted px-1 py-0.5'>
              exec autoexec
            </code>{' '}
            after dropping the file in your cfg folder.
          </p>
        </CardHeader>
        <CardContent>
          <pre className='max-h-[28rem] overflow-auto rounded-none bg-muted p-4 font-mono text-xs leading-relaxed'>
            {cfg}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
