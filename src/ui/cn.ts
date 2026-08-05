import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Compose class names, letting later Tailwind utilities beat earlier ones.
 *
 * Without the merge step a component's default `px-4` and a caller's `px-6` both land in the
 * class list and the winner depends on stylesheet order rather than on intent.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
