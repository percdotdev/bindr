'use client';

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@workspace/ui/components/carousel';
import { cn } from '@workspace/ui/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import {
  PREVIEW_MAP_BACKGROUNDS,
  PREVIEW_MAP_HEIGHT,
  PREVIEW_MAP_WIDTH,
} from '@/features/crosshair/lib/preview-map-backgrounds';
import {
  PREVIEW_CANVAS_SIZE,
  PREVIEW_DISPLAY_SIZE,
  renderCrosshair,
} from '@/features/crosshair/lib/render-crosshair';
import type { CrosshairSettings } from '@/features/crosshair/lib/types';

interface CrosshairPreviewProps {
  crosshair: CrosshairSettings;
}

export function CrosshairPreview({ crosshair }: CrosshairPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeMapIndex, setActiveMapIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    renderCrosshair(context, crosshair, PREVIEW_CANVAS_SIZE);
  }, [crosshair]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const onSelect = () => {
      setActiveMapIndex(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on('select', onSelect);

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  const activeMap = PREVIEW_MAP_BACKGROUNDS[activeMapIndex];

  return (
    <div
      className='relative w-full max-w-[909px] overflow-hidden rounded-none bg-black ring-1 ring-foreground/10'
      style={{ aspectRatio: `${PREVIEW_MAP_WIDTH} / ${PREVIEW_MAP_HEIGHT}` }}
    >
      <Carousel className='absolute inset-0 size-full' setApi={setCarouselApi}>
        <CarouselContent className='ml-0 h-full'>
          {PREVIEW_MAP_BACKGROUNDS.map((map) => (
            <CarouselItem className='h-full pl-0' key={map.id}>
              <div className='relative size-full'>
                <Image
                  alt={`${map.label} crosshair preview background`}
                  className='object-cover'
                  fill
                  priority={map.id === 'inferno'}
                  quality={90}
                  sizes='909px'
                  src={map.src}
                  unoptimized
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={cn(
            'top-1/2 left-2 -translate-y-1/2 border-white/20 bg-black/50 text-white hover:bg-black/70 hover:text-white'
          )}
          variant='outline'
        />
        <CarouselNext
          className={cn(
            'top-1/2 right-2 -translate-y-1/2 border-white/20 bg-black/50 text-white hover:bg-black/70 hover:text-white'
          )}
          variant='outline'
        />
      </Carousel>

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

      <p className='pointer-events-none absolute right-2 bottom-2 font-mono text-[10px] text-white/70'>
        {activeMap?.label ?? 'Map preview'}
      </p>
    </div>
  );
}
