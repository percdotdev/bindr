'use client';

import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { useTranslations } from 'next-intl';

import type { CrosshairRgba } from '@/features/crosshair/lib/storage/crosshair-store';
import { CrosshairColorPicker } from '@/features/crosshair/ui/controls/crosshair-color-picker';

interface CrosshairOutlineControlsProps {
  crosshair: CrosshairSettings;
  onOutlineRgbaChange: (rgba: CrosshairRgba) => void;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

const OUTLINE_MODE_OPTIONS = [
  { key: 'outlineOff' as const, value: 0 },
  { key: 'outlineFull' as const, value: 1 },
  { key: 'outlineHalf' as const, value: 2 },
];

export function CrosshairOutlineControls({
  crosshair,
  onOutlineRgbaChange,
  onUpdate,
}: CrosshairOutlineControlsProps) {
  const t = useTranslations('crosshair');
  const activeKey =
    OUTLINE_MODE_OPTIONS.find(
      (option) => option.value === crosshair.outlineMode
    )?.key ?? 'outlineOff';

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-2'>
        <Label htmlFor='crosshair-outline-mode'>{t('outlineMode')}</Label>
        <Select
          onValueChange={(value) => {
            if (value !== null) {
              onUpdate('outlineMode', Number(value));
            }
          }}
          value={String(crosshair.outlineMode)}
        >
          <SelectTrigger className='w-full' id='crosshair-outline-mode'>
            <SelectValue>{t(activeKey)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {OUTLINE_MODE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {t(option.key)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {crosshair.outlineMode === 0 ? null : (
        <CrosshairColorPicker
          id='crosshair-outline-color'
          label={t('outlineColor')}
          onChange={onOutlineRgbaChange}
          value={{
            alpha: crosshair.outlineAlpha,
            blue: crosshair.outlineBlue,
            green: crosshair.outlineGreen,
            red: crosshair.outlineRed,
          }}
        />
      )}
    </div>
  );
}
