/**
 * ChromaForge Pro - Image Color Extractor
 * Extract dominant colors from uploaded images
 */

import type { ColorState, RGB } from '../types';
import {
  rgbToHex,
  rgbToHsl,
  rgbToHsv,
  rgbToHwb,
  rgbToOklch,
  rgbToLab,
  rgbToCmyk,
} from './colorConversions';

/**
 * Extract dominant colors from an image file
 */
export async function extractColorsFromImage(
  file: File,
  count: number = 10
): Promise<ColorState[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        try {
          const colors = extractColorsFromImageElement(img, count);
          resolve(colors);
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Extract colors from an Image element using canvas
 */
function extractColorsFromImageElement(img: HTMLImageElement, count: number): ColorState[] {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Canvas context not available');

  // Resize for performance
  const maxSize = 200;
  const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
  canvas.width = img.width * scale;
  canvas.height = img.height * scale;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Color quantization using simple clustering
  const colorMap = new Map<string, { rgb: RGB; count: number }>();

  // Sample pixels (skip by 4 for performance)
  for (let i = 0; i < pixels.length; i += 16) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3] / 255;

    // Skip transparent pixels
    if (a < 0.5) continue;

    // Quantize to reduce color variations (divide by 10, multiply by 10)
    const qr = Math.round(r / 10) * 10;
    const qg = Math.round(g / 10) * 10;
    const qb = Math.round(b / 10) * 10;

    const key = `${qr},${qg},${qb}`;

    if (colorMap.has(key)) {
      colorMap.get(key)!.count++;
    } else {
      colorMap.set(key, { rgb: { r: qr, g: qg, b: qb, a: 1 }, count: 1 });
    }
  }

  // Sort by frequency and take top N
  const sortedColors = Array.from(colorMap.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, count);

  // Convert to ColorState
  return sortedColors.map(({ rgb }) => rgbToColorState(rgb));
}

/**
 * Convert RGB to full ColorState
 */
function rgbToColorState(rgb: RGB): ColorState {
  const hex = rgbToHex(rgb);

  return {
    hex,
    rgb,
    hsl: rgbToHsl(rgb),
    hsv: rgbToHsv(rgb),
    hwb: rgbToHwb(rgb),
    oklch: rgbToOklch(rgb),
    lab: rgbToLab(rgb),
    cmyk: rgbToCmyk(rgb),
  };
}
