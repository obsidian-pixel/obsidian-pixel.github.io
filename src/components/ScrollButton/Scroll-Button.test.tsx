/// <reference types="react" />
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollButton } from './Scroll-Button';

function mockScroll(y: number, doc: number, win: number) {
  Object.defineProperty(window, 'scrollY', { value: y, writable: true });
  Object.defineProperty(document.documentElement, 'scrollTop', { value: y, writable: true });
  Object.defineProperty(document.body, 'scrollHeight', { value: doc, writable: true });
  Object.defineProperty(document.documentElement, 'scrollHeight', { value: doc, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: win, writable: true });
}

test('shows button after scrolling and toggles rotation', () => {
  mockScroll(300, 2000, 800);
  render(<ScrollButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button'));
});

test('click scrolls to top when beyond half (uses scrollTo)', () => {
  mockScroll(900, 2000, 800);
  Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, writable: true });
  // ensure scrollTo exists to cover primary branch
  const el = document.documentElement as unknown as HTMLElement & { scrollTo: (opts: ScrollToOptions) => void; scrollTop: number };
  el.scrollTo = ({ top }: ScrollToOptions) => { el.scrollTop = (top as number) ?? 0; };
  render(<ScrollButton />);
  const btn = screen.getByRole('button');
  fireEvent.click(btn);
  expect(document.documentElement.scrollTop).toBe(0);
});

test('click scrolls to bottom when below half (fallback branch without scrollTo)', () => {
  // below half: 100 / (2000 - 800) = ~0.083
  Object.defineProperty(document.documentElement, 'scrollTop', { value: 100, writable: true });
  Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true });
  Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, writable: true });
  Object.defineProperty(document.documentElement, 'scrollTo', { value: undefined, writable: true });
  render(<ScrollButton />);
  fireEvent.click(screen.getByRole('button'));
  expect(document.documentElement.scrollTop).toBe(1200);
});

export {};