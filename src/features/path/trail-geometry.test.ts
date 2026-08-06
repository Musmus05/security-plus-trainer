import { describe, expect, it } from 'vitest';

import {
  AMPLITUDE,
  labelSide,
  NODE_SPACING,
  offsetAt,
  trailHeight,
  trailPath,
  trailPoints,
} from './trail-geometry';

describe('offsetAt', () => {
  it('starts on the centre line', () => {
    expect(offsetAt(0)).toBe(0);
  });

  it('swings both ways rather than only one', () => {
    const offsets = Array.from({ length: 12 }, (_, index) => offsetAt(index));

    expect(offsets.some((value) => value > 0)).toBe(true);
    expect(offsets.some((value) => value < 0)).toBe(true);
  });

  it('never exceeds the amplitude', () => {
    for (let index = 0; index < 60; index += 1) {
      expect(Math.abs(offsetAt(index))).toBeLessThanOrEqual(AMPLITUDE);
    }
  });

  it('repeats on a six-node period', () => {
    // A period that does not divide the domain sizes (4, 5, 4, 9, 6) evenly is deliberate: with a
    // divisor every domain would draw the identical shape.
    for (let index = 0; index < 20; index += 1) {
      expect(offsetAt(index + 6)).toBe(offsetAt(index));
    }
  });

  it('does not alternate strictly left-right', () => {
    // A strict zig-zag looks mechanical. Consecutive nodes should sometimes sit on the same side.
    const offsets = Array.from({ length: 6 }, (_, index) => offsetAt(index));
    const sameSidePairs = offsets
      .slice(1)
      .filter((value, index) => value !== 0 && Math.sign(value) === Math.sign(offsets[index] ?? 0));

    expect(sameSidePairs.length).toBeGreaterThan(0);
  });
});

describe('trailPoints', () => {
  it('spaces nodes evenly down the trail', () => {
    const points = trailPoints(5, 160);

    for (let index = 1; index < points.length; index += 1) {
      expect((points[index]?.y ?? 0) - (points[index - 1]?.y ?? 0)).toBe(NODE_SPACING);
    }
  });

  it('centres the first node horizontally', () => {
    expect(trailPoints(3, 160)[0]?.x).toBe(160);
  });

  it('returns nothing for an empty domain', () => {
    expect(trailPoints(0, 160)).toEqual([]);
  });
});

describe('trailHeight', () => {
  it('is zero with no nodes', () => {
    expect(trailHeight(0)).toBe(0);
  });

  it('leaves room for the full node at each end', () => {
    // Height must cover the node's diameter, not just the distance between centres — otherwise the
    // first and last nodes are clipped.
    const points = trailPoints(4, 160);
    const lastCentre = points[points.length - 1]?.y ?? 0;

    expect(trailHeight(4)).toBeGreaterThan(lastCentre);
  });
});

describe('trailPath', () => {
  it('is empty with no points', () => {
    expect(trailPath([])).toBe('');
  });

  it('starts at the first point', () => {
    const points = trailPoints(3, 160);

    expect(trailPath(points).startsWith(`M ${String(points[0]?.x)} ${String(points[0]?.y)}`)).toBe(
      true,
    );
  });

  it('draws one curve segment per gap between nodes', () => {
    const path = trailPath(trailPoints(5, 160));

    expect((path.match(/C/g) ?? []).length).toBe(4);
  });

  it('ends exactly on the last node centre', () => {
    // The whole point of computing the connector from the node positions: it cannot drift away from
    // them the way a separately drawn straight rule did.
    const points = trailPoints(6, 160);
    const last = points[points.length - 1];

    expect(trailPath(points).endsWith(`${String(last?.x)} ${String(last?.y)}`)).toBe(true);
  });

  it('passes through every node centre', () => {
    const points = trailPoints(4, 160);
    const path = trailPath(points);

    for (const point of points) {
      expect(path).toContain(`${String(point.x)} ${String(point.y)}`);
    }
  });
});

describe('labelSide', () => {
  it('puts the label opposite the swing, so it never crosses the curve', () => {
    for (let index = 0; index < 12; index += 1) {
      const offset = offsetAt(index);
      if (offset > 0) {
        expect(labelSide(index)).toBe('left');
      } else {
        expect(labelSide(index)).toBe('right');
      }
    }
  });
});
