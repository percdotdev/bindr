'use client';

import type { RadarSettings } from '@/features/config/lib/model/types';
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
  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='radar-scale'
        label='Radar zoom (cl_radar_scale)'
        max={1}
        min={0.25}
        onValueChange={(value) => {
          onUpdate('scale', value);
        }}
        step={0.05}
        value={radar.scale}
      />
      <CrosshairControlSlider
        id='radar-hud-scale'
        label='HUD radar size'
        max={1.3}
        min={0.8}
        onValueChange={(value) => {
          onUpdate('hudScale', value);
        }}
        step={0.05}
        value={radar.hudScale}
      />
      <CrosshairControlSlider
        id='radar-icon-scale'
        label='Min icon size'
        max={1}
        min={0.4}
        onValueChange={(value) => {
          onUpdate('iconScaleMin', value);
        }}
        step={0.05}
        value={radar.iconScaleMin}
      />
      <ConfigSwitchRow
        description='cl_radar_always_centered — off shows more of the map.'
        enabled={radar.alwaysCentered}
        id='radar-centered'
        label='Always centered'
        onChange={(enabled) => {
          onUpdate('alwaysCentered', enabled);
        }}
      />
      <ConfigSwitchRow
        description='cl_radar_rotate — rotate the radar with your view.'
        enabled={radar.rotate}
        id='radar-rotate'
        label='Rotate radar'
        onChange={(enabled) => {
          onUpdate('rotate', enabled);
        }}
      />
      <ConfigSwitchRow
        description='cl_radar_square_with_scoreboard — square radar on scoreboard.'
        enabled={radar.squareWithScoreboard}
        id='radar-square'
        label='Square with scoreboard'
        onChange={(enabled) => {
          onUpdate('squareWithScoreboard', enabled);
        }}
      />
    </div>
  );
}
