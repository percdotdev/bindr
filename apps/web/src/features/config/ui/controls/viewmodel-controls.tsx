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
import { useTranslations } from 'next-intl';

import { ConfigSwitchRow } from '@/features/config/ui/controls/config-switch-row';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';

const VIEWMODEL_FIELDS: {
  field: ViewmodelField;
  id: string;
  labelKey: 'fov' | 'offsetX' | 'offsetY' | 'offsetZ';
  max: number;
  min: number;
  step: number;
}[] = [
  {
    field: 'fov',
    id: 'viewmodel-fov',
    labelKey: 'fov',
    max: 68,
    min: 54,
    step: 1,
  },
  {
    field: 'offsetX',
    id: 'viewmodel-offset-x',
    labelKey: 'offsetX',
    max: 2.5,
    min: -2.5,
    step: 0.01,
  },
  {
    field: 'offsetY',
    id: 'viewmodel-offset-y',
    labelKey: 'offsetY',
    max: 2,
    min: -2,
    step: 0.01,
  },
  {
    field: 'offsetZ',
    id: 'viewmodel-offset-z',
    labelKey: 'offsetZ',
    max: 2,
    min: -2,
    step: 0.01,
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
  const t = useTranslations('config');
  const tCommon = useTranslations('common');
  const presetValue = findMatchingPresetId(viewmodel) ?? 'custom';

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='viewmodel-preset'>{t('preset')}</Label>
        <Select
          onValueChange={(value) => {
            if (value && value !== 'custom') {
              onPresetChange(value);
            }
          }}
          value={presetValue}
        >
          <SelectTrigger className='w-full' id='viewmodel-preset'>
            <SelectValue placeholder={tCommon('custom')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='custom'>{tCommon('custom')}</SelectItem>
            {VIEWMODEL_PRESETS.map((preset) => (
              <SelectItem key={preset.id} value={preset.id}>
                {t(
                  `presets.${preset.id}.label` as 'presets.valve-default.label'
                )}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {VIEWMODEL_FIELDS.map((control) => (
        <CrosshairControlSlider
          id={control.id}
          key={control.id}
          label={t(control.labelKey)}
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
        description={t('leftHandedDescription')}
        enabled={viewmodel.preferLeftHanded}
        id='viewmodel-left-hand'
        label={t('leftHanded')}
        onChange={(enabled) => {
          onUpdate('preferLeftHanded', enabled);
        }}
      />
    </div>
  );
}
