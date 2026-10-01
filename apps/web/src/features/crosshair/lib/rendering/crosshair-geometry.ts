import type { CrosshairSettings } from '@workspace/cs2/crosshair/model/types';

export interface PixelRect {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface PixelArc {
  /** Radians, clockwise from +x like `CanvasRenderingContext2D.arc`. */
  end: number;
  radius: number;
  start: number;
}

export interface CrosshairShapes {
  arcs: PixelArc[];
  /** Center dot, drawn last. */
  dot: PixelRect | null;
  rects: PixelRect[];
  /** Stroke width used for arcs. */
  thickness: number;
}

const CROSS_STYLES = new Set([0, 2, 4, 5]);
const CIRCLE_STYLES = new Set([1, 3]);
const QUADRANT_STYLES = new Set([7, 9]);
const SQUARE_STYLE = 8;
const DYNAMIC_RING_STYLES = new Set([1, 7]);

/** Rough resting inaccuracy for a rifle at 1080p, so dynamic rings aren't collapsed. */
const RESTING_SPREAD_PX = 7;
const QUARTER_TURN = Math.PI / 2;
const DIAGONAL = Math.PI / 4;

/** Gap 0 and gap 1 render identically in-game; every px above that adds one. */
function effectiveGap(gap: number): number {
  return gap > 0 ? gap - 1 : gap;
}

/** Odd thickness centers on a pixel, even thickness on a pixel boundary. */
export function crosshairCenter(canvasSize: number, thickness: number): number {
  return canvasSize / 2 + (thickness % 2 === 1 ? 0.5 : 0);
}

function crossRects(
  center: number,
  thickness: number,
  gap: number,
  length: number,
  tStyle: boolean
): PixelRect[] {
  if (length <= 0) {
    return [];
  }

  const half = thickness / 2;
  const start = center + half + gap;
  const far = center - half - gap - length;
  const rects: PixelRect[] = [
    { x: start, y: center - half, width: length, height: thickness },
    { x: far, y: center - half, width: length, height: thickness },
    { x: center - half, y: start, width: thickness, height: length },
  ];

  if (!tStyle) {
    rects.push({ x: center - half, y: far, width: thickness, height: length });
  }

  return rects;
}

function squareRects(
  center: number,
  thickness: number,
  gap: number
): PixelRect[] {
  const inner = gap + thickness / 2;
  const outer = inner + thickness;
  const side = outer * 2;

  return [
    { x: center - outer, y: center - outer, width: side, height: thickness },
    { x: center - outer, y: center + inner, width: side, height: thickness },
    {
      x: center - outer,
      y: center - inner,
      width: thickness,
      height: inner * 2,
    },
    {
      x: center + inner,
      y: center - inner,
      width: thickness,
      height: inner * 2,
    },
  ];
}

function ringRadius(crosshair: CrosshairSettings, thickness: number): number {
  const restSpread = DYNAMIC_RING_STYLES.has(crosshair.style)
    ? Math.min(RESTING_SPREAD_PX, crosshair.dynamicSpreadLimit)
    : 0;

  return Math.max(
    thickness / 2,
    effectiveGap(crosshair.gap) + restSpread + thickness / 2
  );
}

/**
 * Four arcs centered on the diagonals; `splitSizeRatio` scales each arc
 * from a full quarter (1) down to a point (0).
 */
function quadrantArcs(radius: number, ratio: number): PixelArc[] {
  const halfSpan = (QUARTER_TURN * Math.max(0, Math.min(1, ratio))) / 2;
  const arcs: PixelArc[] = [];

  for (let quadrant = 0; quadrant < 4; quadrant++) {
    const middle = DIAGONAL + quadrant * QUARTER_TURN;
    arcs.push({ radius, start: middle - halfSpan, end: middle + halfSpan });
  }

  return arcs;
}

export function buildCrosshairShapes(
  crosshair: CrosshairSettings,
  canvasSize: number
): CrosshairShapes {
  const thickness = Math.max(1, Math.round(crosshair.thickness));
  const center = crosshairCenter(canvasSize, thickness);
  const gap = effectiveGap(Math.round(crosshair.gap));
  const length = Math.round(crosshair.length);
  const half = thickness / 2;

  const shapes: CrosshairShapes = { arcs: [], dot: null, rects: [], thickness };

  if (CROSS_STYLES.has(crosshair.style)) {
    shapes.rects = crossRects(
      center,
      thickness,
      gap,
      length,
      crosshair.tStyleEnabled
    );
  } else if (crosshair.style === SQUARE_STYLE) {
    shapes.rects = squareRects(center, thickness, Math.max(0, gap));
  } else if (CIRCLE_STYLES.has(crosshair.style)) {
    shapes.arcs = [
      { radius: ringRadius(crosshair, thickness), start: 0, end: Math.PI * 2 },
    ];
  } else if (QUADRANT_STYLES.has(crosshair.style)) {
    const ratio = crosshair.style === 7 ? 1 : crosshair.splitSizeRatio;
    shapes.arcs = quadrantArcs(ringRadius(crosshair, thickness), ratio);
  }

  const dotOnly = crosshair.style === 6;
  if (dotOnly || crosshair.centerDotEnabled) {
    shapes.dot = {
      x: center - half,
      y: center - half,
      width: thickness,
      height: thickness,
    };
  }

  return shapes;
}
