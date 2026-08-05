import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('exposes the value as a percentage to assistive technology', () => {
    render(<ProgressBar value={0.42} label="Domain 1 progress" />);

    const bar = screen.getByRole('progressbar', { name: 'Domain 1 progress' });

    expect(bar).toHaveAttribute('aria-valuenow', '42');
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
  });

  it('clamps a value above 1 instead of overflowing the track', () => {
    render(<ProgressBar value={4} label="Overshoot" />);

    expect(screen.getByRole('progressbar', { name: 'Overshoot' })).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
  });
});
