'use client';

import type { ConfigCategory } from '@workspace/cs2/config/model/types';
import {
  CONFIG_CATEGORY_LABELS,
  CONFIG_CATEGORY_ORDER,
} from '@workspace/cs2/config/recommended/categories';
import { RECOMMENDED_CONFIG_TEMPLATES } from '@workspace/cs2/config/recommended/templates';
import { Button } from '@workspace/ui/components/button';
import Link from 'next/link';
import { ConfirmAlertDialog } from '@/features/binds/ui/controls/confirm-alert-dialog';
import { useConfigEditor } from '@/features/config/hooks/use-config-editor';
import { ConfigNav } from '@/features/config/ui/editor/config-nav';
import { RecommendedConfigCard } from '@/features/config/ui/recommended/recommended-config-card';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';

function groupTemplatesByCategory() {
  const groups = new Map<ConfigCategory, typeof RECOMMENDED_CONFIG_TEMPLATES>();

  for (const category of CONFIG_CATEGORY_ORDER) {
    groups.set(category, []);
  }

  for (const template of RECOMMENDED_CONFIG_TEMPLATES) {
    const current = groups.get(template.category) ?? [];
    current.push(template);
    groups.set(template.category, current);
  }

  return groups;
}

export function RecommendedConfigPage() {
  const {
    addRecommendedConfig,
    enabledRecommendations,
    loadAllRecommendedConfigs,
    removeRecommendedConfig,
  } = useConfigEditor();

  const grouped = groupTemplatesByCategory();
  const addedCount = enabledRecommendations.length;
  const allRecommendedAdded =
    addedCount === RECOMMENDED_CONFIG_TEMPLATES.length;

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-5 p-6'>
      <div className='flex flex-col gap-3'>
        <ConfigNav />
        <div className='flex flex-col gap-1'>
          <h1 className='font-medium text-sm'>Recommended config</h1>
          <p className='text-muted-foreground text-xs'>
            Curated cvar bundles from csdb.gg and lineups.gg — add individually
            or take the full competitive set. Viewmodel and radar presets
            replace each other within their category.
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <ConfirmAlertDialog
            confirmLabel='Add all'
            description='This replaces your entire config with the full recommended set. Custom values and manual edits are removed.'
            disabled={allRecommendedAdded}
            onConfirm={loadAllRecommendedConfigs}
            title='Add all recommended config?'
            trigger={<Button type='button' variant='outline' />}
          >
            Add all ({RECOMMENDED_CONFIG_TEMPLATES.length})
          </ConfirmAlertDialog>
          <span className='text-muted-foreground text-xs'>
            {addedCount} of {RECOMMENDED_CONFIG_TEMPLATES.length} in your config
          </span>
          <Link
            className='text-muted-foreground text-xs underline-offset-4 hover:underline'
            href='/config'
          >
            Open editor
          </Link>
        </div>
      </div>

      {CONFIG_CATEGORY_ORDER.map((category) => {
        const templates = grouped.get(category) ?? [];
        if (templates.length === 0) {
          return null;
        }

        return (
          <CollapsibleSection
            contentClassName='flex flex-col gap-3'
            key={category}
            title={CONFIG_CATEGORY_LABELS[category]}
          >
            {templates.map((template) => (
              <RecommendedConfigCard
                isActive={enabledRecommendations.includes(template.id)}
                key={template.id}
                onAdd={() => {
                  addRecommendedConfig(template.id);
                }}
                onRemove={() => {
                  removeRecommendedConfig(template.id);
                }}
                template={template}
              />
            ))}
          </CollapsibleSection>
        );
      })}
    </div>
  );
}
