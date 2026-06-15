'use client';

import type { HudSettings } from '@/features/config/lib/model/types';
import {
  type ConfigSelectOption,
  ConfigSelectRow,
} from '@/features/config/ui/controls/config-select-row';
import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

const HUD_COLOR_OPTIONS: ConfigSelectOption[] = [
  { value: '0', label: 'Team default' },
  { value: '1', label: 'White' },
  { value: '2', label: 'Light blue' },
  { value: '3', label: 'Blue' },
  { value: '4', label: 'Purple' },
  { value: '5', label: 'Red' },
  { value: '6', label: 'Orange' },
  { value: '7', label: 'Yellow' },
  { value: '8', label: 'Green' },
  { value: '9', label: 'Aqua' },
  { value: '10', label: 'Pink' },
];

const TEAMMATE_COLOR_OPTIONS: ConfigSelectOption[] = [
  { value: '0', label: 'Off' },
  { value: '1', label: 'Colors' },
  { value: '2', label: 'Colors + letters' },
];

const HEALTH_AMMO_OPTIONS: ConfigSelectOption[] = [
  { value: '0', label: 'Default' },
  { value: '1', label: 'Simple' },
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
        step={0.05}
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
      <ConfigSelectRow
        description='cl_hud_healthammo_style — health/ammo readout.'
        id='hud-health-ammo'
        label='Health/ammo style'
        onChange={(value) => {
          onUpdate('healthAmmoStyle', Number(value));
        }}
        options={HEALTH_AMMO_OPTIONS}
        value={String(hud.healthAmmoStyle)}
      />
      <CrosshairControlSlider
        id='hud-teamid-fade'
        label='Teammate name fade at crosshair'
        max={1}
        min={0.75}
        onValueChange={(value) => {
          onUpdate('teamidOverheadFadeNearCrosshair', value);
        }}
        step={0.05}
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
        description='cl_hud_bomb_under_radar — place the bomb icon under the radar.'
        enabled={hud.bombUnderRadar}
        id='hud-bomb-under-radar'
        label='Bomb under radar'
        onChange={(enabled) => {
          onUpdate('bombUnderRadar', enabled);
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
