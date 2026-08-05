import { cn } from './cn';
import { clampFraction, toPercent } from './fraction';

export interface ProgressRingProps {
  /** Completed fraction, 0–1. */
  value: number;
  /** Accessible name, e.g. "Domain 4 mastery". */
  label: string;
  /** Diameter in pixels. */
  size?: number;
  /** Rendered inside the ring — a percentage, a crown count, a domain number. */
  children?: React.ReactNode;
  className?: string;
}

const STROKE = 8;

/**
 * A ring is a stat tile with a plot: the number inside is the headline, the arc is the context.
 * The arc is the sequential hue because it encodes magnitude; the label inside carries identity,
 * which is why a domain ring never depends on its accent colour to be readable.
 */
export function ProgressRing({ value, label, size = 88, children, className }: ProgressRingProps) {
  const fraction = clampFraction(value);
  const percent = toPercent(value);
  const radius = (size - STROKE) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  return (
    <div
      className={cn('relative inline-grid place-items-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${String(size)} ${String(size)}`}
        role="progressbar"
        aria-label={label}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="-rotate-90"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--sp-track)"
          strokeWidth={STROKE}
        />
        {fraction > 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--sp-seq-450)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - fraction)}
            className="transition-[stroke-dashoffset] duration-700 ease-out"
          />
        )}
      </svg>
      <span className="absolute inset-0 grid place-items-center">{children}</span>
    </div>
  );
}
