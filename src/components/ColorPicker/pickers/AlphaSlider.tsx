/**
 * ChromaForge Pro - Alpha Slider
 * Controls transparency/alpha channel of the selected color
 * Includes checkerboard pattern for transparency visualization
 */

import * as React from 'react';
import styles from './AlphaSlider.module.css';
import type { ColorState } from '../types';

const { useRef, useCallback, useEffect, useState } = React;

interface AlphaSliderProps {
  color: ColorState;
  alpha: number; // 0-100
  onChange: (alpha: number) => void;
}

export const AlphaSlider: React.FC<AlphaSliderProps> = ({ color, alpha, onChange }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Draw gradient with checkerboard background
  useEffect(() => {
    const canvas = gradientRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const checkerSize = 8;

    // Draw checkerboard pattern
    for (let y = 0; y < height; y += checkerSize) {
      for (let x = 0; x < width; x += checkerSize) {
        const isEven = (Math.floor(x / checkerSize) + Math.floor(y / checkerSize)) % 2 === 0;
        ctx.fillStyle = isEven ? '#ffffff' : '#cccccc';
        ctx.fillRect(x, y, checkerSize, checkerSize);
      }
    }

    // Draw alpha gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    const rgb = color.rgb;
    gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
    gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }, [color]);

  const handleAlphaChange = useCallback(
    (clientX: number) => {
      const slider = sliderRef.current;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newAlpha = (x / rect.width) * 100;

      onChange(Math.round(Math.max(0, Math.min(100, newAlpha))));
    },
    [onChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      handleAlphaChange(e.clientX);
    },
    [handleAlphaChange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleAlphaChange(e.clientX);
      }
    },
    [isDragging, handleAlphaChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setIsDragging(true);
      const touch = e.touches[0];
      if (touch) {
        handleAlphaChange(touch.clientX);
      }
    },
    [handleAlphaChange]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        handleAlphaChange(touch.clientX);
      }
    },
    [handleAlphaChange]
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let delta = 0;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        delta = -1;
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        delta = 1;
      } else {
        return;
      }

      e.preventDefault();
      const newAlpha = Math.max(0, Math.min(100, alpha + delta));
      onChange(newAlpha);
    },
    [alpha, onChange]
  );

  const thumbPosition = `${alpha}%`;

  return (
    <div className={styles.container}>
      <label htmlFor="alpha-slider" className={styles.label}>
        Alpha
      </label>
      <div
        id="alpha-slider"
        ref={sliderRef}
        className={styles.sliderTrack}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="slider"
        tabIndex={0}
        aria-label="Alpha slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={alpha}
        aria-valuetext={`${alpha}%`}
        onKeyDown={handleKeyDown}
      >
        <canvas ref={gradientRef} width={300} height={24} className={styles.gradient} />
        <div className={styles.thumb} style={{ left: thumbPosition }} />
      </div>
    </div>
  );
};
