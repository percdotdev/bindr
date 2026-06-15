'use client';

import type { MouseSettings } from '@/features/config/lib/model/types';
import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface MouseControlsProps {
  mouse: MouseSettings;
  onUpdate: <K extends keyof MouseSettings>(
    field: K,
    value: MouseSettings[K]
  ) => void;
}

export function MouseControls({ mouse, onUpdate }: MouseControlsProps) {
  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='mouse-sensitivity'
        label='Sensitivity'
        max={6}
        min={0.1}
        onValueChange={(value) => {
          onUpdate('sensitivity', value);
        }}
        step={0.05}
        value={mouse.sensitivity}
      />
      <CrosshairControlSlider
        id='mouse-zoom-ratio'
        label='Zoom sensitivity ratio'
        max={2}
        min={0.5}
        onValueChange={(value) => {
          onUpdate('zoomSensitivityRatio', value);
        }}
        step={0.05}
        value={mouse.zoomSensitivityRatio}
      />
      <ConfigSwitchRow
        description='m_rawinput — bypass OS mouse acceleration. Keep on.'
        enabled={mouse.rawInput}
        id='mouse-raw-input'
        label='Raw input'
        onChange={(enabled) => {
          onUpdate('rawInput', enabled);
        }}
      />
    </div>
  );
}
