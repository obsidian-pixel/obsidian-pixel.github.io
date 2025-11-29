import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PalettePanel } from './PalettePanel';

describe('PalettePanel', () => {
  const mockColors = [
    { hex: '#FF0000', rgb: { r: 255, g: 0, b: 0 }, hsl: { h: 0, s: 100, l: 50 } },
    { hex: '#00FF00', rgb: { r: 0, g: 255, b: 0 }, hsl: { h: 120, s: 100, l: 50 } },
  ] as any[];

  const mockProps = {
    colors: mockColors,
    selectedType: 'analogous' as any,
    onTypeChange: jest.fn(),
    onColorSelect: jest.fn(),
    lockedColors: [false, true],
    onToggleLock: jest.fn(),
  };

  it('renders lock buttons with correct state', () => {
    render(<PalettePanel {...mockProps} />);

    const lockButtons = screen.getAllByRole('button', { name: /lock color/i });
    expect(lockButtons).toHaveLength(2);

    // First button (unlocked)
    expect(lockButtons[0]).toHaveTextContent('🔓');
    expect(lockButtons[0]).toHaveAttribute('aria-label', 'Lock color');

    // Second button (locked)
    expect(lockButtons[1]).toHaveTextContent('🔒');
    expect(lockButtons[1]).toHaveAttribute('aria-label', 'Unlock color');
  });

  it('calls onToggleLock when lock button is clicked', () => {
    render(<PalettePanel {...mockProps} />);

    const lockButtons = screen.getAllByRole('button', { name: /lock color/i });
    fireEvent.click(lockButtons[0]);

    expect(mockProps.onToggleLock).toHaveBeenCalledWith(0);
  });

  it('calls onColorSelect when swatch is clicked', () => {
    render(<PalettePanel {...mockProps} />);

    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    fireEvent.click(swatches[0]);

    expect(mockProps.onColorSelect).toHaveBeenCalledWith(mockColors[0]);
  });
});
