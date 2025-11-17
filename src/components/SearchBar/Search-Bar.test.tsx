import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './Search-Bar';

test('updates on input and submits on enter', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const input = screen.getByLabelText('Search builds');
  fireEvent.change(input, { target: { value: 'color' } });
  fireEvent.keyUp(input, { key: 'Enter' });
  expect(onSearch).toHaveBeenCalled();
});

test('submits on button click', () => {
  const onSearch = jest.fn();
  render(<SearchBar onSearch={onSearch} />);
  const btn = screen.getByRole('button', { name: 'Submit search' });
  fireEvent.click(btn);
  expect(onSearch).toHaveBeenCalled();
});

export {};