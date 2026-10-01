import {
  resolveCrosshairAlpha,
  resolveCrosshairOutlineAlpha,
  resolveCrosshairOutlineRgb,
  resolveCrosshairRgb,
} from '@workspace/cs2/crosshair/model/crosshair-color';
import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';
import {
  buildCrosshairShapes,
  type CrosshairShapes,
  crosshairCenter,
  type PixelArc,
  type PixelRect,
} from '@/features/crosshair/lib/rendering/crosshair-geometry';

/** 1 canvas px = 1 game px at the crosshair's screen height. */
export const PREVIEW_CANVAS_SIZE = 120;
export const PREVIEW_DISPLAY_SIZE = 120;

const OUTLINE_PX = 1;
const OUTLINE_OFF = 0;
const OUTLINE_HALF = 2;

function fillRects(
  context: CanvasRenderingContext2D,
  rects: readonly PixelRect[],
  pad: number
) {
  for (const rect of rects) {
    context.fillRect(
      rect.x - pad,
      rect.y - pad,
      rect.width + pad * 2,
      rect.height + pad * 2
    );
  }
}

function strokeArcs(
  context: CanvasRenderingContext2D,
  arcs: readonly PixelArc[],
  center: number,
  lineWidth: number
) {
  context.lineWidth = lineWidth;
  for (const arc of arcs) {
    context.beginPath();
    context.arc(center, center, arc.radius, arc.start, arc.end);
    context.stroke();
  }
}

function drawShapes(
  context: CanvasRenderingContext2D,
  shapes: CrosshairShapes,
  center: number,
  pad: number
) {
  fillRects(context, shapes.rects, pad);
  strokeArcs(context, shapes.arcs, center, shapes.thickness + pad * 2);
  if (shapes.dot) {
    fillRects(context, [shapes.dot], pad);
  }
}

/** Half outline only shades the top and left edges: clip to that half-plane. */
function clipTopLeftHalf(context: CanvasRenderingContext2D, center: number) {
  const diagonal = center * 2;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(diagonal, 0);
  context.lineTo(0, diagonal);
  context.closePath();
  context.clip();
}

function drawHalfOutlineRects(
  context: CanvasRenderingContext2D,
  rects: readonly PixelRect[]
) {
  for (const rect of rects) {
    context.fillRect(
      rect.x - OUTLINE_PX,
      rect.y - OUTLINE_PX,
      rect.width + OUTLINE_PX,
      rect.height + OUTLINE_PX
    );
  }
}

function drawOutline(
  context: CanvasRenderingContext2D,
  crosshair: CrosshairSettings,
  shapes: CrosshairShapes,
  center: number
) {
  const [red, green, blue] = resolveCrosshairOutlineRgb(crosshair);
  const alpha = resolveCrosshairOutlineAlpha(crosshair);
  const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  context.fillStyle = color;
  context.strokeStyle = color;

  if (crosshair.outlineMode !== OUTLINE_HALF) {
    drawShapes(context, shapes, center, OUTLINE_PX);
    return;
  }

  const rects = shapes.dot ? [...shapes.rects, shapes.dot] : shapes.rects;
  drawHalfOutlineRects(context, rects);

  if (shapes.arcs.length > 0) {
    context.save();
    clipTopLeftHalf(context, center);
    strokeArcs(context, shapes.arcs, center, shapes.thickness + OUTLINE_PX * 2);
    context.restore();
  }
}

export function renderCrosshair(
  context: CanvasRenderingContext2D,
  crosshair: CrosshairSettings,
  canvasSize = PREVIEW_CANVAS_SIZE
) {
  context.clearRect(0, 0, canvasSize, canvasSize);
  context.imageSmoothingEnabled = false;
  context.lineCap = 'butt';

  const shapes = buildCrosshairShapes(crosshair, canvasSize);
  const center = crosshairCenter(canvasSize, shapes.thickness);

  if (crosshair.outlineMode !== OUTLINE_OFF) {
    drawOutline(context, crosshair, shapes, center);
  }

  const [red, green, blue] = resolveCrosshairRgb(crosshair);
  const alpha = resolveCrosshairAlpha(crosshair);
  const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
  context.fillStyle = color;
  context.strokeStyle = color;
  drawShapes(context, shapes, center, 0);
}
