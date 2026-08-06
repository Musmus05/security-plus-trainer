/**
 * Geometry for the learning-path trail.
 *
 * Pure arithmetic, kept out of the component so the shape can be unit-tested. The previous version
 * drew a straight vertical rule behind nodes that were offset sideways, which connected nothing —
 * the nodes floated away from the line. Here the connector is computed *from* the node positions, so
 * it cannot disagree with them.
 */

export const NODE_SIZE = 68;
export const NODE_RADIUS = NODE_SIZE / 2;
/** Vertical distance between node centres. */
export const NODE_SPACING = 124;
/** How far a node swings from the centre line at the widest point. */
export const AMPLITUDE = 62;

export interface TrailPoint {
  x: number;
  y: number;
}

/**
 * Horizontal offset for the nth node.
 *
 * A sine with a six-node period: 0 → right → right → 0 → left → left. That reads as a road winding
 * downhill. A strict alternate-left-right zig-zag looks mechanical, and a period that divides the
 * domain sizes evenly (4, 5, 4, 9, 6) would make every domain look identical.
 */
export function offsetAt(index: number): number {
  const offset = Math.round(AMPLITUDE * Math.sin((index * Math.PI) / 3));

  /*
   * Normalise negative zero. `sin(2π)` is −2.4e−16 rather than 0, so `Math.round` returns `-0` at
   * the end of every period. It compares equal with `===` but not with `Object.is`, so the value is
   * simultaneously "the same as the first node" and "not the same", and it would also serialise as
   * `-0` into SVG coordinate strings.
   */
  return offset === 0 ? 0 : offset;
}

export function trailPoints(count: number, centreX: number): TrailPoint[] {
  return Array.from({ length: count }, (_, index) => ({
    x: centreX + offsetAt(index),
    y: NODE_RADIUS + index * NODE_SPACING,
  }));
}

export function trailHeight(count: number): number {
  return count === 0 ? 0 : (count - 1) * NODE_SPACING + NODE_SIZE;
}

/**
 * An SVG path through the given points, as cubic segments with vertical control handles.
 *
 * Vertical handles are what make the curve leave and enter each node straight down, so the line
 * looks like it passes *through* the node rather than clipping past it.
 */
export function trailPath(points: readonly TrailPoint[]): string {
  const first = points[0];
  if (first === undefined) {
    return '';
  }

  let d = `M ${String(first.x)} ${String(first.y)}`;

  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    if (from === undefined || to === undefined) {
      continue;
    }
    const midpoint = (to.y - from.y) / 2;
    d +=
      ` C ${String(from.x)} ${String(from.y + midpoint)},` +
      ` ${String(to.x)} ${String(to.y - midpoint)},` +
      ` ${String(to.x)} ${String(to.y)}`;
  }

  return d;
}

/**
 * Which side of the trail a node's label should sit on.
 *
 * Opposite the swing, so the label never overlaps the curve. A node pushed right gets its label on
 * the left, and vice versa.
 */
export function labelSide(index: number): 'left' | 'right' {
  return offsetAt(index) > 0 ? 'left' : 'right';
}
