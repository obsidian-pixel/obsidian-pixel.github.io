/**
 * ChromaForge Pro - Palette Display Panel
 * Shows generated color harmonies
 */

import * as React from 'react';
import styles from './PalettePanel.module.css';
import type { ColorState, PaletteType } from '../types';

const { memo, useState } = React;

interface PalettePanelProps {
  colors: ColorState[];
  selectedType: PaletteType;
  onTypeChange: (type: PaletteType) => void;
  onColorSelect: (color: ColorState) => void;
}

const PALETTE_TYPES: { value: PaletteType; label: string }[] = [
  { value: 'analogous', label: 'Analogous' },
  { value: 'complementary', label: 'Complementary' },
  { value: 'split-complementary', label: 'Split Comp.' },
  { value: 'triadic', label: 'Triadic' },
  { value: 'tetradic', label: 'Tetradic' },
  { value: 'monochromatic', label: 'Monochromatic' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'pastel', label: 'Pastel' },
  { value: 'deep', label: 'Deep/Rich' },
];

export const PalettePanel: React.FC<PalettePanelProps> = memo(
  ({ colors, selectedType, onTypeChange, onColorSelect }) => {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (color: ColorState, index: number) => {
      navigator.clipboard.writeText(color.hex);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    };

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Color Harmony</h3>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as PaletteType)}
            className={styles.select}
            aria-label="Select palette type"
          >
            {PALETTE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.palette}>
          {colors.map((color, index) => (
            <div
              key={index}
              className={styles.swatch}
              style={{ backgroundColor: color.hex }}
              onClick={() => onColorSelect(color)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onColorSelect(color);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select color ${color.hex}`}
            >
              <div className={styles.swatchOverlay}>
                <span className={styles.hexLabel}>{color.hex}</span>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(color, index);
                  }}
                  aria-label="Copy color"
                >
                  {copiedIndex === index ? '✓' : '⎘'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

PalettePanel.displayName = 'PalettePanel';
