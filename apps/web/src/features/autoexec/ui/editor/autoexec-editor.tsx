'use client';

import type { AutoexecSectionId } from '@workspace/cs2/autoexec/compose/compose-autoexec';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import Link from 'next/link';
import { useAutoexec } from '@/features/autoexec/hooks/use-autoexec';
import { AutoexecExportPanel } from '@/features/autoexec/ui/export/autoexec-export-panel';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';

interface SectionMeta {
  description: string;
  href: string;
  id: AutoexecSectionId;
  label: string;
}

const SECTIONS: SectionMeta[] = [
  {
    description: 'Console commands and the CS2 share code.',
    href: '/crosshair',
    id: 'crosshair',
    label: 'Crosshair',
  },
  {
    description: 'Viewmodel, mouse, radar, network, audio, performance, HUD.',
    href: '/config',
    id: 'config',
    label: 'Game config',
  },
  {
    description: 'Key to command bindings, grouped by category.',
    href: '/binds',
    id: 'binds',
    label: 'Binds',
  },
];

export function AutoexecEditor() {
  const { bindCount, cfg, include, toggleSection } = useAutoexec();

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-sm font-medium'>Autoexec composer</h1>
        <p className='text-muted-foreground text-xs'>
          Merge your crosshair, config and binds into a single{' '}
          <code className='bg-muted rounded-none px-1 py-0.5'>
            autoexec.cfg
          </code>
          . Toggle sections below, then copy or download.
        </p>
      </div>

      <AutoexecExportPanel cfg={cfg} />

      <CollapsibleSection
        contentClassName='flex flex-col gap-4'
        description='Pick which feature slices go into the file. Edit each one in its own tool.'
        title='Include'
      >
        <div className='border-foreground/10 flex items-center justify-between gap-4 border-b pb-4'>
          <div className='flex min-w-0 flex-col gap-0.5'>
            <Label htmlFor='autoexec-banner'>Console banner</Label>
            <span className='text-muted-foreground text-xs'>
              Echo a bindr.lol ASCII wordmark when the cfg loads.
            </span>
          </div>
          <Switch
            checked={include.banner}
            id='autoexec-banner'
            onCheckedChange={() => toggleSection('banner')}
          />
        </div>
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
                    <span className='text-muted-foreground ml-2 text-xs'>
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
      </CollapsibleSection>

      <CollapsibleSection
        description={
          <>
            Run once in console with{' '}
            <code className='bg-muted rounded-none px-1 py-0.5'>
              exec autoexec
            </code>{' '}
            after dropping the file in your cfg folder.
          </>
        }
        title='Preview'
      >
        <pre className='bg-muted max-h-[28rem] overflow-auto rounded-none p-4 font-mono text-xs leading-relaxed'>
          {cfg}
        </pre>
      </CollapsibleSection>
    </div>
  );
}
