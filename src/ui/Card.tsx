import { type HTMLAttributes } from 'react';

import { cn } from './cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift the card off the page plane. Use for the one thing the screen is about. */
  raised?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const PADDING = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
} as const;

export function Card({ raised = false, padding = 'md', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'border-edge rounded-3xl border',
        raised ? 'bg-raised shadow-lg shadow-black/5' : 'bg-surface',
        PADDING[padding],
        className,
      )}
      {...props}
    />
  );
}
