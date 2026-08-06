import { AlertTriangle, BrainCircuit, Lightbulb, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/ui';

/**
 * The components a lesson author can use inside MDX.
 *
 * Supplied through an MDX provider rather than imported per file: 56 lesson files (28 objectives ×
 * two languages) should not each carry six import lines, and somebody writing prose should not have
 * to remember what to import.
 */

/**
 * A French technical term with its official English wording attached.
 *
 * This is the component ADR-0004 turns on. The exam is delivered only in English, so a learner
 * revising in French still has to recognise the English term on the day — this makes that automatic
 * rather than something an author has to remember to spell out every time.
 */
export function Term({ en, children }: { en: string; children: React.ReactNode }) {
  return (
    <span className="font-medium">
      {children}{' '}
      <span lang="en" className="text-info-text text-[0.9em] font-semibold whitespace-nowrap">
        ({en})
      </span>
    </span>
  );
}

interface CalloutProps {
  title?: string;
  children: React.ReactNode;
}

function Callout({
  icon,
  label,
  tone,
  title,
  children,
}: CalloutProps & { icon: React.ReactNode; label: string; tone: string }) {
  return (
    <aside className={cn('my-5 rounded-2xl border-l-4 p-4', tone)}>
      <p className="mb-1.5 flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
        {icon}
        {title ?? label}
      </p>
      <div className="text-ink text-[0.9375rem] leading-relaxed [&>p]:my-1.5">{children}</div>
    </aside>
  );
}

/** The specific confusion the exam relies on. Stated as the confusion, not as advice. */
export function ExamTrap({ title, children }: CalloutProps) {
  return (
    <Callout
      icon={<AlertTriangle aria-hidden className="size-3.5" />}
      label="Piège d’examen"
      tone="border-l-critical bg-critical-wash text-critical-text"
      {...(title === undefined ? {} : { title })}
    >
      {children}
    </Callout>
  );
}

/** Only where a genuinely useful one exists. A forced mnemonic is worse than none. */
export function Mnemonic({ title, children }: CalloutProps) {
  return (
    <Callout
      icon={<BrainCircuit aria-hidden className="size-3.5" />}
      label="Moyen mnémotechnique"
      tone="border-l-good bg-good-wash text-good-text"
      {...(title === undefined ? {} : { title })}
    >
      {children}
    </Callout>
  );
}

/** The one sentence to carry into the exam room. */
export function KeyPoint({ title, children }: CalloutProps) {
  return (
    <Callout
      icon={<Target aria-hidden className="size-3.5" />}
      label="À retenir"
      tone="border-l-action bg-info-wash text-info-text"
      {...(title === undefined ? {} : { title })}
    >
      {children}
    </Callout>
  );
}

/**
 * A horizontally scrollable wrapper for a lesson table.
 *
 * `role="region"` plus a name plus `tabIndex` is the accessible form of a scroll container. A bare
 * focusable `<div>` satisfies axe's `scrollable-region-focusable` but trips jsx-a11y, and rightly:
 * a focus stop with no role and no name is announced as nothing at all. The region role is what
 * makes the focus stop mean something.
 *
 * This only became a problem in CI. On a wide desktop viewport the tables do not overflow, so there
 * is no scroll region to fail — it took the mobile viewport to surface it.
 */
export function ScrollableTable({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <div
      role="region"
      aria-label={t('lesson.tableLabel')}
      tabIndex={0}
      className="border-edge focus-visible:outline-action my-5 overflow-x-auto rounded-2xl border focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      {children}
    </div>
  );
}

/** A worked example or a real-world anchor. */
export function InPractice({ title, children }: CalloutProps) {
  return (
    <Callout
      icon={<Lightbulb aria-hidden className="size-3.5" />}
      label="En pratique"
      tone="border-l-edge-strong bg-sunken text-ink-secondary"
      {...(title === undefined ? {} : { title })}
    >
      {children}
    </Callout>
  );
}
