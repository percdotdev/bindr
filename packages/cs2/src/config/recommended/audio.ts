import type { RecommendedConfigTemplate } from '@workspace/cs2/config/model/types';

export const AUDIO_RECOMMENDATIONS: RecommendedConfigTemplate[] = [
  {
    id: 'rec-audio-clean',
    label: 'Mute music, lower voice',
    description:
      'Silences round/menu/MVP music, keeps the bomb timer beep, and tames teammate voice volume.',
    category: 'audio',
    mmSafe: true,
    source: 'csdb.gg audio optimization',
    commands: [
      'snd_roundstart_volume 0',
      'snd_roundend_volume 0',
      'snd_mvp_volume 0',
      'snd_menumusic_volume 0',
      'snd_deathcamera_volume 0',
      'snd_tensecondwarning_volume 0.1',
      'voice_scale 0.7',
      'snd_mute_losefocus 1',
    ],
    patch: {
      audio: {
        musicVolume: 0,
        tenSecondWarning: 0.1,
        voiceScale: 0.7,
        muteOnFocusLoss: true,
      },
    },
  },
];
