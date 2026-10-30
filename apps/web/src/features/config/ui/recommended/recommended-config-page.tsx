'use client';

import type { ConfigCategory } from '@workspace/cs2/config/model/types';
import { CONFIG_CATEGORY_ORDER } from '@workspace/cs2/config/recommended/categories';
import { RECOMMENDED_CONFIG_TEMPLATES } from '@workspace/cs2/config/recommended/templates';
import { useTranslations } from 'next-intl';
import { useConfigEditor } from '@/features/config/hooks/use-config-editor';
import { ConfigNav } from '@/features/config/ui/editor/config-nav';
import { RecommendedConfigCard } from '@/features/config/ui/recommended/recommended-config-card';
import { Link } from '@/i18n/navigation';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { StudioStepPager, StudioStepRail } from '@/shared/ui/studio-steps';

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
  const t = useTranslations('config');
  const {
    addRecommendedConfig,
    enabledRecommendations,
    removeRecommendedConfig,
  } = useConfigEditor();

  const grouped = groupTemplatesByCategory();
  const addedCount = enabledRecommendations.length;

  return (
    <div className='mx-auto flex w-full max-w-4xl flex-col gap-5 p-6'>
      <StudioStepRail current='config' />
      <div className='flex flex-col gap-3'>
        <ConfigNav />
        <div className='flex flex-col gap-1'>
          <h1 className='text-sm font-medium'>{t('recommendedTitle')}</h1>
          <p className='text-muted-foreground text-xs'>
            {t('recommendedLeadFull')}
          </p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-muted-foreground text-xs'>
            {t('inConfigCount', { added: addedCount })}
          </span>
          <Link
            className='text-muted-foreground text-xs underline-offset-4 hover:underline'
            href='/config'
          >
            {t('openEditor')}
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
            title={t(`categories.${category}`)}
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
      <StudioStepPager current='config' />
    </div>
  );
}
