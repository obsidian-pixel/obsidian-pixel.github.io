/**
 * ChromaForge Pro - Lightness Slider
 * Controls brightness/value of the selected color
 * Interactive horizontal slider with live preview
 */

import * as React from 'react';
import styles from './LightnessSlider.module.css';

const { useRef, useCallback, useEffect, useState } = React;

interface LightnessSliderProps {
  hue: number; // 0-360
  saturation: number; // 0-100
  lightness: number; // 0-100
  onChange: (lightness: number) => void;
}

export const LightnessSlider: React.FC<LightnessSliderProps> = ({
  hue,
  saturation,
  lightness,
  onChange,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Draw gradient showing color at different lightness levels
  useEffect(() => {
    const canvas = gradientRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Create gradient from black → vibrant color → white
    for (let x = 0; x < width; x++) {
      const v = (x / width) * 100; // 0-100

      // Convert HSV to RGB
      const h = hue / 360;
      const s = saturation / 100;
      const value = v / 100;

      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = value * (1 - s);
      const q = value * (1 - f * s);
      const t = value * (1 - (1 - f) * s);

      let r: number, g: number, b: number;
      switch (i % 6) {
        case 0:
          r = value;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = value;
          b = p;
          break;
        case 2:
          r = p;
          g = value;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = value;
          break;
        case 4:
          r = t;
          g = p;
          b = value;
          break;
        case 5:
          r = value;
          g = p;
          b = q;
          break;
        default:
          r = 0;
          g = 0;
          b = 0;
      }

      ctx.fillStyle = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
      ctx.fillRect(x, 0, 1, height);
    }
  }, [hue, saturation]);

  const handleLightnessChange = useCallback(
    (clientX: number) => {
      const slider = sliderRef.current;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newLightness = (x / rect.width) * 100;

      onChange(Math.round(Math.max(0, Math.min(100, newLightness))));
    },
    [onChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      handleLightnessChange(e.clientX);
    },
    [handleLightnessChange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleLightnessChange(e.clientX);
      }
    },
    [isDragging, handleLightnessChange]
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
        handleLightnessChange(touch.clientX);
      }
    },
    [handleLightnessChange]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        handleLightnessChange(touch.clientX);
      }
    },
    [handleLightnessChange]
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
      const newLightness = Math.max(0, Math.min(100, lightness + delta));
      onChange(newLightness);
    },
    [lightness, onChange]
  );

  const thumbPosition = `${lightness}%`;

  return (
    <div className={styles.container}>
      <label htmlFor="lightness-slider" className={styles.label}>
        Lightness
      </label>
      <div
        id="lightness-slider"
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
        aria-label="Lightness slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={lightness}
        aria-valuetext={`${lightness}%`}
        onKeyDown={handleKeyDown}
      >
        <canvas ref={gradientRef} width={300} height={24} className={styles.gradient} />
        <div className={styles.thumb} style={{ left: thumbPosition }} />
      </div>
    </div>
  );
};
