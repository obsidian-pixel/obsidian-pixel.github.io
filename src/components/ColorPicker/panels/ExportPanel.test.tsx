import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { ExportPanel } from './ExportPanel';

// Mock clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: jest.fn(),
  },
});

describe('ExportPanel', () => {
  const mockColors = [
    {
      hex: '#FF0000',
      rgb: { r: 255, g: 0, b: 0 },
      hsl: { h: 0, s: 100, l: 50 },
      hsv: { h: 0, s: 100, v: 100 },
      cmyk: { c: 0, m: 100, y: 100, k: 0 },
      oklch: { l: 0.6, c: 0.2, h: 20 },
    },
    {
      hex: '#00FF00',
      rgb: { r: 0, g: 255, b: 0 },
      hsl: { h: 120, s: 100, l: 50 },
      hsv: { h: 120, s: 100, v: 100 },
      cmyk: { c: 100, m: 0, y: 100, k: 0 },
      oklch: { l: 0.8, c: 0.2, h: 140 },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ExportPanel colors={mockColors} />);
    expect(screen.getByText('Export Code')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('TAILWIND')).toBeInTheDocument();
  });

  it('generates CSS variables by default', () => {
    render(<ExportPanel colors={mockColors} />);
    const codeBlock = screen.getByText((content) => content.includes('--color-1: #FF0000'));
    expect(codeBlock).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(':root {'))).toBeInTheDocument();
  });

  it('switches to Tailwind format', () => {
    render(<ExportPanel colors={mockColors} />);
    const tailwindBtn = screen.getByText('TAILWIND');
    fireEvent.click(tailwindBtn);

    expect(
      screen.getByText((content) => content.includes('module.exports = {'))
    ).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('brand-1'))).toBeInTheDocument();
  });

  it('switches to SCSS format', () => {
    render(<ExportPanel colors={mockColors} />);
    const scssBtn = screen.getByText('SCSS');
    fireEvent.click(scssBtn);

    expect(
      screen.getByText((content) => content.includes('$color-1: #FF0000;'))
    ).toBeInTheDocument();
  });

  it('switches to JSON format', () => {
    render(<ExportPanel colors={mockColors} />);
    const jsonBtn = screen.getByText('JSON');
    fireEvent.click(jsonBtn);

    expect(screen.getByText((content) => content.includes('"hex": "#FF0000"'))).toBeInTheDocument();
  });

  it('copies code to clipboard', () => {
    jest.useFakeTimers();
    render(<ExportPanel colors={mockColors} />);

    const copyBtn = screen.getByText('Copy');
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(screen.getByText('✓ Copied')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText('Copy')).toBeInTheDocument();
    jest.useRealTimers();
  });

  it('handles empty colors', () => {
    render(<ExportPanel colors={[]} />);
    expect(screen.getByText('No colors to export')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeDisabled();
  });
});
