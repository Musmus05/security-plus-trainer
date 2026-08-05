import { EXAM_META } from '@/content/exam-meta';

/**
 * Placeholder shell. The routed application, design system and i18n layer land in the
 * `feat/design-system` pull request; this scaffold exists so the toolchain — build, tests,
 * e2e and the Vercel preview — is proven green before any feature work depends on it.
 */
export function App() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold tracking-tight">Security+ Trainer</h1>
      <p className="text-balance">
        Bilingual gamified preparation for the CompTIA Security+ {EXAM_META.code} exam —{' '}
        {String(EXAM_META.domainCount)} domains, {String(EXAM_META.objectiveCount)} objectives.
      </p>
      <p className="text-sm opacity-70">
        Toolchain scaffold. Features land in later pull requests.
      </p>
    </main>
  );
}
