import { describe, expect, it } from 'vitest';

import { createSeededRng } from '@/domain/rng';

import {
  advance,
  buildSession,
  currentItem,
  isComplete,
  isItemCorrect,
  isLastQuestion,
  type QuizQuestionLike,
  retryWrongOnly,
  revealCurrent,
  scoreSession,
  selectOption,
} from './session';

function question(
  id: string,
  options: string[],
  correctIds: string[],
  multi = false,
): QuizQuestionLike {
  return {
    id,
    objective: '1.1',
    options: options.map((optionId) => ({ id: optionId, correct: correctIds.includes(optionId) })),
    ...(multi ? { multiSelect: true } : {}),
  };
}

const BANK: QuizQuestionLike[] = [
  question('q-1-1-001', ['a', 'b', 'c', 'd'], ['a']),
  question('q-1-1-002', ['a', 'b', 'c', 'd'], ['b']),
  question('q-1-1-003', ['a', 'b', 'c', 'd'], ['c']),
  question('q-1-1-004', ['a', 'b', 'c', 'd'], ['d']),
  question('q-1-1-005', ['a', 'b', 'c', 'd'], ['a']),
];

const build = (count = 3, seed = 42) =>
  buildSession(BANK, { count, seed, rng: createSeededRng(seed) });

/** Drive a whole session, answering each question by a chooser. */
function play(
  session: ReturnType<typeof build>,
  choose: (item: NonNullable<ReturnType<typeof currentItem>>) => string[],
) {
  let current = session;
  for (const _ of session.items) {
    const item = currentItem(current);
    if (item === undefined) break;
    for (const optionId of choose(item)) {
      current = selectOption(current, optionId);
    }
    current = revealCurrent(current);
    current = advance(current);
  }
  return current;
}

describe('buildSession', () => {
  it('draws the requested number of questions', () => {
    expect(build(3).items).toHaveLength(3);
  });

  it('never repeats a question', () => {
    const ids = build(5).items.map((item) => item.question.id);

    expect(new Set(ids).size).toBe(5);
  });

  it('is reproducible from its seed', () => {
    const a = build(4, 99);
    const b = build(4, 99);

    expect(a.items.map((i) => i.question.id)).toEqual(b.items.map((i) => i.question.id));
    expect(a.items.map((i) => i.options.map((o) => o.id))).toEqual(
      b.items.map((i) => i.options.map((o) => o.id)),
    );
  });

  it('shuffles the option order', () => {
    /*
     * Authored banks tend to have the correct answer first while drafting, and a learner who spots
     * that stops reading the distractors — which is where most of the teaching is.
     */
    const positionsOfCorrect = new Set<number>();
    for (let seed = 0; seed < 40; seed += 1) {
      const session = buildSession([BANK[0]!], { count: 1, seed, rng: createSeededRng(seed) });
      positionsOfCorrect.add(session.items[0]!.options.findIndex((option) => option.correct));
    }

    expect(positionsOfCorrect.size).toBeGreaterThan(1);
  });

  it('keeps every option, so shuffling cannot drop the right answer', () => {
    for (const item of build(5).items) {
      expect(item.options).toHaveLength(4);
      expect(item.options.filter((option) => option.correct)).toHaveLength(1);
    }
  });

  it('returns a shorter session when the bank is smaller than the request', () => {
    // A short quiz beats a crash.
    expect(build(100).items).toHaveLength(BANK.length);
  });

  it('handles an empty bank', () => {
    const session = buildSession([], { count: 10, seed: 1, rng: createSeededRng(1) });

    expect(session.items).toEqual([]);
    expect(isComplete(session)).toBe(false);
    expect(scoreSession(session).accuracy).toBe(0);
  });

  it('starts unanswered and unrevealed', () => {
    for (const item of build().items) {
      expect(item.selected).toEqual([]);
      expect(item.revealed).toBe(false);
    }
  });
});

describe('selectOption', () => {
  it('replaces the selection on a single-answer question', () => {
    let session = build(1);
    session = selectOption(session, 'a');
    session = selectOption(session, 'b');

    expect(currentItem(session)?.selected).toEqual(['b']);
  });

  it('toggles on a multi-select question', () => {
    const multi = [question('q-1-1-009', ['a', 'b', 'c'], ['a', 'b'], true)];
    let session = buildSession(multi, { count: 1, seed: 1, rng: createSeededRng(1) });

    session = selectOption(session, 'a');
    session = selectOption(session, 'b');
    expect(currentItem(session)?.selected).toEqual(['a', 'b']);

    session = selectOption(session, 'a');
    expect(currentItem(session)?.selected).toEqual(['b']);
  });

  it('ignores an option that is not on the question', () => {
    let session = build(1);
    session = selectOption(session, 'zzz');

    expect(currentItem(session)?.selected).toEqual([]);
  });

  it('refuses to change the answer after the explanations are shown', () => {
    // Otherwise a learner can read why they were wrong, switch, and score themselves correct.
    let session = build(1);
    session = selectOption(session, 'a');
    session = revealCurrent(session);
    session = selectOption(session, 'b');

    expect(currentItem(session)?.selected).toEqual(['a']);
  });

  it('does not mutate the session it is given', () => {
    const session = build(2);
    const before = JSON.stringify(session);
    selectOption(session, 'a');

    expect(JSON.stringify(session)).toBe(before);
  });
});

describe('revealCurrent', () => {
  it('does nothing with nothing selected', () => {
    const session = revealCurrent(build(1));

    expect(currentItem(session)?.revealed).toBe(false);
  });

  it('reveals once an answer is selected', () => {
    let session = build(1);
    session = selectOption(session, 'a');
    session = revealCurrent(session);

    expect(currentItem(session)?.revealed).toBe(true);
  });
});

describe('advance', () => {
  it('moves to the next question', () => {
    expect(advance(build(3)).index).toBe(1);
  });

  it('stops at the last question rather than running off the end', () => {
    let session = build(2);
    session = advance(session);
    session = advance(session);
    session = advance(session);

    expect(session.index).toBe(1);
    expect(isLastQuestion(session)).toBe(true);
  });
});

describe('isItemCorrect', () => {
  it('is false before the answer is revealed', () => {
    let session = build(1);
    session = selectOption(session, currentItem(session)!.options.find((o) => o.correct)!.id);

    expect(isItemCorrect(currentItem(session)!)).toBe(false);
  });

  it('is true for the right single answer', () => {
    let session = build(1);
    session = selectOption(session, currentItem(session)!.options.find((o) => o.correct)!.id);
    session = revealCurrent(session);

    expect(isItemCorrect(currentItem(session)!)).toBe(true);
  });

  it('requires the exact set on a multi-select question', () => {
    /*
     * Set equality, not "contains a correct option". Picking one right answer plus a wrong one is
     * not correct, and neither is picking a subset of the right ones — both are common ways a
     * lenient implementation inflates a score.
     */
    const multi = [question('q-1-1-009', ['a', 'b', 'c'], ['a', 'b'], true)];
    const start = () => buildSession(multi, { count: 1, seed: 1, rng: createSeededRng(1) });

    const exact = revealCurrent(selectOption(selectOption(start(), 'a'), 'b'));
    expect(isItemCorrect(currentItem(exact)!)).toBe(true);

    const subset = revealCurrent(selectOption(start(), 'a'));
    expect(isItemCorrect(currentItem(subset)!)).toBe(false);

    const superset = revealCurrent(
      selectOption(selectOption(selectOption(start(), 'a'), 'b'), 'c'),
    );
    expect(isItemCorrect(currentItem(superset)!)).toBe(false);

    const mixed = revealCurrent(selectOption(selectOption(start(), 'a'), 'c'));
    expect(isItemCorrect(currentItem(mixed)!)).toBe(false);
  });
});

describe('scoreSession', () => {
  it('scores a perfect run', () => {
    const played = play(build(5), (item) => [item.options.find((o) => o.correct)!.id]);
    const result = scoreSession(played);

    expect(result).toEqual({
      correct: 5,
      total: 5,
      accuracy: 1,
      wrongQuestionIds: [],
    });
  });

  it('scores a failed run and names the misses', () => {
    const played = play(build(5), (item) => [item.options.find((o) => !o.correct)!.id]);
    const result = scoreSession(played);

    expect(result.correct).toBe(0);
    expect(result.accuracy).toBe(0);
    expect(result.wrongQuestionIds).toHaveLength(5);
  });

  it('counts an unanswered question as wrong rather than skipping it', () => {
    // Bailing out of a quiz should not flatter the score. The denominator is what was asked.
    const session = build(4);
    const result = scoreSession(session);

    expect(result.total).toBe(4);
    expect(result.correct).toBe(0);
    expect(result.wrongQuestionIds).toHaveLength(4);
  });

  it('reports zero accuracy for an empty quiz, not NaN', () => {
    const empty = buildSession([], { count: 5, seed: 1, rng: createSeededRng(1) });

    expect(scoreSession(empty).accuracy).toBe(0);
  });
});

describe('retryWrongOnly', () => {
  it('returns null after a perfect run', () => {
    const played = play(build(5), (item) => [item.options.find((o) => o.correct)!.id]);

    expect(retryWrongOnly(played, 1, createSeededRng(1))).toBeNull();
  });

  it('contains only the missed questions', () => {
    // Answer the first question right and the rest wrong.
    let session = build(3);
    let first = true;
    for (let i = 0; i < 3; i += 1) {
      const item = currentItem(session)!;
      const pick = first
        ? item.options.find((o) => o.correct)!.id
        : item.options.find((o) => !o.correct)!.id;
      first = false;
      session = advance(revealCurrent(selectOption(session, pick)));
    }

    const retry = retryWrongOnly(session, 7, createSeededRng(7));

    expect(retry?.items).toHaveLength(2);
    expect(retry?.items.every((item) => item.revealed)).toBe(false);
    expect(retry?.items.every((item) => item.selected.length === 0)).toBe(true);
  });
});

describe('isComplete', () => {
  it('is false for a fresh session', () => {
    expect(isComplete(build(3))).toBe(false);
  });

  it('is true once every question is revealed', () => {
    const played = play(build(3), (item) => [item.options[0]!.id]);

    expect(isComplete(played)).toBe(true);
  });
});
