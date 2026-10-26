'use client';

import { RECOMMENDED_BIND_TEMPLATES } from '@workspace/cs2/binds/recommended/templates';
import { Button } from '@workspace/ui/components/button';
import { SparklesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useBindEditor } from '@/features/binds/hooks/use-bind-editor';
import { BindCommandForm } from '@/features/binds/ui/controls/bind-command-form';
import { BindList } from '@/features/binds/ui/controls/bind-list';
import { ConfirmAlertDialog } from '@/features/binds/ui/controls/confirm-alert-dialog';
import { KeyboardLayout } from '@/features/binds/ui/controls/keyboard-layout';
import { BindsNav } from '@/features/binds/ui/editor/binds-nav';
import { BindExportPanel } from '@/features/binds/ui/export/bind-export-panel';
import { Link } from '@/i18n/navigation';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';

export function BindEditor() {
  const t = useTranslations('binds');
  const tCommon = useTranslations('common');
  const {
    activeKeys,
    binds,
    clearBinds,
    loadRecommendedBinds,
    removeBind,
    selectKey,
    selectedBind,
    selectedKey,
    upsertBind,
  } = useBindEditor();

  const allRecommendedAdded = RECOMMENDED_BIND_TEMPLATES.every((template) =>
    activeKeys.has(template.key)
  );

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-3'>
        <BindsNav />
        <div className='flex flex-col gap-1'>
          <h1 className='text-sm font-medium'>{t('title')}</h1>
          <p className='text-muted-foreground text-xs'>{t('subtitleFull')}</p>
        </div>
        <Link
          className='text-muted-foreground w-fit text-xs underline-offset-4 hover:underline'
          href='/binds/recommended'
        >
          {t('browseRecommended')}
        </Link>
        <div className='flex flex-wrap items-center gap-2'>
          <BindExportPanel binds={binds} />
          <ConfirmAlertDialog
            confirmLabel={tCommon('addAll')}
            description={t('addAllDescription')}
            destructive={false}
            disabled={allRecommendedAdded}
            onConfirm={loadRecommendedBinds}
            title={t('addAllTitle')}
            trigger={<Button type='button' variant='outline' />}
          >
            <SparklesIcon data-icon='inline-start' />
            {tCommon('addAll')}
          </ConfirmAlertDialog>
          <ConfirmAlertDialog
            confirmLabel={tCommon('clearAll')}
            description={t('clearDescription')}
            disabled={binds.length === 0}
            onConfirm={clearBinds}
            title={t('clearTitle')}
            trigger={<Button type='button' variant='ghost' />}
          >
            {tCommon('clearAll')}
          </ConfirmAlertDialog>
        </div>
      </div>

      <CollapsibleSection title={t('sections.keyboard')}>
        <KeyboardLayout
          binds={binds}
          onSelectKey={selectKey}
          selectedKey={selectedKey}
        />
      </CollapsibleSection>

      <CollapsibleSection title={t('sections.command')}>
        <BindCommandForm
          command={selectedBind?.command ?? ''}
          key={selectedKey ?? 'none'}
          onRemove={() => {
            if (selectedKey) {
              removeBind(selectedKey);
            }
          }}
          onSave={(command) => {
            if (selectedKey) {
              upsertBind(selectedKey, command);
            }
          }}
          selectedKey={selectedKey}
        />
      </CollapsibleSection>

      <CollapsibleSection
        action={
          <Link
            className='text-muted-foreground text-xs underline-offset-4 hover:underline'
            href='/binds/recommended'
          >
            {t('addFromRecommended')}
          </Link>
        }
        title={t('sections.active')}
      >
        <BindList
          binds={binds}
          onRemove={removeBind}
          onSelectKey={selectKey}
          selectedKey={selectedKey}
        />
      </CollapsibleSection>
    </div>
  );
}
