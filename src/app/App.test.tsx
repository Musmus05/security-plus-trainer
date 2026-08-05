import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renders the application title', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Security+ Trainer' })).toBeVisible();
  });

  it('states the exam scope taken from the official objectives document', () => {
    render(<App />);

    expect(screen.getByText(/SY0-701/)).toBeVisible();
    expect(screen.getByText(/5 domains, 28 objectives/)).toBeVisible();
  });
});
