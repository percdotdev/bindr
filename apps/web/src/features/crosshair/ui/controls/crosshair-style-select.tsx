'use client';

import { CROSSHAIR_STYLE_OPTIONS } from '@workspace/cs2/crosshair/model/crosshair-style';
import { Label } from '@workspace/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { useTranslations } from 'next-intl';

interface CrosshairStyleSelectProps {
  onStyleChange: (style: number) => void;
  style: number;
}

export function CrosshairStyleSelect({
  onStyleChange,
  style,
}: CrosshairStyleSelectProps) {
  const t = useTranslations('crosshair');
  const styleKey = String(style) as
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9';

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor='crosshair-style'>{t('style')}</Label>
      <Select
        onValueChange={(value) => {
          if (value !== null) {
            onStyleChange(Number(value));
          }
        }}
        value={String(style)}
      >
        <SelectTrigger className='w-full' id='crosshair-style'>
          <SelectValue>{t(`styles.${styleKey}.label`)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {CROSSHAIR_STYLE_OPTIONS.map((option) => {
            const key = String(option.value) as typeof styleKey;
            return (
              <SelectItem key={option.value} value={String(option.value)}>
                {t(`styles.${key}.label`)}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <p className='text-muted-foreground text-xs'>
        {t(`styles.${styleKey}.description`)}
      </p>
    </div>
  );
}
