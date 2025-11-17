import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from './Sidebar';

test('menu button toggles aria-expanded', () => {
  render(<Sidebar />);
  const btn = screen.getByTitle('Open menu');
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
});

test('hover does not expand; only button controls expansion', () => {
  render(<Sidebar />);
  const nav = screen.getByLabelText('Sidebar navigation');
  fireEvent.mouseEnter(nav);
  expect(nav.className).not.toMatch(/expanded/);
  fireEvent.mouseLeave(nav);
  expect(nav.className).not.toMatch(/expanded/);
});

export {};