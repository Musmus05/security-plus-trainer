import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from './cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container width — the usual shape for a primary "continue" action. */
  block?: boolean;
}

const VARIANT: Record<ButtonVariant, string> = {
  // The 4px inset bottom edge is the one piece of skeuomorphism the gamified direction earns:
  // it makes the primary action feel pressable, and it collapses on :active.
  primary:
    'bg-action text-white shadow-[inset_0_-4px_0_0_rgb(0_0_0/0.22)] hover:brightness-90 active:translate-y-[2px] active:shadow-[inset_0_-2px_0_0_rgb(0_0_0/0.22)]',
  secondary:
    'bg-surface text-ink border-2 border-edge-strong shadow-[inset_0_-4px_0_0_var(--sp-border)] hover:bg-sunken active:translate-y-[2px] active:shadow-[inset_0_-2px_0_0_var(--sp-border)]',
  ghost: 'text-ink-secondary hover:bg-sunken hover:text-ink',
  danger:
    'bg-action-danger text-white shadow-[inset_0_-4px_0_0_rgb(0_0_0/0.22)] hover:brightness-90 active:translate-y-[2px] active:shadow-[inset_0_-2px_0_0_rgb(0_0_0/0.22)]',
};

const SIZE: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-[0.9375rem] gap-2',
  lg: 'h-14 px-7 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', block = false, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-2xl font-bold tracking-wide select-none',
        'transition-[filter,transform,background-color] duration-100',
        'focus-visible:outline-action focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:pointer-events-none disabled:opacity-45',
        SIZE[size],
        VARIANT[variant],
        block && 'w-full',
        className,
      )}
      {...props}
    />
  );
});
