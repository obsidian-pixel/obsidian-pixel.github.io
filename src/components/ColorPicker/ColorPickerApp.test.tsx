import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ColorPickerApp, ColorPickerAppContent } from './ColorPickerApp';
import { useColorState } from './hooks/useColorState';
import { generatePalette } from './utils/paletteGenerator';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/projects/colorpicker' }),
}));

jest.mock('./hooks/useColorState');
jest.mock('./utils/paletteGenerator');
jest.mock('./utils/colorStorage');

// Mock child components
jest.mock('./pickers/VibrantColorWheel', () => ({
  VibrantColorWheel: () => <div data-testid="vibrant-color-wheel">VibrantColorWheel</div>,
}));
jest.mock('./pickers/LightnessSlider', () => ({
  LightnessSlider: () => <div data-testid="lightness-slider">LightnessSlider</div>,
}));
jest.mock('./pickers/AlphaSlider', () => ({
  AlphaSlider: () => <div data-testid="alpha-slider">AlphaSlider</div>,
}));
jest.mock('./pickers/ColorInputs', () => ({
  ColorInputs: () => <div data-testid="color-inputs">ColorInputs</div>,
}));
jest.mock('./panels/PalettePanel', () => ({
  PalettePanel: ({ onColorSelect, onToggleLock, lockedColors, colors }: any) => (
    <div data-testid="palette-panel">
      {colors.map((c: any, i: number) => (
        <div key={i} data-testid={`palette-swatch-${i}`}>
          {c.hex}
          <button onClick={() => onToggleLock(i)} data-testid={`lock-btn-${i}`}>
            {lockedColors[i] ? 'Locked' : 'Unlocked'}
          </button>
        </div>
      ))}
      <button onClick={() => onColorSelect({ hex: '#FFFFFF' })} data-testid="palette-select-btn">
        Select White
      </button>
    </div>
  ),
}));
jest.mock('./panels/ImageExtractorPanel', () => ({
  ImageExtractorPanel: ({ onColorSelect }: any) => (
    <div data-testid="image-extractor-panel">
      <button onClick={() => onColorSelect({ hex: '#000000' })} data-testid="image-select-btn">
        Select Black
      </button>
    </div>
  ),
}));
jest.mock('./panels/CollectionsPanel', () => ({
  CollectionsPanel: () => <div data-testid="collections-panel">CollectionsPanel</div>,
}));
jest.mock('./panels/HistoryPanel', () => ({
  HistoryPanel: () => <div data-testid="history-panel">HistoryPanel</div>,
}));
jest.mock('./panels/ContrastPanel', () => ({
  ContrastPanel: () => <div data-testid="contrast-panel">ContrastPanel</div>,
}));
jest.mock('./panels/ExportPanel', () => ({
  ExportPanel: () => <div data-testid="export-panel">ExportPanel</div>,
}));
jest.mock('../SEO/SEO', () => ({
  SEO: () => <div data-testid="seo">SEO</div>,
}));

describe('ColorPickerApp', () => {
  const mockSetColor = jest.fn();
  const mockColor = {
    hex: '#FF0000',
    hsv: { h: 0, s: 100, v: 100 },
    oklch: { l: 0.6, c: 0.2, h: 20 },
    cmyk: { c: 0, m: 100, y: 100, k: 0 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useColorState as jest.Mock).mockReturnValue({
      color: mockColor,
      setColor: mockSetColor,
      updateFromHex: jest.fn(),
      updateFromRgb: jest.fn(),
      updateFromHsl: jest.fn(),
      updateFromHsv: jest.fn(),
    });
    (generatePalette as jest.Mock).mockReturnValue([
      { hex: '#FF0000' },
      { hex: '#00FF00' },
      { hex: '#0000FF' },
      { hex: '#FFFF00' },
      { hex: '#00FFFF' },
    ]);
  });

  it('renders correctly', () => {
    render(<ColorPickerApp />);
    expect(screen.getByTestId('palette-panel')).toBeInTheDocument();
    expect(screen.getByTestId('image-extractor-panel')).toBeInTheDocument();
  });

  it('updates main color when image color is selected', () => {
    render(<ColorPickerApp />);
    const imageSelectBtn = screen.getByTestId('image-select-btn');
    fireEvent.click(imageSelectBtn);
    expect(mockSetColor).toHaveBeenCalledWith({ hex: '#000000' });
  });

  it('updates main color when palette color is selected', () => {
    render(<ColorPickerApp />);
    const paletteSelectBtn = screen.getByTestId('palette-select-btn');
    fireEvent.click(paletteSelectBtn);
    expect(mockSetColor).toHaveBeenCalledWith({ hex: '#FFFFFF' });
  });

  it('toggles lock state when lock button is clicked', () => {
    render(<ColorPickerApp />);
    const lockBtn = screen.getByTestId('lock-btn-0');
    expect(lockBtn).toHaveTextContent('Unlocked');

    fireEvent.click(lockBtn);
    expect(lockBtn).toHaveTextContent('Locked');

    fireEvent.click(lockBtn);
    expect(lockBtn).toHaveTextContent('Unlocked');
  });

  it('preserves locked colors when palette regenerates', async () => {
    // Setup initial render
    const { rerender } = render(<ColorPickerAppContent />);

    // Lock index 1 (which is #00FF00 initially)
    const lockBtn = screen.getByTestId('lock-btn-1');
    fireEvent.click(lockBtn);

    // Verify lock state
    expect(lockBtn).toHaveTextContent('Locked');

    // Change color state to trigger regeneration
    const newColor = {
      hex: '#000000',
      hsv: { h: 0, s: 0, v: 0 },
      oklch: { l: 0, c: 0, h: 0 },
      cmyk: { c: 0, m: 0, y: 0, k: 100 },
    };
    (useColorState as jest.Mock).mockReturnValue({
      color: newColor,
      setColor: mockSetColor,
      updateFromHex: jest.fn(),
      updateFromRgb: jest.fn(),
      updateFromHsl: jest.fn(),
      updateFromHsv: jest.fn(),
    });

    // Mock generatePalette to return completely different colors
    (generatePalette as jest.Mock).mockReturnValue([
      { hex: '#111111' },
      { hex: '#222222' }, // This should be ignored for index 1 because it's locked
      { hex: '#333333' },
      { hex: '#444444' },
      { hex: '#555555' },
    ]);

    // Rerender with new color
    rerender(<ColorPickerAppContent />);

    // Check if generatePalette was called with new color
    expect(generatePalette).toHaveBeenCalledWith(newColor, 'analogous', 5);

    // Check if index 1 is still #00FF00 (from initial render)
    // We need to check the text content of swatches
    const swatch1 = screen.getByTestId('palette-swatch-1');
    expect(swatch1).toHaveTextContent('#00FF00');

    // Check if index 0 updated (it was not locked)
    await waitFor(() => {
      const swatch0 = screen.getByTestId('palette-swatch-0');
      expect(swatch0).toHaveTextContent('#111111');
    });
  });
});
