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
export const AMPLITUDE = 84;

export interface TrailPoint {
  x: number;
  y: number;
}

/**
 * Horizontal offset for the nth node.
 *
 * A sine with a **four-node** period: centre → right → centre → left, repeating. Each domain
 * therefore shows whole, balanced swings whatever its length.
 *
 * The previous version used a six-node period, chosen so the domains would not all look alike. Two
 * things were wrong with it. Sampling a six-node sine puts nodes 1 and 2 at the same x, and 4 and 5
 * likewise, so the trail rendered as a staircase rather than a curve. Worse, three of the five
 * domains have four or five objectives, and a six-node period never completes inside them: domain 1
 * drew 0, +A, +A, 0 — drifting right and returning, never once swinging left. The wave was only ever
 * visible in domain 4.
 *
 * Distinguishing the domains is the accent colour's job (ADR-0006), not the geometry's. A rhythm
 * that closes inside every domain is worth more than a rhythm that varies between them.
 */
export function offsetAt(index: number): number {
  const offset = Math.round(AMPLITUDE * Math.sin((index * Math.PI) / 2));

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
 *
 * With a four-node period every other node sits dead centre, where there is no swing to be opposite
 * of. Sending all of those to one side would pile three labels out of four on the left. They
 * alternate instead, which follows the wave: the centred node between a right swing and a left one
 * takes the side the trail is heading away from.
 */
export function labelSide(index: number): 'left' | 'right' {
  const offset = offsetAt(index);
  if (offset > 0) {
    return 'left';
  }
  if (offset < 0) {
    return 'right';
  }
  return index % 4 === 0 ? 'right' : 'left';
}
