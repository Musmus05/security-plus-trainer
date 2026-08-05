import { cn } from './cn';

export interface StatTileProps {
  label: string;
  /** The headline. Kept as a node so callers can pass a formatted number plus a unit. */
  value: React.ReactNode;
  icon?: React.ReactNode;
  /** Extra context under the value — "+120 today", "3 due". */
  detail?: string;
  className?: string;
}

/**
 * A single number is not a chart, and dressing it up as one hides it. The value is the hero;
 * the label sits above it, the detail below, and the icon is decoration the label repeats.
 */
export function StatTile({ label, value, icon, detail, className }: StatTileProps) {
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <span className="text-ink-secondary flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
        {icon}
        {label}
      </span>
      <span className="text-ink text-2xl leading-tight font-extrabold">{value}</span>
      {detail !== undefined && <span className="text-ink-secondary text-xs">{detail}</span>}
    </div>
  );
}
