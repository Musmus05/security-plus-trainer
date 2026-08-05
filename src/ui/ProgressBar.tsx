import { cn } from './cn';
import { toPercent } from './fraction';

export interface ProgressBarProps {
  /** Completed fraction, 0–1. Values outside the range are clamped rather than trusted. */
  value: number;
  /** Accessible name. Required: a bare bar tells a screen reader nothing. */
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

const HEIGHT = { sm: 'h-2', md: 'h-3.5' } as const;

/**
 * Progress is magnitude, so it uses the single sequential hue rather than a domain accent.
 * The fill keeps a rounded data-end anchored to the track's left edge.
 */
export function ProgressBar({ value, label, size = 'md', className }: ProgressBarProps) {
  const percent = toPercent(value);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('bg-track w-full overflow-hidden rounded-full', HEIGHT[size], className)}
    >
      <div
        className="bg-seq-450 h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${String(percent)}%` }}
      />
    </div>
  );
}
