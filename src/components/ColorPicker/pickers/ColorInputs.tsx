/**
 * ChromaForge Pro - Color Input Fields
 * Multi-format input with validation
 */

import * as React from 'react';
import styles from './ColorInputs.module.css';
import type { ColorState } from '../types';

const { memo, useCallback } = React;

interface ColorInputsProps {
  color: ColorState;
  onHexChange: (hex: string) => void;
  onRgbChange: (rgb: ColorState['rgb']) => void;
  onHslChange: (hsl: ColorState['hsl']) => void;
}

export const ColorInputs: React.FC<ColorInputsProps> = memo(
  ({ color, onHexChange, onRgbChange, onHslChange }) => {
    const handleHexChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onHexChange(e.target.value);
      },
      [onHexChange]
    );

    const handleRgbChange = useCallback(
      (channel: 'r' | 'g' | 'b', value: string) => {
        const num = parseInt(value) || 0;
        onRgbChange({ ...color.rgb, [channel]: Math.max(0, Math.min(255, num)) });
      },
      [color.rgb, onRgbChange]
    );

    const handleHslChange = useCallback(
      (channel: 'h' | 's' | 'l', value: string) => {
        const num = parseInt(value) || 0;
        const max = channel === 'h' ? 360 : 100;
        onHslChange({ ...color.hsl, [channel]: Math.max(0, Math.min(max, num)) });
      },
      [color.hsl, onHslChange]
    );

    return (
      <div className={styles.container}>
        <div className={styles.formatGroup}>
          <label className={styles.label}>HEX</label>
          <input
            type="text"
            value={color.hex}
            onChange={handleHexChange}
            className={styles.input}
            maxLength={9}
            aria-label="Hexadecimal color value"
          />
        </div>

        <div className={styles.formatGroup}>
          <label className={styles.label}>RGB</label>
          <div className={styles.multiInput}>
            <input
              type="number"
              value={color.rgb.r}
              onChange={(e) => handleRgbChange('r', e.target.value)}
              className={styles.inputSmall}
              min={0}
              max={255}
              aria-label="Red channel"
            />
            <input
              type="number"
              value={color.rgb.g}
              onChange={(e) => handleRgbChange('g', e.target.value)}
              className={styles.inputSmall}
              min={0}
              max={255}
              aria-label="Green channel"
            />
            <input
              type="number"
              value={color.rgb.b}
              onChange={(e) => handleRgbChange('b', e.target.value)}
              className={styles.inputSmall}
              min={0}
              max={255}
              aria-label="Blue channel"
            />
          </div>
        </div>

        <div className={styles.formatGroup}>
          <label className={styles.label}>HSL</label>
          <div className={styles.multiInput}>
            <input
              type="number"
              value={color.hsl.h}
              onChange={(e) => handleHslChange('h', e.target.value)}
              className={styles.inputSmall}
              min={0}
              max={360}
              aria-label="Hue"
            />
            <input
              type="number"
              value={color.hsl.s}
              onChange={(e) => handleHslChange('s', e.target.value)}
              className={styles.inputSmall}
              min={0}
              max={100}
              aria-label="Saturation"
            />
            <input
              type="number"
              value={color.hsl.l}
              onChange={(e) => handleHslChange('l', e.target.value)}
              className={styles.inputSmall}
              min={0}
              max={100}
              aria-label="Lightness"
            />
          </div>
        </div>

        <div
          className={styles.preview}
          style={{ backgroundColor: color.hex }}
          aria-label="Color preview"
        />
      </div>
    );
  }
);

ColorInputs.displayName = 'ColorInputs';
