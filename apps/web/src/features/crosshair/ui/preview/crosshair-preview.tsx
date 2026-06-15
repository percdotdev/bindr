'use client';

import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import {
  PREVIEW_MAP_BACKGROUNDS,
  PREVIEW_MAP_HEIGHT,
  PREVIEW_MAP_WIDTH,
} from '@/features/crosshair/lib/rendering/preview-map-backgrounds';
import {
  PREVIEW_CANVAS_SIZE,
  PREVIEW_DISPLAY_SIZE,
  renderCrosshair,
} from '@/features/crosshair/lib/rendering/render-crosshair';

interface CrosshairPreviewProps {
  crosshair: CrosshairSettings;
}

export function CrosshairPreview({ crosshair }: CrosshairPreviewProps) {
  const [activeMapId, setActiveMapId] = useState(
    PREVIEW_MAP_BACKGROUNDS[0]?.id ?? 'inferno'
  );

  const canvasRef = useCallback(
    (node: HTMLCanvasElement | null) => {
      if (!node) {
        return;
      }

      const context = node.getContext('2d');
      if (!context) {
        return;
      }

      renderCrosshair(context, crosshair, PREVIEW_CANVAS_SIZE);
    },
    [crosshair]
  );

  const activeMap =
    PREVIEW_MAP_BACKGROUNDS.find((map) => map.id === activeMapId) ??
    PREVIEW_MAP_BACKGROUNDS[0];

  if (!activeMap) {
    return null;
  }

  return (
    <div className='relative w-full overflow-hidden ring-1 ring-foreground/10'>
      <div
        className='relative w-full bg-black'
        style={{ aspectRatio: `${PREVIEW_MAP_WIDTH} / ${PREVIEW_MAP_HEIGHT}` }}
      >
        <Image
          alt={`${activeMap.label} crosshair preview background`}
          className='size-full object-cover'
          height={PREVIEW_MAP_HEIGHT}
          priority={activeMap.id === 'inferno'}
          src={activeMap.src}
          unoptimized
          width={PREVIEW_MAP_WIDTH}
        />

        <div
          aria-hidden
          className='pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 to-black/30'
        />

        <div className='pointer-events-none absolute top-1/2 left-1/2 flex size-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden'>
          <canvas
            aria-label='Crosshair preview'
            className='block'
            height={PREVIEW_CANVAS_SIZE}
            ref={canvasRef}
            style={{
              height: PREVIEW_DISPLAY_SIZE,
              imageRendering: 'pixelated',
              width: PREVIEW_DISPLAY_SIZE,
            }}
            width={PREVIEW_CANVAS_SIZE}
          />
        </div>

        <div className='absolute right-2 bottom-2 z-10'>
          <Select
            onValueChange={(value) => {
              if (value) {
                setActiveMapId(value);
              }
            }}
            value={activeMap.id}
          >
            <SelectTrigger
              aria-label='Preview map'
              className='h-7 min-w-28 border-white/20 bg-black/60 text-white backdrop-blur-sm hover:bg-black/75 data-placeholder:text-white/70 [&_svg]:text-white/70'
              id='preview-map'
              size='sm'
            >
              <SelectValue>{activeMap.label}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {PREVIEW_MAP_BACKGROUNDS.map((map) => (
                <SelectItem key={map.id} value={map.id}>
                  {map.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
