'use client';

import {
  CROSSHAIR_LIMITS,
  CROSSHAIR_MENU_LIMITS,
} from '@workspace/cs2/crosshair/model/crosshair-limits';
import {
  allowsNegativeCrosshairGap,
  showsCrosshairCenterDotControl,
  showsCrosshairGapControl,
  showsCrosshairLengthControl,
  showsCrosshairTStyleControl,
} from '@workspace/cs2/crosshair/model/crosshair-style';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import { useTranslations } from 'next-intl';

import type { CrosshairRgba } from '@/features/crosshair/lib/storage/crosshair-store';
import { CrosshairColorPicker } from '@/features/crosshair/ui/controls/crosshair-color-picker';
import { CrosshairControlSlider } from '@/features/crosshair/ui/controls/crosshair-control-slider';
import { CrosshairToggle } from '@/features/crosshair/ui/controls/crosshair-toggle';

interface CrosshairAppearanceControlsProps {
  crosshair: CrosshairSettings;
  onRgbaChange: (rgba: CrosshairRgba) => void;
  onUpdate: <K extends keyof CrosshairSettings>(
    field: K,
    value: CrosshairSettings[K]
  ) => void;
}

export function CrosshairAppearanceControls({
  crosshair,
  onRgbaChange,
  onUpdate,
}: CrosshairAppearanceControlsProps) {
  const t = useTranslations('crosshair');
  const gapLimits = allowsNegativeCrosshairGap(crosshair.style)
    ? CROSSHAIR_MENU_LIMITS.classicGap
    : CROSSHAIR_MENU_LIMITS.gap;
  const showsDot = showsCrosshairCenterDotControl(crosshair.style);
  const showsTStyle = showsCrosshairTStyleControl(crosshair.style);

  return (
    <div className='flex flex-col gap-4'>
      {showsCrosshairLengthControl(crosshair.style) ? (
        <CrosshairControlSlider
          id='crosshair-length'
          label={t('length')}
          max={CROSSHAIR_LIMITS.length.max}
          min={CROSSHAIR_LIMITS.length.min}
          onValueChange={(value) => onUpdate('length', value)}
          step={CROSSHAIR_LIMITS.length.step}
          value={crosshair.length}
        />
      ) : null}
      <CrosshairControlSlider
        id='crosshair-thickness'
        label={t('thickness')}
        max={CROSSHAIR_LIMITS.thickness.max}
        min={CROSSHAIR_LIMITS.thickness.min}
        onValueChange={(value) => onUpdate('thickness', value)}
        step={CROSSHAIR_LIMITS.thickness.step}
        value={crosshair.thickness}
      />
      {showsCrosshairGapControl(crosshair.style) ? (
        <CrosshairControlSlider
          id='crosshair-gap'
          label={t('gap')}
          max={gapLimits.max}
          min={gapLimits.min}
          onValueChange={(value) => onUpdate('gap', value)}
          step={gapLimits.step}
          value={crosshair.gap}
        />
      ) : null}

      <CrosshairColorPicker
        id='crosshair-color'
        label={t('color')}
        onChange={onRgbaChange}
        value={{
          alpha: crosshair.alpha,
          blue: crosshair.blue,
          green: crosshair.green,
          red: crosshair.red,
        }}
      />
      <CrosshairControlSlider
        id='crosshair-alpha'
        label={t('alpha')}
        max={CROSSHAIR_LIMITS.alpha.max}
        min={CROSSHAIR_LIMITS.alpha.min}
        onValueChange={(value) => onUpdate('alpha', value)}
        step={CROSSHAIR_LIMITS.alpha.step}
        value={crosshair.alpha}
      />

      {showsDot || showsTStyle ? (
        <div className='flex flex-wrap gap-2'>
          {showsDot ? (
            <CrosshairToggle
              enabled={crosshair.centerDotEnabled}
              label={t('centerDot')}
              onToggle={(value) => onUpdate('centerDotEnabled', value)}
            />
          ) : null}
          {showsTStyle ? (
            <CrosshairToggle
              enabled={crosshair.tStyleEnabled}
              label={t('tStyle')}
              onToggle={(value) => onUpdate('tStyleEnabled', value)}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
