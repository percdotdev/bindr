'use client';

import type { AudioSettings } from '@workspace/cs2/config/model/types';
import { useTranslations } from 'next-intl';

import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface AudioControlsProps {
  audio: AudioSettings;
  onUpdate: <K extends keyof AudioSettings>(
    field: K,
    value: AudioSettings[K]
  ) => void;
}

export function AudioControls({ audio, onUpdate }: AudioControlsProps) {
  const t = useTranslations('config');

  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='audio-master'
        label={t('masterVolume')}
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('master', value);
        }}
        step={0.01}
        value={audio.master}
      />
      <CrosshairControlSlider
        id='audio-voice'
        label={t('voiceVolume')}
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('voipVolume', value);
        }}
        step={0.01}
        value={audio.voipVolume}
      />
      <CrosshairControlSlider
        id='audio-music'
        label={t('musicVolume')}
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('musicVolume', value);
        }}
        step={0.01}
        value={audio.musicVolume}
      />
      <CrosshairControlSlider
        id='audio-ten-second'
        label={t('bombBeep')}
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('tenSecondWarning', value);
        }}
        step={0.01}
        value={audio.tenSecondWarning}
      />
      <ConfigSwitchRow
        description={t('muteAltTabDescription')}
        enabled={audio.muteOnFocusLoss}
        id='audio-mute-focus'
        label={t('muteAltTab')}
        onChange={(enabled) => {
          onUpdate('muteOnFocusLoss', enabled);
        }}
      />
    </div>
  );
}
