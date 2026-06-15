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
    id: 'viewmodel-fov',
    field: 'fov',
    label: 'FOV',
    min: 54,
    max: 68,
    step: 1,
  },
  {
    id: 'viewmodel-offset-x',
    field: 'offsetX',
    label: 'Offset X',
    min: -2.5,
    max: 2.5,
    step: 0.1,
  },
  {
    id: 'viewmodel-offset-y',
    field: 'offsetY',
    label: 'Offset Y',
    min: -2,
    max: 2,
    step: 0.1,
  },
  {
    id: 'viewmodel-offset-z',
    field: 'offsetZ',
    label: 'Offset Z',
    min: -2,
    max: 2,
    step: 0.1,
  },
  {
    id: 'viewmodel-bob-lat',
    field: 'bobLat',
    label: 'Bob lateral',
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    id: 'viewmodel-bob-vert',
    field: 'bobVert',
    label: 'Bob vertical',
    min: 0,
    max: 1,
    step: 0.05,
  },
  {
    id: 'viewmodel-bob-lower',
    field: 'bobLowerAmt',
    label: 'Run dip',
    min: 0,
    max: 30,
    step: 1,
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
        description='cl_righthand — switch the weapon to your left hand when off.'
        enabled={viewmodel.rightHand}
        id='viewmodel-right-hand'
        label='Right-handed'
        onChange={(enabled) => {
          onUpdate('rightHand', enabled);
        }}
      />
    </div>
  );
}
