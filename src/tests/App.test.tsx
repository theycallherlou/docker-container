import { describe, test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    try {
      render(<App />);
    } catch (error) {
      console.error(error);
    }
  });

  test('renders react logo', () => {
    const title = screen.getAllByTestId(/container/i);
    expect(title).toBeDefined();
  });
});
