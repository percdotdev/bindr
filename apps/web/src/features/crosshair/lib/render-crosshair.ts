import {
  resolveCrosshairAlpha,
  resolveCrosshairRgb,
} from '@/features/crosshair/lib/crosshair-color';
import type { CrosshairSettings } from '@/features/crosshair/lib/types';

export const PREVIEW_CANVAS_SIZE = 50;
export const PREVIEW_DISPLAY_SIZE = 50;

function getCrosshairMetrics(crosshair: CrosshairSettings) {
  const crosshairLength = Math.floor(crosshair.length * 2);
  const crosshairWidth = Math.max(1, Math.floor(crosshair.thickness * 2));
  const crosshairGap = Math.ceil(crosshair.gap + 4);
  const adjustedLength =
    Math.trunc(crosshair.length) > 2 ? crosshairLength + 1 : crosshairLength;

  return { adjustedLength, crosshairGap, crosshairWidth };
}

export function renderCrosshair(
  context: CanvasRenderingContext2D,
  crosshair: CrosshairSettings,
  canvasSize = PREVIEW_CANVAS_SIZE
) {
  context.clearRect(0, 0, canvasSize, canvasSize);

  const center = { x: canvasSize / 2, y: canvasSize / 2 };
  const [red, green, blue] = resolveCrosshairRgb(crosshair);
  const alpha = resolveCrosshairAlpha(crosshair);
  const { adjustedLength, crosshairGap, crosshairWidth } =
    getCrosshairMetrics(crosshair);
  const outlineThickness =
    crosshair.outlineEnabled && crosshair.outline > 0 ? crosshair.outline : 0;
  const crosshairColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  context.imageSmoothingEnabled = false;

  const translate = (crosshairWidth % 2) / 2;
  context.translate(translate, translate);

  if (outlineThickness > 0) {
    context.fillStyle = `rgba(0, 0, 0, ${alpha})`;

    const strokeTranslate = crosshairWidth / 2 - Math.floor(crosshairWidth / 2);
    context.translate(-translate, -translate);
    context.translate(strokeTranslate, strokeTranslate);

    drawArms(
      context,
      center,
      adjustedLength,
      crosshairGap,
      crosshairWidth,
      outlineThickness,
      crosshair.tStyleEnabled,
      true
    );

    context.translate(-strokeTranslate, -strokeTranslate);
    context.translate(translate, translate);
  }

  context.fillStyle = crosshairColor;

  drawArms(
    context,
    center,
    adjustedLength,
    crosshairGap,
    crosshairWidth,
    0,
    crosshair.tStyleEnabled,
    false
  );

  if (crosshair.centerDotEnabled) {
    if (outlineThickness > 0) {
      context.fillStyle = `rgba(0, 0, 0, ${alpha})`;

      const strokeTranslate =
        crosshairWidth / 2 - Math.floor(crosshairWidth / 2);
      context.translate(-translate, -translate);
      context.translate(strokeTranslate, strokeTranslate);

      context.fillRect(
        center.x - crosshairWidth / 2 - outlineThickness,
        center.y - crosshairWidth / 2 - outlineThickness,
        crosshairWidth + outlineThickness * 2,
        crosshairWidth + outlineThickness * 2
      );

      context.translate(-strokeTranslate, -strokeTranslate);
      context.translate(translate, translate);
    }

    context.fillStyle = crosshairColor;
    context.fillRect(
      center.x - crosshairWidth / 2,
      center.y - crosshairWidth / 2,
      crosshairWidth,
      crosshairWidth
    );
  }

  context.translate(-translate, -translate);
}

function drawArms(
  context: CanvasRenderingContext2D,
  center: { x: number; y: number },
  adjustedLength: number,
  crosshairGap: number,
  crosshairWidth: number,
  outlineThickness: number,
  tStyleEnabled: boolean,
  isOutline: boolean
) {
  const pad = isOutline ? outlineThickness : 0;
  const widthPad = crosshairWidth + pad * 2;
  const lengthPad = adjustedLength + pad * 2;

  context.fillRect(
    center.x + crosshairWidth / 2 + crosshairGap - pad,
    center.y - crosshairWidth / 2 - pad,
    lengthPad,
    widthPad
  );

  context.fillRect(
    center.x - (adjustedLength + crosshairWidth / 2 + crosshairGap) - pad,
    center.y - crosshairWidth / 2 - pad,
    lengthPad,
    widthPad
  );

  context.fillRect(
    center.x - crosshairWidth / 2 - pad,
    center.y + crosshairWidth / 2 + crosshairGap - pad,
    widthPad,
    lengthPad
  );

  if (!tStyleEnabled) {
    context.fillRect(
      center.x - crosshairWidth / 2 - pad,
      center.y - (adjustedLength + crosshairWidth / 2 + crosshairGap) - pad,
      widthPad,
      lengthPad
    );
  }
}
