/// <reference types="react" />
import * as React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { App } from './App';

test('renders builds section', () => {
  render(<App />);
  expect(screen.getByLabelText('Builds')).toBeInTheDocument();
});

test('filters builds by query', () => {
  render(<App />);
  const input = screen.getByLabelText('Search builds');
  // filter to color picker
  fireEvent.change(input, { target: { value: 'color' } });
  const builds = screen.getByLabelText('Builds');
  expect(within(builds).queryByText('Beast Mode GPT')).not.toBeInTheDocument();
  expect(within(builds).getByText('Super Advanced Color Picker')).toBeInTheDocument();
});

export {};