'use client';

import type { NetworkSettings } from '@workspace/cs2/config/model/types';
import {
  type ConfigSelectOption,
  ConfigSelectRow,
} from '@/features/config/ui/controls/config-select-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

const RATE_OPTIONS: ConfigSelectOption[] = [
  { value: '196608', label: '196608 (1.5 Mbps)' },
  { value: '262144', label: '262144 (2 Mbps)' },
  { value: '524288', label: '524288 (4 Mbps)' },
  { value: '786432', label: '786432 (max)' },
  { value: '1048576', label: '1048576 (LAN)' },
];

const TICK_OPTIONS: ConfigSelectOption[] = [
  { value: '64', label: '64' },
  { value: '128', label: '128' },
];

const RATIO_OPTIONS: ConfigSelectOption[] = [
  { value: '1', label: '1 (stable connection)' },
  { value: '2', label: '2 (default)' },
];

interface NetworkControlsProps {
  network: NetworkSettings;
  onUpdate: <K extends keyof NetworkSettings>(
    field: K,
    value: NetworkSettings[K]
  ) => void;
}

export function NetworkControls({ network, onUpdate }: NetworkControlsProps) {
  return (
    <div className='flex flex-col gap-6'>
      <ConfigSelectRow
        description='rate — max bytes/sec from the server.'
        id='network-rate'
        label='Rate'
        onChange={(value) => {
          onUpdate('rate', Number(value));
        }}
        options={RATE_OPTIONS}
        value={String(network.rate)}
      />
      <ConfigSelectRow
        description='cl_interp_ratio — interpolation ratio.'
        id='network-interp-ratio'
        label='Interp ratio'
        onChange={(value) => {
          onUpdate('interpRatio', Number(value));
        }}
        options={RATIO_OPTIONS}
        value={String(network.interpRatio)}
      />
      <CrosshairControlSlider
        id='network-interp'
        label='Interp (0 = auto)'
        max={0.05}
        min={0}
        onValueChange={(value) => {
          onUpdate('interp', value);
        }}
        step={0.005}
        value={network.interp}
      />
      <ConfigSelectRow
        description='cl_cmdrate — packets sent to the server.'
        id='network-cmdrate'
        label='Cmd rate'
        onChange={(value) => {
          onUpdate('cmdrate', Number(value));
        }}
        options={TICK_OPTIONS}
        value={String(network.cmdrate)}
      />
      <ConfigSelectRow
        description='cl_updaterate — packets received from the server.'
        id='network-updaterate'
        label='Update rate'
        onChange={(value) => {
          onUpdate('updaterate', Number(value));
        }}
        options={TICK_OPTIONS}
        value={String(network.updaterate)}
      />
      <CrosshairControlSlider
        id='network-max-ping'
        label='Matchmaking ping cap'
        max={350}
        min={25}
        onValueChange={(value) => {
          onUpdate('maxPing', value);
        }}
        step={5}
        value={network.maxPing}
      />
    </div>
  );
}
