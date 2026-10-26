'use client';

import type { RadarSettings } from '@workspace/cs2/config/model/types';
import { useTranslations } from 'next-intl';

import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface RadarControlsProps {
  onUpdate: <K extends keyof RadarSettings>(
    field: K,
    value: RadarSettings[K]
  ) => void;
  radar: RadarSettings;
}

export function RadarControls({ onUpdate, radar }: RadarControlsProps) {
  const t = useTranslations('config');

  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='radar-scale'
        label={t('radarZoom')}
        max={1}
        min={0.25}
        onValueChange={(value) => {
          onUpdate('scale', value);
        }}
        step={0.01}
        value={radar.scale}
      />
      <CrosshairControlSlider
        id='radar-hud-scale'
        label={t('hudRadarSize')}
        max={1.3}
        min={0.8}
        onValueChange={(value) => {
          onUpdate('hudScale', value);
        }}
        step={0.01}
        value={radar.hudScale}
      />
      <CrosshairControlSlider
        id='radar-icon-scale'
        label={t('minIconSize')}
        max={1.25}
        min={0.4}
        onValueChange={(value) => {
          onUpdate('iconScaleMin', value);
        }}
        step={0.01}
        value={radar.iconScaleMin}
      />
      <ConfigSwitchRow
        description={t('alwaysCenteredDescription')}
        enabled={radar.alwaysCentered}
        id='radar-centered'
        label={t('alwaysCentered')}
        onChange={(enabled) => {
          onUpdate('alwaysCentered', enabled);
        }}
      />
      <ConfigSwitchRow
        description={t('rotateRadarDescription')}
        enabled={radar.rotate}
        id='radar-rotate'
        label={t('rotateRadar')}
        onChange={(enabled) => {
          onUpdate('rotate', enabled);
        }}
      />
      <ConfigSwitchRow
        description={t('squareScoreboardDescription')}
        enabled={radar.squareWithScoreboard}
        id='radar-square'
        label={t('squareScoreboard')}
        onChange={(enabled) => {
          onUpdate('squareWithScoreboard', enabled);
        }}
      />
    </div>
  );
}
