'use client';

import type { BindCategory } from '@workspace/cs2/binds/model/types';
import { BIND_CATEGORY_ORDER } from '@workspace/cs2/binds/recommended/categories';
import { RECOMMENDED_BIND_TEMPLATES } from '@workspace/cs2/binds/recommended/templates';
import { Button } from '@workspace/ui/components/button';
import { useTranslations } from 'next-intl';

import { useBindEditor } from '@/features/binds/hooks/use-bind-editor';
import { ConfirmAlertDialog } from '@/features/binds/ui/controls/confirm-alert-dialog';
import { BindsNav } from '@/features/binds/ui/editor/binds-nav';
import { RecommendedBindCard } from '@/features/binds/ui/recommended/recommended-bind-card';
import { Link } from '@/i18n/navigation';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { StudioStepPager, StudioStepRail } from '@/shared/ui/studio-steps';

function groupTemplatesByCategory() {
  const groups = new Map<BindCategory, typeof RECOMMENDED_BIND_TEMPLATES>();

  for (const category of BIND_CATEGORY_ORDER) {
    groups.set(category, []);
  }

  for (const template of RECOMMENDED_BIND_TEMPLATES) {
    const current = groups.get(template.category) ?? [];
    current.push(template);
    groups.set(template.category, current);
  }

  return groups;
}

export function RecommendedBindsPage() {
  const t = useTranslations('binds');
  const tCommon = useTranslations('common');
  const { activeKeys, addRecommendedBind, loadRecommendedBinds, removeBind } =
    useBindEditor();

  const grouped = groupTemplatesByCategory();
  const addedCount = RECOMMENDED_BIND_TEMPLATES.filter((template) =>
    activeKeys.has(template.key)
  ).length;
  const allRecommendedAdded = addedCount === RECOMMENDED_BIND_TEMPLATES.length;

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-5 p-6'>
      <StudioStepRail current='binds' />
      <div className='flex flex-col gap-3'>
        <BindsNav />
        <div className='flex flex-col gap-1'>
          <h1 className='text-sm font-medium'>{t('recommendedTitle')}</h1>
          <p className='text-muted-foreground text-xs'>
            {t('recommendedLead')}
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <ConfirmAlertDialog
            confirmLabel={tCommon('addAll')}
            description={t('addAllDescription')}
            disabled={allRecommendedAdded}
            onConfirm={loadRecommendedBinds}
            title={t('addAllTitle')}
            trigger={<Button type='button' variant='outline' />}
          >
            {tCommon('addAllCount', {
              count: RECOMMENDED_BIND_TEMPLATES.length,
            })}
          </ConfirmAlertDialog>
          <span className='text-muted-foreground text-xs'>
            {t('inConfigCount', {
              added: addedCount,
              total: RECOMMENDED_BIND_TEMPLATES.length,
            })}
          </span>
          <Link
            className='text-muted-foreground text-xs underline-offset-4 hover:underline'
            href='/binds'
          >
            {t('openEditor')}
          </Link>
        </div>
      </div>

      {BIND_CATEGORY_ORDER.map((category) => {
        const templates = grouped.get(category) ?? [];
        if (templates.length === 0) {
          return null;
        }

        return (
          <CollapsibleSection
            contentClassName='flex flex-col gap-3'
            key={category}
            title={t(`categories.${category}`)}
          >
            {templates.map((template) => (
              <RecommendedBindCard
                isActive={activeKeys.has(template.key)}
                key={template.id}
                onAdd={() => {
                  addRecommendedBind(template.id);
                }}
                onRemove={() => {
                  removeBind(template.key);
                }}
                template={template}
              />
            ))}
          </CollapsibleSection>
        );
      })}
      <StudioStepPager current='binds' />
    </div>
  );
}
