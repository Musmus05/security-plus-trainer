import { describe, expect, it } from 'vitest';

import { createSeededRng } from '@/domain/rng';

import { type CardState, newCard } from './scheduler';
import {
  buildQueue,
  currentCardId,
  dueCount,
  grade,
  isFinished,
  reveal,
  startSession,
} from './session';

const TODAY = '2026-03-12';
const rng = () => createSeededRng(7);

const stateDue = (due: string): CardState => ({
  ease: 2.5,
  intervalDays: 5,
  due,
  reps: 3,
  lapses: 0,
});

describe('buildQueue', () => {
  it('puts due cards ahead of cards never seen', () => {
    /*
     * The ordering is the point. A learner with a backlog and a pile of new material must be caught
     * up on what they are about to forget first — otherwise the backlog grows every session and the
     * schedule stops meaning anything.
     */
    const queue = buildQueue(
      ['a', 'b', 'new-1', 'new-2'],
      { a: stateDue(TODAY), b: stateDue(TODAY) },
      TODAY,
      {
        limit: 10,
        rng: rng(),
      },
    );

    expect(queue).toHaveLength(4);
    expect(new Set(queue.slice(0, 2))).toEqual(new Set(['a', 'b']));
    expect(new Set(queue.slice(2))).toEqual(new Set(['new-1', 'new-2']));
  });

  it('leaves out cards that are not due yet', () => {
    const queue = buildQueue(
      ['soon', 'later'],
      { soon: stateDue(TODAY), later: stateDue('2026-04-01') },
      TODAY,
      {
        limit: 10,
        rng: rng(),
      },
    );

    expect(queue).toEqual(['soon']);
  });

  it('truncates to the limit, keeping due cards over new ones', () => {
    const states = { a: stateDue(TODAY), b: stateDue(TODAY) };
    const queue = buildQueue(['a', 'b', 'new-1'], states, TODAY, { limit: 2, rng: rng() });

    expect(queue).toHaveLength(2);
    expect(queue).not.toContain('new-1');
  });

  it('is deterministic for a seed and shuffles for different ones', () => {
    const ids = Array.from({ length: 12 }, (_, i) => `c${String(i)}`);

    expect(buildQueue(ids, {}, TODAY, { limit: 12, rng: createSeededRng(1) })).toEqual(
      buildQueue(ids, {}, TODAY, { limit: 12, rng: createSeededRng(1) }),
    );
    // Without the shuffle the queue follows deck order and a learner recalls "the one after
    // RADIUS" rather than the card.
    expect(buildQueue(ids, {}, TODAY, { limit: 12, rng: createSeededRng(1) })).not.toEqual(ids);
  });

  it('returns nothing for a zero or negative limit rather than the whole deck', () => {
    // `slice(0, -1)` would drop one card and return the rest, which is the opposite of the intent.
    expect(buildQueue(['a', 'b'], {}, TODAY, { limit: 0, rng: rng() })).toEqual([]);
    expect(buildQueue(['a', 'b'], {}, TODAY, { limit: -3, rng: rng() })).toEqual([]);
  });
});

describe('review session', () => {
  it('will not accept a grade before the answer is shown', () => {
    // The grade is a self-report about recall; a learner who has not seen the answer cannot give it.
    const session = startSession(['a', 'b']);

    expect(grade(session, true)).toBe(session);
    expect(currentCardId(grade(session, true))).toBe('a');
  });

  it('removes a card answered correctly and moves on', () => {
    const session = grade(reveal(startSession(['a', 'b'])), true);

    expect(currentCardId(session)).toBe('b');
    expect(session.completed).toEqual(['a']);
    expect(session.revealed).toBe(false);
  });

  it('sends a forgotten card to the back instead of dropping it', () => {
    const session = grade(reveal(startSession(['a', 'b', 'c'])), false);

    expect(currentCardId(session)).toBe('b');
    expect(session.queue).toEqual(['b', 'c', 'a']);
    expect(session.completed).toEqual([]);
    expect(session.lapses).toBe(1);
  });

  it('is not finished until every card has been recalled once', () => {
    let session = startSession(['a']);
    session = grade(reveal(session), false);
    expect(isFinished(session)).toBe(false);

    session = grade(reveal(session), true);
    expect(isFinished(session)).toBe(true);
    expect(session.completed).toEqual(['a']);
  });

  it('hides the answer again after each grade', () => {
    const session = grade(reveal(startSession(['a', 'b'])), true);

    expect(session.revealed).toBe(false);
  });

  it('does nothing on an empty queue', () => {
    const empty = startSession([]);

    expect(currentCardId(empty)).toBeUndefined();
    expect(reveal(empty)).toBe(empty);
    expect(grade(empty, true)).toBe(empty);
    expect(isFinished(empty)).toBe(true);
  });

  it('revealing twice is a no-op rather than a new object', () => {
    const revealed = reveal(startSession(['a']));

    expect(reveal(revealed)).toBe(revealed);
  });
});

describe('dueCount', () => {
  it('counts unseen cards as due, because they are', () => {
    expect(dueCount(['a', 'b', 'c'], { a: stateDue(TODAY) }, TODAY)).toBe(3);
  });

  it('excludes cards scheduled for later', () => {
    expect(dueCount(['a', 'b'], { a: stateDue('2026-04-01'), b: stateDue(TODAY) }, TODAY)).toBe(1);
  });

  it('counts a brand-new card as due on the day it is created', () => {
    expect(dueCount(['a'], { a: newCard(TODAY) }, TODAY)).toBe(1);
  });

  it('is zero for an empty deck', () => {
    expect(dueCount([], {}, TODAY)).toBe(0);
  });
});
