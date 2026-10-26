'use client';

import type { HudSettings } from '@workspace/cs2/config/model/types';
import {
  type ConfigSelectOption,
  ConfigSelectRow,
} from '@/features/config/ui/controls/config-select-row';
import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

const HUD_COLOR_OPTIONS: ConfigSelectOption[] = [
  { label: 'Team color', value: '0' },
  { label: 'White', value: '1' },
  { label: 'Bright white', value: '2' },
  { label: 'Light blue', value: '3' },
  { label: 'Blue', value: '4' },
  { label: 'Purple', value: '5' },
  { label: 'Red', value: '6' },
  { label: 'Orange', value: '7' },
  { label: 'Yellow', value: '8' },
  { label: 'Green', value: '9' },
  { label: 'Aqua', value: '10' },
  { label: 'Pink', value: '11' },
  { label: 'Teammate color', value: '12' },
];

const TEAMMATE_COLOR_OPTIONS: ConfigSelectOption[] = [
  { label: 'Off', value: '0' },
  { label: 'Colors', value: '1' },
  { label: 'Colors + letters', value: '2' },
];

interface HudControlsProps {
  hud: HudSettings;
  onUpdate: <K extends keyof HudSettings>(
    field: K,
    value: HudSettings[K]
  ) => void;
}

export function HudControls({ hud, onUpdate }: HudControlsProps) {
  return (
    <div className='flex flex-col gap-6'>
      <ConfigSelectRow
        description='cl_hud_color — HUD accent color.'
        id='hud-color'
        label='HUD color'
        onChange={(value) => {
          onUpdate('hudColor', Number(value));
        }}
        options={HUD_COLOR_OPTIONS}
        value={String(hud.hudColor)}
      />
      <CrosshairControlSlider
        id='hud-scaling'
        label='HUD scale'
        max={0.95}
        min={0.5}
        onValueChange={(value) => {
          onUpdate('hudScaling', value);
        }}
        step={0.01}
        value={hud.hudScaling}
      />
      <ConfigSelectRow
        description='cl_teammate_colors_show — teammate identification.'
        id='hud-teammate-colors'
        label='Teammate colors'
        onChange={(value) => {
          onUpdate('teammateColors', Number(value));
        }}
        options={TEAMMATE_COLOR_OPTIONS}
        value={String(hud.teammateColors)}
      />
      <CrosshairControlSlider
        id='hud-teamid-fade'
        label='Teammate name fade at crosshair'
        max={1}
        min={0}
        onValueChange={(value) => {
          onUpdate('teamidOverheadFadeNearCrosshair', value);
        }}
        step={0.01}
        value={hud.teamidOverheadFadeNearCrosshair}
      />
      <ConfigSwitchRow
        description='cl_showloadout — always show the weapon loadout panel.'
        enabled={hud.showLoadout}
        id='hud-show-loadout'
        label='Always show loadout'
        onChange={(enabled) => {
          onUpdate('showLoadout', enabled);
        }}
      />
      <ConfigSwitchRow
        description='cl_sniper_show_inaccuracy — moving spread circle on AWP/SSG 08. Off restores the classic overlay.'
        enabled={hud.sniperShowInaccuracy}
        id='hud-sniper-inaccuracy'
        label='Show scoped sniper inaccuracy'
        onChange={(enabled) => {
          onUpdate('sniperShowInaccuracy', enabled);
        }}
      />
      <ConfigSwitchRow
        description='r_show_build_info — version/debug overlay in the corner.'
        enabled={hud.showBuildInfo}
        id='hud-build-info'
        label='Show build info'
        onChange={(enabled) => {
          onUpdate('showBuildInfo', enabled);
        }}
      />
    </div>
  );
}
