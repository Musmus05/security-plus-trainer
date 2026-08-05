import { cn } from './cn';

export interface SegmentedOption<T extends string> {
  value: T;
  /** Visible content. Keep it short — an icon, a word, a number. */
  label: React.ReactNode;
  /**
   * Full accessible name, for when the visible label is an icon or an abbreviation. Falls back to
   * the visible label, which is correct whenever that label is already a readable word.
   */
  accessibleName?: string;
}

export interface SegmentedControlProps<T extends string> {
  /** Radio group name. Must be unique on the page. */
  name: string;
  /** Group label, announced before the options. */
  legend: string;
  value: T;
  options: readonly SegmentedOption<T>[];
  onChange: (value: T) => void;
  size?: 'sm' | 'md';
}

const PADDING = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
} as const;

/**
 * A radio group styled as a segmented control.
 *
 * The input is stretched over the whole segment and made transparent, rather than hidden with
 * `sr-only` beside visible content. Two reasons, and the second is the one that matters:
 *
 * 1. A 1×1 clipped input is a 1×1 *hit target*. Clicking the label still works because of the
 *    label–input association, but a touch that lands a few pixels off does not, and any tooling
 *    that drives the input directly finds it covered by the visible text.
 * 2. Stretching the input makes it the real target, so the clickable area is the whole segment for
 *    pointer, touch and automation alike.
 *
 * Native radios also bring arrow-key navigation and roving focus for free, which a set of buttons
 * with `aria-pressed` would each have to reimplement.
 */
export function SegmentedControl<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
  size = 'md',
}: SegmentedControlProps<T>) {
  return (
    // A `<div role="radiogroup">` rather than a `<fieldset>`: a bare fieldset maps to the vaguer
    // role="group", and overriding a fieldset's role trips jsx-a11y for good reason — a generic
    // container is the honest element to put a widget role on.
    <div
      role="radiogroup"
      aria-label={legend}
      className="border-edge bg-sunken flex items-center gap-0.5 rounded-full border p-0.5"
    >
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <label
            key={option.value}
            className={cn(
              'relative grid cursor-pointer place-items-center rounded-full font-semibold transition-colors',
              'has-focus-visible:outline-action has-focus-visible:outline-2 has-focus-visible:outline-offset-1',
              PADDING[size],
              selected ? 'bg-surface text-ink shadow-sm' : 'text-ink-secondary hover:text-ink',
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => {
                onChange(option.value);
              }}
              className="absolute inset-0 cursor-pointer appearance-none rounded-full opacity-0"
            />
            {option.accessibleName === undefined ? (
              option.label
            ) : (
              <>
                <span aria-hidden>{option.label}</span>
                <span className="sr-only">{option.accessibleName}</span>
              </>
            )}
          </label>
        );
      })}
    </div>
  );
}
