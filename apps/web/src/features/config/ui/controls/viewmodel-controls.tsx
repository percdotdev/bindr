'use client';

import type {
  ViewmodelField,
  ViewmodelSettings,
} from '@workspace/cs2/config/model/types';
import { VIEWMODEL_PRESETS } from '@workspace/cs2/config/model/viewmodel-presets';
import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

const VIEWMODEL_FIELDS: {
  field: ViewmodelField;
  id: string;
  label: string;
  max: number;
  min: number;
  step: number;
}[] = [
  {
    field: 'fov',
    id: 'viewmodel-fov',
    label: 'FOV',
    max: 68,
    min: 54,
    step: 1,
  },
  {
    field: 'offsetX',
    id: 'viewmodel-offset-x',
    label: 'Offset X',
    max: 2.5,
    min: -2.5,
    step: 0.1,
  },
  {
    field: 'offsetY',
    id: 'viewmodel-offset-y',
    label: 'Offset Y',
    max: 2,
    min: -2,
    step: 0.1,
  },
  {
    field: 'offsetZ',
    id: 'viewmodel-offset-z',
    label: 'Offset Z',
    max: 2,
    min: -2,
    step: 0.1,
  },
];

function findMatchingPresetId(viewmodel: ViewmodelSettings) {
  return VIEWMODEL_PRESETS.find(
    (preset) =>
      preset.viewmodel.fov === viewmodel.fov &&
      preset.viewmodel.offsetX === viewmodel.offsetX &&
      preset.viewmodel.offsetY === viewmodel.offsetY &&
      preset.viewmodel.offsetZ === viewmodel.offsetZ &&
      preset.viewmodel.presetPos === viewmodel.presetPos
  )?.id;
}

interface ViewmodelControlsProps {
  onPresetChange: (presetId: string) => void;
  onUpdate: <K extends ViewmodelField>(
    field: K,
    value: ViewmodelSettings[K]
  ) => void;
  viewmodel: ViewmodelSettings;
}

export function ViewmodelControls({
  onPresetChange,
  onUpdate,
  viewmodel,
}: ViewmodelControlsProps) {
  const presetValue = findMatchingPresetId(viewmodel) ?? 'custom';

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='viewmodel-preset'>Preset</Label>
        <Select
          onValueChange={(value) => {
            if (value && value !== 'custom') {
              onPresetChange(value);
            }
          }}
          value={presetValue}
        >
          <SelectTrigger className='w-full' id='viewmodel-preset'>
            <SelectValue placeholder='Custom' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='custom'>Custom</SelectItem>
            {VIEWMODEL_PRESETS.map((preset) => (
              <SelectItem key={preset.id} value={preset.id}>
                {preset.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {VIEWMODEL_FIELDS.map((control) => (
        <CrosshairControlSlider
          id={control.id}
          key={control.id}
          label={control.label}
          max={control.max}
          min={control.min}
          onValueChange={(value) => {
            onUpdate(control.field, value);
          }}
          step={control.step}
          value={viewmodel[control.field] as number}
        />
      ))}

      <ConfigSwitchRow
        description='cl_prefer_lefthanded — CS2 replacement for removed cl_righthand. switchhands still toggles mid-round.'
        enabled={viewmodel.preferLeftHanded}
        id='viewmodel-left-hand'
        label='Left-handed'
        onChange={(enabled) => {
          onUpdate('preferLeftHanded', enabled);
        }}
      />
    </div>
  );
}
