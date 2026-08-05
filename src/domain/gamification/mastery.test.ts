import { describe, expect, it } from 'vitest';

import {
  crownsFor,
  domainMastery,
  MAX_CROWNS,
  nextCrownHint,
  NO_PROGRESS,
  type ObjectiveProgress,
} from './mastery';

const progress = (overrides: Partial<ObjectiveProgress> = {}): ObjectiveProgress => ({
  ...NO_PROGRESS,
  ...overrides,
});

describe('crownsFor', () => {
  it('gives nothing for an untouched objective', () => {
    expect(crownsFor(NO_PROGRESS)).toBe(0);
  });

  it('gives one crown for reading the lesson', () => {
    expect(crownsFor(progress({ lessonRead: true }))).toBe(1);
  });

  it('does not award a crown for a quiz taken without reading the lesson', () => {
    // Crowns are cumulative rather than a maximum: skipping the lesson skips the first crown.
    expect(crownsFor(progress({ quizAttempts: 3, bestAccuracy: 1 }))).toBe(0);
  });

  it('climbs with quiz accuracy', () => {
    const base = { lessonRead: true, quizAttempts: 1 };

    expect(crownsFor(progress({ ...base, bestAccuracy: 0.4 }))).toBe(1);
    expect(crownsFor(progress({ ...base, bestAccuracy: 0.6 }))).toBe(2);
    expect(crownsFor(progress({ ...base, bestAccuracy: 0.79 }))).toBe(2);
    expect(crownsFor(progress({ ...base, bestAccuracy: 0.8 }))).toBe(3);
    expect(crownsFor(progress({ ...base, bestAccuracy: 0.94 }))).toBe(3);
  });

  it('caps at three crowns on quiz accuracy alone', () => {
    // The point of the design: a perfect quiz score, repeated until it sticks for ten minutes, is
    // not mastery. The top two crowns need retention.
    expect(crownsFor(progress({ lessonRead: true, quizAttempts: 9, bestAccuracy: 1 }))).toBe(3);
  });

  it('treats an objective with no flashcards as having no retention, not perfect retention', () => {
    // An empty deck must not read as "all cards mature" — that would hand out five crowns for a
    // quiz, which is exactly the shortcut the crown ladder exists to prevent.
    expect(
      crownsFor(
        progress({
          lessonRead: true,
          quizAttempts: 1,
          bestAccuracy: 1,
          cardsTotal: 0,
          cardsMature: 0,
        }),
      ),
    ).toBe(3);
  });

  it('gives four crowns for high accuracy plus most cards mature', () => {
    expect(
      crownsFor(
        progress({
          lessonRead: true,
          quizAttempts: 2,
          bestAccuracy: 0.9,
          cardsTotal: 20,
          cardsMature: 16,
        }),
      ),
    ).toBe(4);
  });

  it('gives five crowns only for near-perfect accuracy and every card mature', () => {
    const almost = progress({
      lessonRead: true,
      quizAttempts: 2,
      bestAccuracy: 0.95,
      cardsTotal: 20,
      cardsMature: 19,
    });
    expect(crownsFor(almost)).toBe(4);

    expect(crownsFor({ ...almost, cardsMature: 20 })).toBe(5);
  });

  it('never exceeds the maximum', () => {
    expect(
      crownsFor(
        progress({
          lessonRead: true,
          quizAttempts: 50,
          bestAccuracy: 1,
          cardsTotal: 20,
          cardsMature: 20,
        }),
      ),
    ).toBe(MAX_CROWNS);
  });
});

describe('nextCrownHint', () => {
  it('asks for the lesson first', () => {
    expect(nextCrownHint(NO_PROGRESS)).toEqual({ crowns: 0, need: 'read-lesson' });
  });

  it('asks for a quiz once the lesson is read', () => {
    expect(nextCrownHint(progress({ lessonRead: true }))).toEqual({
      crowns: 1,
      need: 'take-quiz',
    });
  });

  it('asks for better accuracy while accuracy is the binding constraint', () => {
    expect(
      nextCrownHint(progress({ lessonRead: true, quizAttempts: 1, bestAccuracy: 0.65 })),
    ).toEqual({ crowns: 2, need: 'improve-accuracy', target: 0.8 });
  });

  it('asks for card review once accuracy is already high enough', () => {
    expect(
      nextCrownHint(
        progress({
          lessonRead: true,
          quizAttempts: 1,
          bestAccuracy: 0.92,
          cardsTotal: 10,
          cardsMature: 2,
        }),
      ),
    ).toEqual({ crowns: 3, need: 'review-cards', target: 0.8 });
  });

  it('asks for nothing at five crowns', () => {
    expect(
      nextCrownHint(
        progress({
          lessonRead: true,
          quizAttempts: 1,
          bestAccuracy: 1,
          cardsTotal: 5,
          cardsMature: 5,
        }),
      ),
    ).toEqual({ crowns: 5, need: 'nothing' });
  });
});

describe('domainMastery', () => {
  const ids = ['4.1', '4.2', '4.3', '4.4'];

  it('is zero for a domain with no progress at all', () => {
    expect(domainMastery(ids, {})).toBe(0);
  });

  it('is one when every objective is fully mastered', () => {
    const full = progress({
      lessonRead: true,
      quizAttempts: 1,
      bestAccuracy: 1,
      cardsTotal: 4,
      cardsMature: 4,
    });

    expect(domainMastery(ids, Object.fromEntries(ids.map((id) => [id, full])))).toBe(1);
  });

  it('counts objectives with no record as zero rather than skipping them', () => {
    // The denominator is what the exam covers, not what the learner has opened. Skipping untouched
    // objectives would show 100% mastery after one lesson.
    const full = progress({
      lessonRead: true,
      quizAttempts: 1,
      bestAccuracy: 1,
      cardsTotal: 4,
      cardsMature: 4,
    });

    expect(domainMastery(ids, { '4.1': full })).toBe(0.25);
  });

  it('averages partial progress', () => {
    // Two objectives at one crown each, out of 4 × 5 possible.
    const read = progress({ lessonRead: true });

    expect(domainMastery(ids, { '4.1': read, '4.2': read })).toBe(2 / 20);
  });

  it('is zero for an empty domain rather than dividing by zero', () => {
    expect(domainMastery([], {})).toBe(0);
  });
});
