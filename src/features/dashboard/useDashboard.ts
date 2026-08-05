import { useMemo } from 'react';

import { DOMAINS } from '@/content/exam/sy0-701/domains';
import type { DomainId } from '@/content/schemas';
import {
  crownsFor,
  domainMastery,
  isStreakAlive,
  levelProgress,
  type ObjectiveProgress,
  rankFor,
  xpOn,
} from '@/domain/gamification';
import { createSystemClock } from '@/lib/clock';
import { NO_RECORD, type ObjectiveRecord } from '@/lib/store/progress.schema';
import { useAppStore } from '@/lib/store/store';

/**
 * Compose the persisted record into what the mastery engine needs.
 *
 * Card counts are zero until the spaced-repetition scheduler lands. That is not a placeholder that
 * inflates anything: `crownsFor` treats an empty deck as *no* retention, so the top two crowns stay
 * unreachable rather than being handed out for a quiz.
 */
export function toObjectiveProgress(record: ObjectiveRecord = NO_RECORD): ObjectiveProgress {
  return {
    lessonRead: record.lessonRead,
    quizAttempts: record.quizAttempts,
    bestAccuracy: record.bestAccuracy,
    cardsTotal: 0,
    cardsMature: 0,
  };
}

export interface DomainSummary {
  id: DomainId;
  number: string;
  mastery: number;
  crowns: number;
  maxCrowns: number;
  weight: number;
}

export interface NextUp {
  objectiveId: string;
  reason: 'not-started' | 'lesson-unread' | 'no-quiz' | 'weak-accuracy';
}

export function useDashboard() {
  const gamification = useAppStore((state) => state.gamification);
  const progress = useAppStore((state) => state.progress);
  const dailyGoalXp = useAppStore((state) => state.settings.dailyGoalXp);

  // The clock is read once per render rather than stored: the day can change while the tab is open
  // overnight, and a cached day key would leave the streak and heatmap a day behind until reload.
  const today = useMemo(() => createSystemClock().localDayKey(), []);

  return useMemo(() => {
    const progressById = Object.fromEntries(
      Object.entries(progress).map(([id, record]) => [id, toObjectiveProgress(record)]),
    );

    const domains: DomainSummary[] = DOMAINS.map((domain) => {
      const ids = domain.objectives.map((objective) => objective.id);
      return {
        id: domain.id,
        number: domain.number,
        mastery: domainMastery(ids, progressById),
        crowns: ids.reduce((sum, id) => sum + crownsFor(toObjectiveProgress(progress[id])), 0),
        maxCrowns: ids.length * 5,
        weight: domain.weight,
      };
    });

    const xpToday = xpOn(gamification.ledger, today);

    return {
      today,
      dailyGoalXp,
      xpToday,
      goalMet: xpToday >= dailyGoalXp,
      goalFraction: dailyGoalXp === 0 ? 0 : Math.min(1, xpToday / dailyGoalXp),
      totalXp: gamification.totalXp,
      level: levelProgress(gamification.totalXp),
      rank: rankFor(levelProgress(gamification.totalXp).level),
      streak: gamification.streak,
      streakAlive: isStreakAlive(gamification.streak, today),
      ledger: gamification.ledger,
      domains,
      overallMastery:
        domains.reduce((sum, domain) => sum + domain.crowns, 0) /
        Math.max(
          1,
          domains.reduce((sum, domain) => sum + domain.maxCrowns, 0),
        ),
      nextUp: pickNextUp(progress),
    };
  }, [gamification, progress, dailyGoalXp, today]);
}

/**
 * What to study next.
 *
 * Ordered by what actually moves a learner forward, not by objective number: an objective never
 * opened beats one whose quiz needs improving, because the first crown is the cheapest progress
 * available. Weighted domains are visited first within each tier, so the 28% domain gets attention
 * before the 12% one.
 */
export function pickNextUp(
  progress: Readonly<Record<string, ObjectiveRecord | undefined>>,
): NextUp {
  const byWeight = [...DOMAINS].sort((a, b) => b.weight - a.weight);
  const objectives = byWeight.flatMap((domain) => domain.objectives.map((o) => o.id));

  const untouched = objectives.find((id) => progress[id] === undefined);
  if (untouched !== undefined) {
    return { objectiveId: untouched, reason: 'not-started' };
  }

  const unread = objectives.find((id) => progress[id]?.lessonRead === false);
  if (unread !== undefined) {
    return { objectiveId: unread, reason: 'lesson-unread' };
  }

  const noQuiz = objectives.find((id) => (progress[id]?.quizAttempts ?? 0) === 0);
  if (noQuiz !== undefined) {
    return { objectiveId: noQuiz, reason: 'no-quiz' };
  }

  // Everything has been attempted: send them to the weakest result.
  const weakest = objectives.reduce((worst, id) =>
    (progress[id]?.bestAccuracy ?? 0) < (progress[worst]?.bestAccuracy ?? 0) ? id : worst,
  );

  return { objectiveId: weakest, reason: 'weak-accuracy' };
}
