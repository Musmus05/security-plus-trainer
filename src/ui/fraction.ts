/**
 * Clamp an arbitrary number into the 0–1 range used by every progress mark.
 *
 * Lives in its own module rather than beside `ProgressBar` so that file exports only components —
 * a module mixing components and helpers breaks React Fast Refresh, and the lint rule that
 * catches it is worth obeying rather than silencing.
 */
export function clampFraction(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.min(1, Math.max(0, value));
}

/** Convert a fraction to a whole percentage, for display and for ARIA. */
export function toPercent(value: number): number {
  return Math.round(clampFraction(value) * 100);
}
