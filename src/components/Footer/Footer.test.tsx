import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

test('renders footer links', () => {
  render(<Footer />);
  expect(screen.getByText('[X]')).toBeInTheDocument();
  expect(screen.getByText('[GitHub]')).toBeInTheDocument();
});

export {};