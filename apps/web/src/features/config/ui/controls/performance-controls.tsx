'use client';

import type { PerformanceSettings } from '@workspace/cs2/config/model/types';
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
  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='perf-fps-max'
        label='FPS cap (0 = unlimited)'
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
        label='Menu FPS cap'
        max={240}
        min={30}
        onValueChange={(value) => {
          onUpdate('fpsMaxUi', value);
        }}
        step={1}
        value={performance.fpsMaxUi}
      />
      <ConfigSwitchRow
        description='engine_low_latency_sleep_after_client_tick — pair with a real fps_max, not 0.'
        enabled={performance.lowLatencySleep}
        id='perf-low-latency'
        label='Low-latency sleep'
        onChange={(enabled) => {
          onUpdate('lowLatencySleep', enabled);
        }}
      />
      <ConfigSwitchRow
        description='r_drawtracers_firstperson — first-person bullet tracers.'
        enabled={performance.drawTracersFirstPerson}
        id='perf-tracers'
        label='First-person tracers'
        onChange={(enabled) => {
          onUpdate('drawTracersFirstPerson', enabled);
        }}
      />
      <ConfigSwitchRow
        description='cl_autohelp — automatic hint messages.'
        enabled={performance.autohelp}
        id='perf-autohelp'
        label='Auto-help'
        onChange={(enabled) => {
          onUpdate('autohelp', enabled);
        }}
      />
      <ConfigSwitchRow
        description='gameinstructor_enable — tutorial popups.'
        enabled={performance.gameInstructor}
        id='perf-game-instructor'
        label='Game instructor'
        onChange={(enabled) => {
          onUpdate('gameInstructor', enabled);
        }}
      />
    </div>
  );
}
