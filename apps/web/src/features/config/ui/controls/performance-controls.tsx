'use client';

import type { PerformanceSettings } from '@workspace/cs2/config/model/types';
import { useTranslations } from 'next-intl';

import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface PerformanceControlsProps {
  onUpdate: <K extends keyof PerformanceSettings>(
    field: K,
    value: PerformanceSettings[K]
  ) => void;
  performance: PerformanceSettings;
}

export function PerformanceControls({
  onUpdate,
  performance,
}: PerformanceControlsProps) {
  const t = useTranslations('config');

  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='perf-fps-max'
        label={t('fpsCap')}
        max={600}
        min={0}
        onValueChange={(value) => {
          onUpdate('fpsMax', value);
        }}
        step={1}
        value={performance.fpsMax}
      />
      <CrosshairControlSlider
        id='perf-fps-max-ui'
        label={t('menuFpsCap')}
        max={240}
        min={30}
        onValueChange={(value) => {
          onUpdate('fpsMaxUi', value);
        }}
        step={1}
        value={performance.fpsMaxUi}
      />
      <ConfigSwitchRow
        description={t('lowLatencyDescription')}
        enabled={performance.lowLatencySleep}
        id='perf-low-latency'
        label={t('lowLatency')}
        onChange={(enabled) => {
          onUpdate('lowLatencySleep', enabled);
        }}
      />
      <ConfigSwitchRow
        description={t('tracersDescription')}
        enabled={performance.drawTracersFirstPerson}
        id='perf-tracers'
        label={t('tracers')}
        onChange={(enabled) => {
          onUpdate('drawTracersFirstPerson', enabled);
        }}
      />
      <ConfigSwitchRow
        description={t('autoHelpDescription')}
        enabled={performance.autohelp}
        id='perf-autohelp'
        label={t('autoHelp')}
        onChange={(enabled) => {
          onUpdate('autohelp', enabled);
        }}
      />
      <ConfigSwitchRow
        description={t('instructorDescription')}
        enabled={performance.gameInstructor}
        id='perf-game-instructor'
        label={t('instructor')}
        onChange={(enabled) => {
          onUpdate('gameInstructor', enabled);
        }}
      />
    </div>
  );
}
