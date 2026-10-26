'use client';

import type { NetworkSettings } from '@workspace/cs2/config/model/types';
import { useTranslations } from 'next-intl';

import {
  type ConfigSelectOption,
  ConfigSelectRow,
} from '@/features/config/ui/controls/config-select-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface NetworkControlsProps {
  network: NetworkSettings;
  onUpdate: <K extends keyof NetworkSettings>(
    field: K,
    value: NetworkSettings[K]
  ) => void;
}

export function NetworkControls({ network, onUpdate }: NetworkControlsProps) {
  const t = useTranslations('config');

  const rateOptions: ConfigSelectOption[] = [
    { label: t('rate196608'), value: '196608' },
    { label: t('rate262144'), value: '262144' },
    { label: t('rate524288'), value: '524288' },
    { label: t('rate786432'), value: '786432' },
  ];

  const bufferTickOptions: ConfigSelectOption[] = [
    { label: t('buffer0'), value: '0' },
    { label: t('buffer1'), value: '1' },
    { label: t('buffer2'), value: '2' },
  ];

  return (
    <div className='flex flex-col gap-6'>
      <ConfigSelectRow
        description={t('rateDescription')}
        id='network-rate'
        label={t('rate')}
        onChange={(value) => {
          onUpdate('rate', Number(value));
        }}
        options={rateOptions}
        value={String(network.rate)}
      />
      <ConfigSelectRow
        description={t('bufferTicksDescription')}
        id='network-buffer-ticks'
        label={t('bufferTicks')}
        onChange={(value) => {
          onUpdate('bufferTicks', Number(value));
        }}
        options={bufferTickOptions}
        value={String(network.bufferTicks)}
      />
      <CrosshairControlSlider
        id='network-max-ping'
        label={t('pingCap')}
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
