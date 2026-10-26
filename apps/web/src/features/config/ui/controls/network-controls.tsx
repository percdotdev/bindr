'use client';

import type { NetworkSettings } from '@workspace/cs2/config/model/types';
import {
  type ConfigSelectOption,
  ConfigSelectRow,
} from '@/features/config/ui/controls/config-select-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

const RATE_OPTIONS: ConfigSelectOption[] = [
  { label: '196608 (1.5 Mbps)', value: '196608' },
  { label: '262144 (2 Mbps)', value: '262144' },
  { label: '524288 (4 Mbps)', value: '524288' },
  { label: '786432 (unrestricted)', value: '786432' },
];

const BUFFER_TICK_OPTIONS: ConfigSelectOption[] = [
  { label: '0 (default, lowest delay)', value: '0' },
  { label: '1 (mild jitter)', value: '1' },
  { label: '2 (lossy connection)', value: '2' },
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
        description='rate — max bytes/sec from the server. 786432 is Unrestricted in the menu.'
        id='network-rate'
        label='Rate'
        onChange={(value) => {
          onUpdate('rate', Number(value));
        }}
        options={RATE_OPTIONS}
        value={String(network.rate)}
      />
      <ConfigSelectRow
        description='cl_net_buffer_ticks — extra snapshot delay. This is what actually drives interp in CS2. Do not set cl_interp or cl_cmdrate.'
        id='network-buffer-ticks'
        label='Buffer ticks'
        onChange={(value) => {
          onUpdate('bufferTicks', Number(value));
        }}
        options={BUFFER_TICK_OPTIONS}
        value={String(network.bufferTicks)}
      />
      <CrosshairControlSlider
        id='network-max-ping'
        label='Matchmaking ping cap'
        max={350}
        min={25}
        onValueChange={(value) => {
          onUpdate('maxPing', value);
        }}
        step={1}
        value={network.maxPing}
      />
    </div>
  );
}
