'use client';

import type { ConfigCategory } from '@workspace/cs2/config/model/types';
import { CONFIG_CATEGORY_ORDER } from '@workspace/cs2/config/recommended/categories';
import { buttonVariants } from '@workspace/ui/components/button';
import { cn } from '@workspace/ui/lib/utils';
import { useTranslations } from 'next-intl';
import { useConfigEditor } from '@/features/config/hooks/use-config-editor';
import { AudioControls } from '@/features/config/ui/controls/audio-controls';
import { HudControls } from '@/features/config/ui/controls/hud-controls';
import { MouseControls } from '@/features/config/ui/controls/mouse-controls';
import { NetworkControls } from '@/features/config/ui/controls/network-controls';
import { PerformanceControls } from '@/features/config/ui/controls/performance-controls';
import { RadarControls } from '@/features/config/ui/controls/radar-controls';
import { ViewmodelControls } from '@/features/config/ui/controls/viewmodel-controls';
import { ConfigNav } from '@/features/config/ui/editor/config-nav';
import { ConfigResetAlert } from '@/features/config/ui/editor/config-reset-alert';
import { ConfigSectionNav } from '@/features/config/ui/editor/config-section-nav';
import { ConfigExportPanel } from '@/features/config/ui/export/config-export-panel';
import { Link } from '@/i18n/navigation';
import { CollapsibleSection } from '@/shared/ui/collapsible-section';
import { StudioStepPager, StudioStepRail } from '@/shared/ui/studio-steps';

export function ConfigEditor() {
  const t = useTranslations('config');
  const {
    applyViewmodelPreset,
    config,
    resetConfig,
    updateField,
    updateViewmodelField,
  } = useConfigEditor();

  const renderControls = (category: ConfigCategory) => {
    switch (category) {
      case 'viewmodel':
        return (
          <ViewmodelControls
            onPresetChange={applyViewmodelPreset}
            onUpdate={updateViewmodelField}
            viewmodel={config.viewmodel}
          />
        );
      case 'mouse':
        return (
          <MouseControls
            mouse={config.mouse}
            onUpdate={(field, value) => updateField('mouse', field, value)}
          />
        );
      case 'radar':
        return (
          <RadarControls
            onUpdate={(field, value) => updateField('radar', field, value)}
            radar={config.radar}
          />
        );
      case 'network':
        return (
          <NetworkControls
            network={config.network}
            onUpdate={(field, value) => updateField('network', field, value)}
          />
        );
      case 'audio':
        return (
          <AudioControls
            audio={config.audio}
            onUpdate={(field, value) => updateField('audio', field, value)}
          />
        );
      case 'performance':
        return (
          <PerformanceControls
            onUpdate={(field, value) =>
              updateField('performance', field, value)
            }
            performance={config.performance}
          />
        );
      case 'hud':
        return (
          <HudControls
            hud={config.hud}
            onUpdate={(field, value) => updateField('hud', field, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='mx-auto flex w-full max-w-3xl flex-col gap-5 p-6'>
      <StudioStepRail current='config' />
      <div className='flex flex-col gap-3'>
        <ConfigNav />
        <div className='flex flex-col gap-1'>
          <h1 className='text-sm font-medium'>{t('title')}</h1>
          <p className='text-muted-foreground text-xs'>{t('subtitleEditor')}</p>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <ConfigExportPanel config={config} />
          <Link
            className={cn(
              buttonVariants({ size: 'sm', variant: 'outline' }),
              'inline-flex'
            )}
            href='/config/recommended'
          >
            {t('browseRecommended')}
          </Link>
          <ConfigResetAlert onReset={resetConfig} />
        </div>
        <div className='bg-background/80 sticky top-0 z-10 -mx-6 border-b px-6 py-2 backdrop-blur'>
          <ConfigSectionNav />
        </div>
      </div>

      {CONFIG_CATEGORY_ORDER.map((category) => (
        <CollapsibleSection
          description={t(`sectionDescriptions.${category}`)}
          id={`config-${category}`}
          key={category}
          title={t(`categories.${category}`)}
        >
          {renderControls(category)}
        </CollapsibleSection>
      ))}
      <StudioStepPager current='config' />
    </div>
  );
}
