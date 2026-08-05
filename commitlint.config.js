/**
 * Conventional Commits, narrowed to the vocabulary this repository actually uses.
 * See CONTRIBUTING.md for examples and the rationale behind each scope.
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'content', // lessons, questions, flashcards, glossary entries
        'docs',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'style',
        'revert',
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        // features
        'quiz',
        'exam',
        'flashcards',
        'glossary',
        'dashboard',
        'path',
        'lesson',
        'settings',
        // engines
        'gamification',
        'srs',
        'scoring',
        // plumbing
        'content-model',
        'i18n',
        'ui',
        'store',
        'a11y',
        // content, one scope per exam domain
        'domain-1',
        'domain-2',
        'domain-3',
        'domain-4',
        'domain-5',
        'acronyms',
        // meta
        'ci',
        'deps',
        'repo',
        'release',
      ],
    ],
    'scope-empty': [1, 'never'],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
  },
};
