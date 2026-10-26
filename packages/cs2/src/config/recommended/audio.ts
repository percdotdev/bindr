import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const AUDIO_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    category: 'audio',
    commands: [
      'snd_roundstart_volume 0',
      'snd_roundend_volume 0',
      'snd_mvp_volume 0',
      'snd_menumusic_volume 0',
      'snd_deathcamera_volume 0',
      'snd_tensecondwarning_volume 0.1',
      'snd_voipvolume 0.7',
      'snd_mute_losefocus 1',
    ],
    description:
      'Silences round/menu/MVP music, keeps the bomb timer beep, and tames teammate voice volume. Voice uses `snd_voipvolume` — `voice_scale` is gone.',
    id: 'rec-audio-clean',
    label: 'Mute music, lower voice',
    mmSafe: true,
    patch: {
      audio: {
        musicVolume: 0,
        muteOnFocusLoss: true,
        tenSecondWarning: 0.1,
        voipVolume: 0.7,
      },
    },
    source: 'CS2 client cvar',
  },
];
