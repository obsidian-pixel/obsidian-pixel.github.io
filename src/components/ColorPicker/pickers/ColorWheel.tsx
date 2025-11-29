/**
 * ChromaForge Pro - Color Wheel Picker
 * Interactive HSV color wheel with canvas rendering
 * Mobile-first touch and mouse support
 */

import * as React from 'react';
import styles from './ColorWheel.module.css';
import type { HSV } from '../types';

const { useRef, useEffect, useCallback, useState } = React;

interface ColorWheelProps {
  hsv: HSV;
  onChange: (hsv: HSV) => void;
  size?: number;
}

export const ColorWheel: React.FC<ColorWheelProps> = ({ hsv, onChange, size = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Draw color wheel
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw saturation-value square
    for (let y = 0; y < radius * 2; y++) {
      for (let x = 0; x < radius * 2; x++) {
        const dx = x - radius;
        const dy = y - radius;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius) {
          const saturation = distance / radius;
          const angle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;

          // Convert HSV to RGB for rendering
          const h = angle / 360;
          const s = saturation;
          const v = 1 - y / (radius * 2);

          const i = Math.floor(h * 6);
          const f = h * 6 - i;
          const p = v * (1 - s);
          const q = v * (1 - f * s);
          const t = v * (1 - (1 - f) * s);

          let r: number, g: number, b: number;
          switch (i % 6) {
            case 0:
              r = v;
              g = t;
              b = p;
              break;
            case 1:
              r = q;
              g = v;
              b = p;
              break;
            case 2:
              r = p;
              g = v;
              b = t;
              break;
            case 3:
              r = p;
              g = q;
              b = v;
              break;
            case 4:
              r = t;
              g = p;
              b = v;
              break;
            case 5:
              r = v;
              g = p;
              b = q;
              break;
            default:
              r = 0;
              g = 0;
              b = 0;
          }

          ctx.fillStyle = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
          ctx.fillRect(centerX - radius + x, centerY - radius + y, 1, 1);
        }
      }
    }

    // Draw cursor at current color position
    const angle = (hsv.h * Math.PI) / 180;
    const dist = (hsv.s / 100) * radius;
    const cursorX = centerX + Math.cos(angle) * dist;
    const cursorY = centerY + Math.sin(angle) * dist;

    ctx.strokeStyle = hsv.v > 50 ? '#000' : '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 8, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = hsv.v > 50 ? '#fff' : '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, 7, 0, Math.PI * 2);
    ctx.stroke();
  }, [hsv, size]);

  const handleColorChange = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = size / 2;
      const centerY = size / 2;
      const radius = size / 2 - 10;

      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > radius) return;

      const saturation = Math.min((distance / radius) * 100, 100);
      const angle = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
      const value = 100 - (y / size) * 100;

      onChange({
        h: Math.round(angle),
        s: Math.round(saturation),
        v: Math.round(Math.max(0, Math.min(100, value))),
        a: hsv.a,
      });
    },
    [onChange, size, hsv.a]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      handleColorChange(e.clientX, e.clientY);
    },
    [handleColorChange]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        handleColorChange(e.clientX, e.clientY);
      }
    },
    [isDragging, handleColorChange]
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
        handleColorChange(touch.clientX, touch.clientY);
      }
    },
    [handleColorChange]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (touch) {
        handleColorChange(touch.clientX, touch.clientY);
      }
    },
    [handleColorChange]
  );

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className={styles.canvas}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        aria-label="Color wheel picker"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={360}
        aria-valuenow={hsv.h}
      />
    </div>
  );
};
