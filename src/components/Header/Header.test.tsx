import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from './Header';

test('renders header content', () => {
  render(<Header />);
  expect(screen.getByText(/Obsidian-Pixel's Vault/)).toBeInTheDocument();
  expect(screen.getByText('[GitHub]')).toBeInTheDocument();
});

export {};