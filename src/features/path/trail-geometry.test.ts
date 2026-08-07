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

  it('repeats on a four-node period', () => {
    for (let index = 0; index < 20; index += 1) {
      expect(offsetAt(index + 4)).toBe(offsetAt(index));
    }
  });

  it('swings both ways inside every real domain, however short', () => {
    /*
     * This is the regression the six-node period shipped. Three of the five domains have four or
     * five objectives, and a six-node wave never completed inside them — domain 1 drew 0, +A, +A, 0,
     * drifting right and coming back without ever going left. The wave was only visible in domain 4,
     * and the rest of the path looked like a mistake.
     *
     * The domain sizes are hard-coded rather than imported: if the outline ever changes, this test
     * should be re-examined deliberately rather than silently following it.
     */
    for (const size of [4, 5, 4, 9, 6]) {
      const offsets = Array.from({ length: size }, (_, index) => offsetAt(index));

      expect(
        offsets.some((value) => value > 0),
        `domain of ${String(size)} never swings right`,
      ).toBe(true);
      expect(
        offsets.some((value) => value < 0),
        `domain of ${String(size)} never swings left`,
      ).toBe(true);
    }
  });

  it('never puts two consecutive nodes at the same horizontal position', () => {
    // Sampling the old six-node sine gave nodes 1 and 2 the same x, and 4 and 5 likewise, so the
    // trail rendered as a staircase: two nodes level, then a diagonal, then two level again.
    for (let index = 1; index < 24; index += 1) {
      expect(
        offsetAt(index),
        `nodes ${String(index - 1)} and ${String(index)} share an x`,
      ).not.toBe(offsetAt(index - 1));
    }
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
      } else if (offset < 0) {
        expect(labelSide(index)).toBe('right');
      }
    }
  });

  it('does not pile the centred nodes onto one side', () => {
    /*
     * Half the nodes sit dead centre under a four-node period, where there is no swing to be
     * opposite of. Sending them all to one side would leave three labels out of every four on the
     * left, which looks like a bug even though each individual label is placed "correctly".
     */
    const sides = Array.from({ length: 12 }, (_, index) => labelSide(index));
    const left = sides.filter((side) => side === 'left').length;

    expect(left).toBe(sides.length - left);
  });
});
