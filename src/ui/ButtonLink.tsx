import { Link, type LinkProps } from 'react-router';

import { buttonClasses, type ButtonSize, type ButtonVariant } from './button-styles';

export interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
}

/**
 * A navigation action that looks like a button.
 *
 * Separate from `Button` because the element matters: an anchor supports middle-click, "open in new
 * tab" and the browser's own focus semantics, none of which a `<button>` with an onClick handler
 * gives you. Wrapping a `<Link>` in a `<Button>` would produce invalid nested-interactive markup.
 */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  block = false,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonClasses({
        variant,
        size,
        block,
        ...(className === undefined ? {} : { className }),
      })}
      {...props}
    />
  );
}
