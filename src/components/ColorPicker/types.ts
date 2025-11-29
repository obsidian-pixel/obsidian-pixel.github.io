/**
 * ChromaForge Pro - Type Definitions
 * Comprehensive type system for multi-format color operations
 */

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsv' | 'hwb' | 'oklch' | 'lab' | 'cmyk';

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a?: number; // 0-1
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a?: number; // 0-1
}

export interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
  a?: number; // 0-1
}

export interface HWB {
  h: number; // 0-360
  w: number; // 0-100
  b: number; // 0-100
  a?: number; // 0-1
}

export interface OKLCH {
  l: number; // 0-1
  c: number; // 0-0.4
  h: number; // 0-360
  a?: number; // 0-1
}

export interface LAB {
  l: number; // 0-100
  a: number; // -128 to 127
  b: number; // -128 to 127
  alpha?: number; // 0-1
}

export interface CMYK {
  c: number; // 0-100
  m: number; // 0-100
  y: number; // 0-100
  k: number; // 0-100
}

export interface ColorState {
  hex: string;
  rgb: RGB;
  hsl: HSL;
  hsv: HSV;
  hwb: HWB;
  oklch: OKLCH;
  lab: LAB;
  cmyk: CMYK;
}

export type PaletteType =
  | 'analogous'
  | 'complementary'
  | 'split-complementary'
  | 'triadic'
  | 'tetradic'
  | 'monochromatic'
  | 'neutral'
  | 'pastel'
  | 'deep';

export interface ColorHistory {
  color: ColorState;
  timestamp: number;
  starred?: boolean;
}

export interface ColorCollection {
  id: string;
  name: string;
  colors: ColorState[];
  createdAt: number;
  tags?: string[];
}

export interface StorageSchema {
  version: number;
  currentColor: ColorState;
  history: ColorHistory[];
  collections: ColorCollection[];
  preferences: {
    defaultFormat: ColorFormat;
    autoSave: boolean;
  };
}

export type ColorBlindnessType =
  | 'protanopia'
  | 'protanomaly'
  | 'deuteranopia'
  | 'deuteranomaly'
  | 'tritanopia'
  | 'tritanomaly'
  | 'achromatopsia'
  | 'achromatomaly';

export interface ContrastResult {
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  apca: number;
}
