import React from 'react'; // Import React for JSX
import '@testing-library/jest-dom';
import AdminPage from '../pages/AdminPage';
import { render } from '@testing-library/react';
import { afterEach, describe, test, vi } from 'vitest';
import { useDadJokes } from '../../hooks/useDadJokes';

vi.mock('../../hooks/useDadJokes', () => ({
    useDadJokes: vi.fn()
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('AdminPage rendering', () => {
  test('AdminPage renders without crashing', () => {
    // Mock the useDadJokes hook
    useDadJokes.mockReturnValue({
      jokes: [{ _id: '1', joke: 'Test joke' }],
      loading: true,
      error: null,
      addJoke: vi.fn(),
      deleteJoke: vi.fn(),
    });

    // Render the AdminPage component
    const { getByText } = render(<AdminPage />);
    
    // Check if the loading text is rendered
    expect(getByText('Loading...')).toBeInTheDocument();
  });
});

