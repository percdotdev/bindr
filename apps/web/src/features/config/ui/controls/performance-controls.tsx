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
        step={10}
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
        step={10}
        value={performance.fpsMaxUi}
      />
      <ConfigSwitchRow
        description='engine_low_latency_sleep_after_client_tick — lower input latency.'
        enabled={performance.lowLatencySleep}
        id='perf-low-latency'
        label='Low-latency sleep'
        onChange={(enabled) => {
          onUpdate('lowLatencySleep', enabled);
        }}
      />
      <ConfigSwitchRow
        description='mat_queue_mode 2 — multicore rendering.'
        enabled={performance.multicore}
        id='perf-multicore'
        label='Multicore rendering'
        onChange={(enabled) => {
          onUpdate('multicore', enabled);
        }}
      />
      <ConfigSwitchRow
        description='r_dynamic — dynamic lighting. Off boosts FPS.'
        enabled={performance.dynamicLight}
        id='perf-dynamic-light'
        label='Dynamic lighting'
        onChange={(enabled) => {
          onUpdate('dynamicLight', enabled);
        }}
      />
      <ConfigSwitchRow
        description='mat_disable_bloom — turn off bloom/glow.'
        enabled={performance.disableBloom}
        id='perf-disable-bloom'
        label='Disable bloom'
        onChange={(enabled) => {
          onUpdate('disableBloom', enabled);
        }}
      />
      <ConfigSwitchRow
        description='cl_forcepreload — preload assets at map load.'
        enabled={performance.forcePreload}
        id='perf-force-preload'
        label='Force preload'
        onChange={(enabled) => {
          onUpdate('forcePreload', enabled);
        }}
      />
      <ConfigSwitchRow
        description='cl_animate_player_models — animate models in menus.'
        enabled={performance.animatePlayerModels}
        id='perf-animate-models'
        label='Animate menu models'
        onChange={(enabled) => {
          onUpdate('animatePlayerModels', enabled);
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
        description='cl_disablefreezecam — skip the death freeze cam.'
        enabled={performance.disableFreezeCam}
        id='perf-freezecam'
        label='Disable freeze cam'
        onChange={(enabled) => {
          onUpdate('disableFreezeCam', enabled);
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
        description='cl_showhelp — on-screen help tips.'
        enabled={performance.showHelp}
        id='perf-showhelp'
        label='Show help'
        onChange={(enabled) => {
          onUpdate('showHelp', enabled);
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
