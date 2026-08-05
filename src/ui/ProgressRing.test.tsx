import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressRing } from './ProgressRing';

describe('ProgressRing', () => {
  it('names itself and reports its value', () => {
    render(
      <ProgressRing value={0.6} label="Domain 4 mastery">
        60%
      </ProgressRing>,
    );

    expect(screen.getByRole('progressbar', { name: 'Domain 4 mastery' })).toHaveAttribute(
      'aria-valuenow',
      '60',
    );
  });

  it('renders the identity label inside the ring, so meaning never rests on the arc colour', () => {
    render(
      <ProgressRing value={0.25} label="Domain 2 mastery">
        <span data-testid="ring-content">D2</span>
      </ProgressRing>,
    );

    expect(screen.getByTestId('ring-content')).toHaveTextContent('D2');
  });

  it('omits the arc entirely at zero rather than drawing a stub', () => {
    const { container } = render(<ProgressRing value={0} label="Untouched" />);

    // Track only: a rounded linecap at zero length still paints a visible dot, which reads as
    // "a little bit done" when nothing has been done.
    expect(container.querySelectorAll('circle')).toHaveLength(1);
  });

  it('draws both track and arc once there is progress', () => {
    const { container } = render(<ProgressRing value={0.1} label="Started" />);

    expect(container.querySelectorAll('circle')).toHaveLength(2);
  });
});
