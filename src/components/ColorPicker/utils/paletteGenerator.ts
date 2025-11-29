/**
 * ChromaForge Pro - Palette Generator
 * Algorithmic color harmony generation
 */

import type { ColorState, PaletteType, HSL } from '../types';
import {
  hslToRgb,
  rgbToHex,
  rgbToHsv,
  rgbToHwb,
  rgbToOklch,
  rgbToLab,
  rgbToCmyk,
} from './colorConversions';

/**
 * Generate palette based on harmony type
 */
export function generatePalette(
  baseColor: ColorState,
  type: PaletteType,
  count: number = 5
): ColorState[] {
  const baseHsl = baseColor.hsl;

  switch (type) {
    case 'analogous':
      return generateAnalogous(baseHsl, count);
    case 'complementary':
      return generateComplementary(baseHsl);
    case 'split-complementary':
      return generateSplitComplementary(baseHsl);
    case 'triadic':
      return generateTriadic(baseHsl);
    case 'tetradic':
      return generateTetradic(baseHsl);
    case 'monochromatic':
      return generateMonochromatic(baseHsl, count);
    case 'neutral':
      return generateNeutral(baseHsl, count);
    case 'pastel':
      return generatePastel(baseHsl, count);
    case 'deep':
      return generateDeep(baseHsl, count);
    default:
      return [baseColor];
  }
}

/**
 * Convert HSL to full ColorState
 */
function hslToColorState(hsl: HSL): ColorState {
  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);

  return {
    hex,
    rgb,
    hsl,
    hsv: rgbToHsv(rgb),
    hwb: rgbToHwb(rgb),
    oklch: rgbToOklch(rgb),
    lab: rgbToLab(rgb),
    cmyk: rgbToCmyk(rgb),
  };
}

/**
 * Analogous colors (adjacent on color wheel)
 */
function generateAnalogous(baseHsl: HSL, count: number): ColorState[] {
  const colors: ColorState[] = [];
  const step = 30;

  for (let i = 0; i < count; i++) {
    const offset = (i - Math.floor(count / 2)) * step;
    const h = (baseHsl.h + offset + 360) % 360;
    colors.push(hslToColorState({ ...baseHsl, h }));
  }

  return colors;
}

/**
 * Complementary colors (opposite on wheel)
 */
function generateComplementary(baseHsl: HSL): ColorState[] {
  const complement = (baseHsl.h + 180) % 360;

  return [hslToColorState(baseHsl), hslToColorState({ ...baseHsl, h: complement })];
}

/**
 * Split-complementary
 */
function generateSplitComplementary(baseHsl: HSL): ColorState[] {
  const complement = (baseHsl.h + 180) % 360;

  return [
    hslToColorState(baseHsl),
    hslToColorState({ ...baseHsl, h: (complement - 30 + 360) % 360 }),
    hslToColorState({ ...baseHsl, h: (complement + 30) % 360 }),
  ];
}

/**
 * Triadic
 */
function generateTriadic(baseHsl: HSL): ColorState[] {
  return [
    hslToColorState(baseHsl),
    hslToColorState({ ...baseHsl, h: (baseHsl.h + 120) % 360 }),
    hslToColorState({ ...baseHsl, h: (baseHsl.h + 240) % 360 }),
  ];
}

/**
 * Tetradic
 */
function generateTetradic(baseHsl: HSL): ColorState[] {
  return [
    hslToColorState(baseHsl),
    hslToColorState({ ...baseHsl, h: (baseHsl.h + 90) % 360 }),
    hslToColorState({ ...baseHsl, h: (baseHsl.h + 180) % 360 }),
    hslToColorState({ ...baseHsl, h: (baseHsl.h + 270) % 360 }),
  ];
}

/**
 * Monochromatic
 */
function generateMonochromatic(baseHsl: HSL, count: number): ColorState[] {
  const colors: ColorState[] = [];
  const minL = 20;
  const maxL = 90;
  const step = (maxL - minL) / (count - 1);

  for (let i = 0; i < count; i++) {
    const l = minL + i * step;
    colors.push(hslToColorState({ ...baseHsl, l: Math.round(l) }));
  }

  return colors;
}

/**
 * Neutral palette
 */
function generateNeutral(baseHsl: HSL, count: number): ColorState[] {
  const colors: ColorState[] = [];

  for (let i = 0; i < count; i++) {
    const s = 5 + i * 10;
    const l = 30 + i * 15;
    colors.push(
      hslToColorState({
        h: baseHsl.h,
        s: Math.min(s, 30),
        l: Math.min(l, 85),
        a: baseHsl.a,
      })
    );
  }

  return colors;
}

/**
 * Pastel palette
 */
function generatePastel(baseHsl: HSL, count: number): ColorState[] {
  const colors: ColorState[] = [];
  const step = 360 / count;

  for (let i = 0; i < count; i++) {
    const h = (baseHsl.h + i * step) % 360;
    colors.push(
      hslToColorState({
        h: Math.round(h),
        s: 45,
        l: 80,
        a: baseHsl.a,
      })
    );
  }

  return colors;
}

/**
 * Deep/Rich palette
 */
function generateDeep(baseHsl: HSL, count: number): ColorState[] {
  const colors: ColorState[] = [];
  const step = 360 / count;

  for (let i = 0; i < count; i++) {
    const h = (baseHsl.h + i * step) % 360;
    colors.push(
      hslToColorState({
        h: Math.round(h),
        s: 75,
        l: 35,
        a: baseHsl.a,
      })
    );
  }

  return colors;
}
