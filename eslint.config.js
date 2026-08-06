import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'playwright-report/**',
      'test-results/**',
      '.vercel/**',
      '!.husky/**',
    ],
  },

  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parserOptions: {
        projectService: {
          // Root-level JS config files belong to no tsconfig; let the service infer them.
          allowDefaultProject: ['eslint.config.js', 'commitlint.config.js'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Plain JS files get no type-aware rules — there is no type information to reason about.
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },

  /* ---------------------------------------------------------------- app source */
  {
    files: ['src/**/*.{ts,tsx}'],
    // `configs.flat.*` are the flat-config variants; `configs['recommended-latest']` at the top
    // level is still the legacy eslintrc shape and is rejected by flat config.
    extends: [reactHooks.configs.flat['recommended-latest'], jsxA11y.flatConfigs.strict],
    plugins: { 'react-refresh': reactRefresh },
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /*
       * axe and jsx-a11y genuinely disagree about scrollable regions.
       *
       * axe reports `scrollable-region-focusable` when a horizontally scrolling container cannot be
       * focused — a keyboard user can see there is more table but has no way to reach it. The fix is
       * `tabIndex={0}`, which this rule then rejects because a div is not interactive.
       *
       * A named `role="region"` is the WAI-ARIA answer, and the rule supports allowing exactly that
       * rather than being switched off. Widening the allow-list by one role is the honest
       * resolution; a blanket disable would lose every other case the rule catches.
       */
      'jsx-a11y/no-noninteractive-tabindex': [
        'error',
        { tags: [], roles: ['tabpanel', 'region'], allowExpressionValues: true },
      ],

      // Explicit boundaries beat implicit ones in a codebase this content-heavy.
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',

      'no-console': ['error', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      curly: ['error', 'multi-line'],
      'object-shorthand': ['error', 'always'],
      'prefer-const': 'error',

      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportDeclaration[source.value=/^\\.\\.\\/\\.\\.\\//]',
          message: 'Reach across features with the "@/" alias, not with ../../ chains.',
        },
      ],
    },
  },

  /* --------------------------------------- the pure core: no React, no ambient I/O */
  {
    files: ['src/domain/**/*.ts'],
    rules: {
      'no-restricted-globals': [
        'error',
        { name: 'localStorage', message: 'src/domain must stay pure — persist through the store.' },
        {
          name: 'sessionStorage',
          message: 'src/domain must stay pure — persist through the store.',
        },
        { name: 'window', message: 'src/domain must stay pure — no browser globals.' },
        { name: 'document', message: 'src/domain must stay pure — no browser globals.' },
      ],
      'no-restricted-properties': [
        'error',
        {
          object: 'Date',
          property: 'now',
          message: 'Inject a Clock instead: pure reducers must be deterministic.',
        },
        {
          object: 'Math',
          property: 'random',
          message: 'Inject a seeded Rng instead: sampling must be reproducible in tests.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react-*', '@/ui/*', '@/features/*', '@/lib/*'],
              message: 'src/domain must not depend on the UI or persistence layers.',
            },
          ],
        },
      ],
    },
  },

  /* ------------------------------------------------------------------- test files */
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}', 'src/test/**/*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      'no-restricted-properties': 'off',
    },
  },

  /* -------------------------------------------------- node-side config and scripts */
  {
    files: ['*.config.ts', 'scripts/**/*.ts', 'e2e/**/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      'no-console': 'off',
    },
  },

  // Must stay last so stylistic rules lose to Prettier.
  prettier,
);
