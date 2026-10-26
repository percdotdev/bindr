'use client';

import type { HudSettings } from '@workspace/cs2/config/model/types';
import { useTranslations } from 'next-intl';

import {
  type ConfigSelectOption,
  ConfigSelectRow,
} from '@/features/config/ui/controls/config-select-row';
import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

interface HudControlsProps {
  hud: HudSettings;
  onUpdate: <K extends keyof HudSettings>(
    field: K,
    value: HudSettings[K]
  ) => void;
}

export function HudControls({ hud, onUpdate }: HudControlsProps) {
  const t = useTranslations('config');

  const hudColorOptions: ConfigSelectOption[] = [
    { label: t('colorTeam'), value: '0' },
    { label: t('colorWhite'), value: '1' },
    { label: t('colorBrightWhite'), value: '2' },
    { label: t('colorLightBlue'), value: '3' },
    { label: t('colorBlue'), value: '4' },
    { label: t('colorPurple'), value: '5' },
    { label: t('colorRed'), value: '6' },
    { label: t('colorOrange'), value: '7' },
    { label: t('colorYellow'), value: '8' },
    { label: t('colorGreen'), value: '9' },
    { label: t('colorAqua'), value: '10' },
    { label: t('colorPink'), value: '11' },
    { label: t('colorTeammate'), value: '12' },
  ];

  const teammateColorOptions: ConfigSelectOption[] = [
    { label: t('teammateOff'), value: '0' },
    { label: t('teammateColorsOnly'), value: '1' },
    { label: t('teammateColorsLetters'), value: '2' },
  ];

  return (
    <div className='flex flex-col gap-6'>
      <ConfigSelectRow
        description={t('hudColorDescription')}
        id='hud-color'
        label={t('hudColor')}
        onChange={(value) => {
          onUpdate('hudColor', Number(value));
        }}
        options={hudColorOptions}
        value={String(hud.hudColor)}
      />
      <CrosshairControlSlider
        id='hud-scaling'
        label={t('hudScale')}
        max={0.95}
        min={0.5}
        onValueChange={(value) => {
          onUpdate('hudScaling', value);
        }}
        step={0.01}
        value={hud.hudScaling}
      />
      <ConfigSelectRow
        description={t('teammateColorsDescription')}
        id='hud-teammate-colors'
        label={t('teammateColors')}
        onChange={(value) => {
          onUpdate('teammateColors', Number(value));
        }}
        options={teammateColorOptions}
        value={String(hud.teammateColors)}
      />
      <CrosshairControlSlider
        id='hud-teamid-fade'
        label={t('teammateFade')}
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('teamidOverheadFadeNearCrosshair', value);
        }}
        step={0.01}
        value={hud.teamidOverheadFadeNearCrosshair}
      />
      <ConfigSwitchRow
        description={t('alwaysLoadoutDescription')}
        enabled={hud.showLoadout}
        id='hud-show-loadout'
        label={t('alwaysLoadout')}
        onChange={(enabled) => {
          onUpdate('showLoadout', enabled);
        }}
      />
      <ConfigSwitchRow
        description={t('sniperInaccuracyDescription')}
        enabled={hud.sniperShowInaccuracy}
        id='hud-sniper-inaccuracy'
        label={t('sniperInaccuracy')}
        onChange={(enabled) => {
          onUpdate('sniperShowInaccuracy', enabled);
        }}
      />
      <ConfigSwitchRow
        description={t('buildInfoDescription')}
        enabled={hud.showBuildInfo}
        id='hud-build-info'
        label={t('buildInfo')}
        onChange={(enabled) => {
          onUpdate('showBuildInfo', enabled);
        }}
      />
    </div>
  );
}
