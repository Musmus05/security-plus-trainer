import { type HTMLAttributes } from 'react';

import { cn } from './cn';

export type BadgeTone = 'neutral' | 'good' | 'warning' | 'critical' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/**
 * A status colour never carries meaning on its own, so a Badge always renders text. Callers that
 * want an icon pass it as a child alongside the label — never instead of it.
 *
 * Background and text both come from explicit tokens rather than an alpha wash. An alpha
 * background composites against whatever is behind it, which makes the real contrast unknowable
 * at authoring time — and it was exactly that gap that let a 4.02:1 badge ship past a token test
 * measuring against the plain surface. `tokens.test.ts` now pairs each wash with its text tone.
 */
const TONE: Record<BadgeTone, string> = {
  neutral: 'bg-sunken text-ink-secondary',
  good: 'bg-good-wash text-good-text',
  warning: 'bg-warning-wash text-warning-text',
  critical: 'bg-critical-wash text-critical-text',
  info: 'bg-info-wash text-info-text',
};

export function Badge({ tone = 'neutral', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        TONE[tone],
        className,
      )}
      {...props}
    />
  );
}
