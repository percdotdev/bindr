'use client';

import type { ConfigCategory } from '@workspace/cs2/config/model/types';
import {
  CONFIG_CATEGORY_LABELS,
  CONFIG_CATEGORY_ORDER,
} from '@workspace/cs2/config/recommended/categories';
import { RECOMMENDED_CONFIG_TEMPLATES } from '@workspace/cs2/config/recommended/templates';
import { Button } from '@workspace/ui/components/button';
import { SparklesIcon } from 'lucide-react';
import Link from 'next/link';
import { ConfirmAlertDialog } from '@/features/binds/ui/controls/confirm-alert-dialog';
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
import { CollapsibleSection } from '@/shared/ui/collapsible-section';

const SECTION_DESCRIPTIONS: Record<ConfigCategory, string> = {
  audio: 'Volume, voice and music levels.',
  hud: 'HUD color, scale, on-screen elements and sniper overlay.',
  mouse: 'Sensitivity and scoped ratio. Raw input is always on in CS2.',
  network: 'Bandwidth and snapshot buffer ticks.',
  performance: 'FPS caps, tracers and help popups.',
  radar: 'Minimap zoom, rotation and icon sizing.',
  viewmodel: 'Weapon position, FOV and handedness.',
};

export function ConfigEditor() {
  const {
    applyViewmodelPreset,
    config,
    enabledRecommendations,
    loadAllRecommendedConfigs,
    resetConfig,
    updateField,
    updateViewmodelField,
  } = useConfigEditor();

  const allRecommendedAdded =
    enabledRecommendations.length === RECOMMENDED_CONFIG_TEMPLATES.length;

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
      <div className='flex flex-col gap-3'>
        <ConfigNav />
        <div className='flex flex-col gap-1'>
          <h1 className='text-sm font-medium'>Game config</h1>
          <p className='text-muted-foreground text-xs'>
            Tune always-on cvars — viewmodel, mouse, radar, network, audio,
            performance and HUD — then copy or download a cfg snippet for CS2.
          </p>
        </div>
        <Link
          className='text-muted-foreground w-fit text-xs underline-offset-4 hover:underline'
          href='/config/recommended'
        >
          Browse recommended config →
        </Link>
        <div className='flex flex-wrap items-center gap-2'>
          <ConfigExportPanel config={config} />
          <ConfirmAlertDialog
            confirmLabel='Add all'
            description='This applies the full recommended cvar set and replaces conflicting values. You can still tweak anything afterward.'
            destructive={false}
            disabled={allRecommendedAdded}
            onConfirm={loadAllRecommendedConfigs}
            title='Add all recommended config?'
            trigger={<Button type='button' variant='outline' />}
          >
            <SparklesIcon data-icon='inline-start' />
            Add all
          </ConfirmAlertDialog>
          <ConfigResetAlert onReset={resetConfig} />
        </div>
        <div className='bg-background/80 sticky top-0 z-10 -mx-6 border-b px-6 py-2 backdrop-blur'>
          <ConfigSectionNav />
        </div>
      </div>

      {CONFIG_CATEGORY_ORDER.map((category) => (
        <CollapsibleSection
          description={SECTION_DESCRIPTIONS[category]}
          id={`config-${category}`}
          key={category}
          title={CONFIG_CATEGORY_LABELS[category]}
        >
          {renderControls(category)}
        </CollapsibleSection>
      ))}
    </div>
  );
}
