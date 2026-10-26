'use client';

import type { AutoexecSectionId } from '@workspace/cs2/autoexec/compose/compose-autoexec';
import { Label } from '@workspace/ui/components/label';
import { Switch } from '@workspace/ui/components/switch';
import { useTranslations } from 'next-intl';

import { useAutoexec } from '@/features/autoexec/hooks/use-autoexec';
import { AutoexecExportPanel } from '@/features/autoexec/ui/export/autoexec-export-panel';
import { Link } from '@/i18n/navigation';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';

const SECTION_IDS = [
  { href: '/crosshair' as const, id: 'crosshair' as const },
  { href: '/config' as const, id: 'config' as const },
  { href: '/binds' as const, id: 'binds' as const },
];

export function AutoexecEditor() {
  const t = useTranslations('autoexec');
  const { bindCount, cfg, include, toggleSection } = useAutoexec();

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-sm font-medium'>{t('title')}</h1>
        <p className='text-muted-foreground text-xs'>
          {t.rich('subtitleFull', {
            code: (chunks) => (
              <code className='bg-muted rounded-none px-1 py-0.5'>
                {chunks}
              </code>
            ),
          })}
        </p>
      </div>

      <AutoexecExportPanel cfg={cfg} />

      <CollapsibleSection
        contentClassName='flex flex-col gap-4'
        description={t('includeDescription')}
        title={t('include')}
      >
        <div className='border-foreground/10 flex items-center justify-between gap-4 border-b pb-4'>
          <div className='flex min-w-0 flex-col gap-0.5'>
            <Label htmlFor='autoexec-banner'>{t('banner')}</Label>
            <span className='text-muted-foreground text-xs'>
              {t('bannerDescription')}
            </span>
          </div>
          <Switch
            checked={include.banner}
            id='autoexec-banner'
            onCheckedChange={() => toggleSection('banner')}
          />
        </div>
        {SECTION_IDS.map((section) => {
          const id = `autoexec-${section.id}`;
          const isBinds = section.id === 'binds';
          const sliceKey = section.id as AutoexecSectionId &
            ('crosshair' | 'config' | 'binds');

          return (
            <div
              className='flex items-center justify-between gap-4'
              key={section.id}
            >
              <div className='flex min-w-0 flex-col gap-0.5'>
                <Label htmlFor={id}>
                  {t(`slices.${sliceKey}.label`)}
                  {isBinds ? (
                    <span className='text-muted-foreground ml-2 text-xs'>
                      {t('bindCount', { count: bindCount })}
                    </span>
                  ) : null}
                </Label>
                <span className='text-muted-foreground text-xs'>
                  {t(`slices.${sliceKey}.description`)}{' '}
                  <Link
                    className='underline-offset-4 hover:underline'
                    href={section.href}
                  >
                    {t('editLink')}
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
        description={t.rich('previewDescription', {
          code: (chunks) => (
            <code className='bg-muted rounded-none px-1 py-0.5'>{chunks}</code>
          ),
        })}
        title={t('preview')}
      >
        <pre className='bg-muted max-h-[28rem] overflow-auto rounded-none p-4 font-mono text-xs leading-relaxed'>
          {cfg}
        </pre>
      </CollapsibleSection>
    </div>
  );
}
