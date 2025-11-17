import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

test('renders card and links', () => {
  render(
    <Card
      title="Title"
      meta="Meta"
      description="Desc"
      iframeSrc="https://example.com"
      liveUrl="https://example.com/live"
      stealUrl="https://example.com/steal"
    />
  );
  expect(screen.getByText('Title')).toBeInTheDocument();
  const links = screen.getAllByRole('link');
  links.forEach((a: HTMLElement) => {
    expect(a).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('does not render meta when absent', () => {
  render(
    <Card
      title="No Meta"
      description="Desc"
      iframeSrc="https://example.com"
      liveUrl="https://example.com/live"
      stealUrl="https://example.com/steal"
    />
  );
  expect(screen.queryByText('Meta')).not.toBeInTheDocument();
});

test('expand button toggles expanded state', () => {
  render(
    <Card
      title="Title"
      description="Desc"
      iframeSrc="https://example.com"
      liveUrl="https://example.com/live"
      stealUrl="https://example.com/steal"
    />
  );
  const btn = screen.getByRole('button', { name: /expand preview/i });
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  fireEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
  const iframe = screen.getByTitle('Title');
  expect(iframe).toHaveAttribute('sandbox');
});