import { describe, expect, it } from 'vitest';

import {
  addToLedger,
  award,
  type DailyLedger,
  examXp,
  pruneLedger,
  quizXp,
  totalOf,
  XP,
  xpOn,
} from './xp';

describe('award', () => {
  it('returns the tabled amount', () => {
    expect(award('lessonRead')).toEqual({ reason: 'lessonRead', amount: XP.lessonRead });
  });

  it('multiplies for repeated awards', () => {
    expect(award('quizCorrect', 7).amount).toBe(XP.quizCorrect * 7);
  });

  it('returns zero for zero times, rather than the base amount', () => {
    expect(award('quizCorrect', 0).amount).toBe(0);
  });

  it('rejects a nonsensical multiplier instead of producing nonsense XP', () => {
    expect(() => award('quizCorrect', -1)).toThrow(/non-negative integer/);
    expect(() => award('quizCorrect', 1.5)).toThrow(/non-negative integer/);
  });
});

describe('quizXp', () => {
  it('pays per correct answer plus a completion bonus', () => {
    const awards = quizXp(7, 10);

    expect(totalOf(awards)).toBe(XP.quizCorrect * 7 + XP.quizCompleted);
  });

  it('pays the completion bonus even for a score of zero', () => {
    // Finishing is the behaviour worth paying for. A learner who gets everything wrong and stays
    // to read the explanations has done the useful thing.
    expect(totalOf(quizXp(0, 10))).toBe(XP.quizCompleted);
  });

  it('adds a perfect bonus only for a clean sweep', () => {
    expect(totalOf(quizXp(10, 10))).toBe(XP.quizCorrect * 10 + XP.quizCompleted + XP.quizPerfect);
    expect(totalOf(quizXp(9, 10))).toBe(XP.quizCorrect * 9 + XP.quizCompleted);
  });

  it('pays nothing for a quiz with no questions', () => {
    expect(quizXp(0, 0)).toEqual([]);
  });
});

describe('examXp', () => {
  it('pays for completion', () => {
    expect(totalOf(examXp(false))).toBe(XP.examCompleted);
  });

  it('pays a bonus for passing', () => {
    expect(totalOf(examXp(true))).toBe(XP.examCompleted + XP.examPassed);
  });
});

describe('the ledger', () => {
  it('starts empty and reports zero for an unseen day', () => {
    expect(xpOn({}, '2026-08-05')).toBe(0);
  });

  it('accumulates within a day', () => {
    let ledger: DailyLedger = {};
    ledger = addToLedger(ledger, '2026-08-05', 20);
    ledger = addToLedger(ledger, '2026-08-05', 35);

    expect(xpOn(ledger, '2026-08-05')).toBe(55);
  });

  it('keeps days separate', () => {
    let ledger: DailyLedger = {};
    ledger = addToLedger(ledger, '2026-08-05', 20);
    ledger = addToLedger(ledger, '2026-08-06', 30);

    expect(xpOn(ledger, '2026-08-05')).toBe(20);
    expect(xpOn(ledger, '2026-08-06')).toBe(30);
  });

  it('returns the same object for a zero award, so nothing re-renders', () => {
    const ledger: DailyLedger = { '2026-08-05': 20 };

    expect(addToLedger(ledger, '2026-08-05', 0)).toBe(ledger);
  });

  it('never mutates the ledger it is given', () => {
    const ledger: DailyLedger = { '2026-08-05': 20 };
    addToLedger(ledger, '2026-08-05', 10);

    expect(ledger).toEqual({ '2026-08-05': 20 });
  });
});

describe('pruneLedger', () => {
  it('keeps recent days', () => {
    const ledger: DailyLedger = { '2026-08-01': 10, '2026-08-05': 20 };

    expect(pruneLedger(ledger, '2026-08-05', 400)).toEqual(ledger);
  });

  it('drops days beyond the window', () => {
    // localStorage is a few megabytes shared with everything else on the origin. An unbounded
    // ledger is a slow leak that eventually costs the learner their entire save.
    const ledger: DailyLedger = { '2020-01-01': 10, '2026-08-05': 20 };

    expect(pruneLedger(ledger, '2026-08-05', 400)).toEqual({ '2026-08-05': 20 });
  });

  it('keeps the day exactly on the boundary', () => {
    const ledger: DailyLedger = { '2026-08-01': 10, '2026-07-31': 5 };

    // A 5-day window from 2026-08-05 reaches back to 2026-07-31 inclusive.
    expect(pruneLedger(ledger, '2026-08-05', 5)).toEqual({ '2026-08-01': 10, '2026-07-31': 5 });
    expect(pruneLedger(ledger, '2026-08-05', 4)).toEqual({ '2026-08-01': 10 });
  });

  it('handles an empty ledger', () => {
    expect(pruneLedger({}, '2026-08-05')).toEqual({});
  });
});

describe('the economy as a whole', () => {
  it('makes a repeatable action worth much less than a completed one', () => {
    // Otherwise the cheapest route to a streak is re-reading one page, and the streak stops
    // meaning anything.
    expect(XP.flashcardReviewed).toBeLessThan(XP.quizCompleted);
    expect(XP.quizCorrect).toBeLessThan(XP.quizCompleted);
    expect(XP.quizCompleted).toBeLessThan(XP.examCompleted);
  });

  it('makes a full mock exam the largest single award', () => {
    const repeatable = [XP.quizCorrect, XP.flashcardReviewed, XP.lessonRead];

    for (const amount of repeatable) {
      expect(amount).toBeLessThan(XP.examCompleted);
    }
  });
});
