'use client';

import type { MouseSettings } from '@workspace/cs2/config/model/types';
import { useTranslations } from 'next-intl';

import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface MouseControlsProps {
  mouse: MouseSettings;
  onUpdate: <K extends keyof MouseSettings>(
    field: K,
    value: MouseSettings[K]
  ) => void;
}

export function MouseControls({ mouse, onUpdate }: MouseControlsProps) {
  const t = useTranslations('config');

  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='mouse-sensitivity'
        label={t('sensitivity')}
        max={6}
        min={0.1}
        onValueChange={(value) => {
          onUpdate('sensitivity', value);
        }}
        step={0.001}
        value={mouse.sensitivity}
      />
      <CrosshairControlSlider
        id='mouse-zoom-ratio'
        label={t('zoomSensitivity')}
        max={2}
        min={0.5}
        onValueChange={(value) => {
          onUpdate('zoomSensitivityRatio', value);
        }}
        step={0.001}
        value={mouse.zoomSensitivityRatio}
      />
    </div>
  );
}
