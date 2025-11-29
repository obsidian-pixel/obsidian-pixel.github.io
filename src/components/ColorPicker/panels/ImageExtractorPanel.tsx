/**
 * ChromaForge Pro - Image Upload Panel
 * Upload images and extract color palettes
 */

import * as React from 'react';
import styles from './ImageExtractorPanel.module.css';
import type { ColorState } from '../types';
import { extractColorsFromImage } from '../utils/imageColorExtractor';

const { memo, useState } = React;

interface ImageExtractorPanelProps {
  onColorsExtracted: (colors: ColorState[]) => void;
  onColorSelect?: (color: ColorState) => void;
}

export const ImageExtractorPanel: React.FC<ImageExtractorPanelProps> = memo(
  ({ onColorsExtracted, onColorSelect }) => {
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractedColors, setExtractedColors] = useState<ColorState[]>([]);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      setIsExtracting(true);
      setPreviewUrl(URL.createObjectURL(file));

      try {
        const colors = await extractColorsFromImage(file, 10);
        setExtractedColors(colors);
        onColorsExtracted(colors);
      } catch (error) {
        console.error('Failed to extract colors:', error);
        alert('Failed to extract colors from image');
      } finally {
        setIsExtracting(false);
      }
    };

    const handleClear = () => {
      setExtractedColors([]);
      setPreviewUrl(null);
    };

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Image Color Extraction</h3>
          {extractedColors.length > 0 && (
            <button type="button" onClick={handleClear} className={styles.clearBtn}>
              Clear
            </button>
          )}
        </div>

        <div className={styles.uploadArea}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className={styles.fileInput}
            id="image-upload"
          />
          <label htmlFor="image-upload" className={styles.uploadLabel}>
            {isExtracting ? (
              <span>Extracting colors...</span>
            ) : (
              <>
                <span className={styles.uploadIcon}>📁</span>
                <span>Upload Image</span>
                <span className={styles.uploadHint}>Click to select an image</span>
              </>
            )}
          </label>
        </div>

        {previewUrl && (
          <div className={styles.preview}>
            <img src={previewUrl} alt="Uploaded" className={styles.previewImg} />
          </div>
        )}

        {extractedColors.length > 0 && (
          <div className={styles.colors}>
            <p className={styles.colorsLabel}>{extractedColors.length} colors extracted</p>
            <div className={styles.grid}>
              {extractedColors.map((color, index) => (
                <div
                  key={index}
                  className={styles.swatch}
                  style={{ backgroundColor: color.hex }}
                  title={color.hex}
                  onClick={() => onColorSelect?.(color)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onColorSelect?.(color);
                    }
                  }}
                >
                  <span className={styles.hexLabel}>{color.hex}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

ImageExtractorPanel.displayName = 'ImageExtractorPanel';
