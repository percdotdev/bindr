'use client';

import type { AudioSettings } from '@workspace/cs2/config/model/types';
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
  return (
    <div className='flex flex-col gap-6'>
      <CrosshairControlSlider
        id='audio-master'
        label='Master volume'
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('master', value);
        }}
        step={0.05}
        value={audio.master}
      />
      <CrosshairControlSlider
        id='audio-voice'
        label='Voice volume'
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('voiceScale', value);
        }}
        step={0.05}
        value={audio.voiceScale}
      />
      <CrosshairControlSlider
        id='audio-music'
        label='Music volume (round/menu/MVP)'
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
        label='Bomb timer beep'
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('tenSecondWarning', value);
        }}
        step={0.05}
        value={audio.tenSecondWarning}
      />
      <ConfigSwitchRow
        description='snd_mute_losefocus — mute the game when alt-tabbed.'
        enabled={audio.muteOnFocusLoss}
        id='audio-mute-focus'
        label='Mute when alt-tabbed'
        onChange={(enabled) => {
          onUpdate('muteOnFocusLoss', enabled);
        }}
      />
    </div>
  );
}
