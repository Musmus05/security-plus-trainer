/**
 * Facts about the target exam, transcribed from the official document:
 *
 *   CompTIA Security+ SY0-701 Certification Exam Objectives, Version 5.0 (© 2023 CompTIA, Inc.)
 *
 * The full domain/objective tree lands with the content model in a later pull request; this
 * module holds only the figures the shell needs, so that no component ever hard-codes them.
 */
export const EXAM_META = {
  code: 'SY0-701',
  objectivesDocumentVersion: '5.0',
  launchedOn: '2023-11-07',
  /** Maximum number of items delivered; CompTIA states "maximum of 90". */
  maxQuestions: 90,
  durationMinutes: 90,
  passingScore: 750,
  scoreScale: { min: 100, max: 900 },
  domainCount: 5,
  objectiveCount: 28,
  /**
   * The exam itself is not offered in French — English, Japanese, Portuguese, Spanish and Thai
   * only. French in this app is a comprehension aid, which is why every French term is shown
   * alongside its official English wording.
   */
  examLanguages: ['en', 'ja', 'pt', 'es', 'th'],
} as const;
