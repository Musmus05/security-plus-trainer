import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT: Record<ButtonVariant, string> = {
  // The 4px inset bottom edge is the one piece of skeuomorphism the gamified direction earns:
  // it makes the primary action feel pressable, and it collapses on :active.
  //
  // Hover *darkens*. Brightening would lift the fill and push the white label below the 4.5:1
  // contrast floor, so the obvious `brightness-110` is the wrong direction here.
  primary:
    'bg-action text-white shadow-[inset_0_-4px_0_0_rgb(0_0_0/0.22)] hover:brightness-90 active:translate-y-[2px] active:shadow-[inset_0_-2px_0_0_rgb(0_0_0/0.22)]',
  secondary:
    'bg-surface text-ink border-edge-strong border-2 shadow-[inset_0_-4px_0_0_var(--sp-border)] hover:bg-sunken active:translate-y-[2px] active:shadow-[inset_0_-2px_0_0_var(--sp-border)]',
  ghost: 'text-ink-secondary hover:bg-sunken hover:text-ink',
  danger:
    'bg-action-danger text-white shadow-[inset_0_-4px_0_0_rgb(0_0_0/0.22)] hover:brightness-90 active:translate-y-[2px] active:shadow-[inset_0_-2px_0_0_rgb(0_0_0/0.22)]',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 px-3 text-sm',
  md: 'h-11 gap-2 px-5 text-[0.9375rem]',
  lg: 'h-14 gap-2.5 px-7 text-base',
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
}

/**
 * The button class recipe, shared by `Button` (a real `<button>`) and `ButtonLink` (an anchor).
 *
 * Kept separate from both so a navigation action can look like a button without being one — a
 * `<Link>` nested inside a `<button>` is invalid HTML and breaks keyboard and middle-click
 * behaviour, and styling the anchor directly is the fix rather than a workaround.
 */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  block = false,
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    'inline-flex items-center justify-center rounded-2xl font-bold tracking-wide select-none',
    'transition-[filter,transform,background-color] duration-100',
    'focus-visible:outline-action focus-visible:outline-2 focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-45',
    SIZE[size],
    VARIANT[variant],
    block && 'w-full',
    className,
  );
}
