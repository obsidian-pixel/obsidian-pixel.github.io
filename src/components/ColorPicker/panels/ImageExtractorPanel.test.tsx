import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageExtractorPanel } from './ImageExtractorPanel';
import { extractColorsFromImage } from '../utils/imageColorExtractor';

jest.mock('../utils/imageColorExtractor');

describe('ImageExtractorPanel', () => {
  const mockOnColorsExtracted = jest.fn();
  const mockOnColorSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls onColorSelect when an extracted color is clicked', async () => {
    const mockColors = [{ hex: '#FF0000' }, { hex: '#00FF00' }] as any[];
    (extractColorsFromImage as jest.Mock).mockResolvedValue(mockColors);

    render(
      <ImageExtractorPanel
        onColorsExtracted={mockOnColorsExtracted}
        onColorSelect={mockOnColorSelect}
      />
    );

    // Simulate file upload to get colors (or we could mock state if we could, but easier to simulate flow)
    // Actually, testing internal state is hard without triggering the flow.
    // But we can simulate the upload.
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    const input = screen.getByLabelText(/upload image/i);

    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn();

    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('#FF0000')).toBeInTheDocument();
    });

    const swatch = screen.getByTitle('#FF0000');
    fireEvent.click(swatch);

    expect(mockOnColorSelect).toHaveBeenCalledWith(mockColors[0]);
  });
});
