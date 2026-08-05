import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container width — the usual shape for a primary "continue" action. */
  block?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', block = false, className, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses({
        variant,
        size,
        block,
        ...(className === undefined ? {} : { className }),
      })}
      {...props}
    />
  );
});
