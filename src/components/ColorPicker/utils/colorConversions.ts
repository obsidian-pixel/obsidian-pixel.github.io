/**
 * ChromaForge Pro - Color Conversion Engine
 * High-performance, zero-dependency color format conversions
 * All inputs are sanitized for security
 */

import type { RGB, HSL, HSV, HWB, OKLCH, LAB, CMYK } from '../types';

/**
 * Clamp a number between min and max
 */
function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Sanitize and parse HEX color
 */
export function sanitizeHex(hex: string): string {
  // Remove any non-hex characters and hash
  const cleaned = hex.replace(/[^0-9A-Fa-f]/g, '');

  // Support 3, 4, 6, 8 character hex
  if (cleaned.length === 3) {
    return (
      '#' +
      cleaned
        .split('')
        .map((c) => c + c)
        .join('')
    );
  }
  if (cleaned.length === 4) {
    return (
      '#' +
      cleaned
        .split('')
        .map((c) => c + c)
        .join('')
    );
  }
  if (cleaned.length === 6 || cleaned.length === 8) {
    return '#' + cleaned;
  }

  // Default to black if invalid
  return '#000000';
}

/**
 * Convert HEX to RGB
 */
export function hexToRgb(hex: string): RGB {
  const sanitized = sanitizeHex(hex);
  const value = sanitized.substring(1);

  const r = parseInt(value.substring(0, 2), 16);
  const g = parseInt(value.substring(2, 4), 16);
  const b = parseInt(value.substring(4, 6), 16);
  const a = value.length === 8 ? parseInt(value.substring(6, 8), 16) / 255 : 1;

  return { r, g, b, a };
}

/**
 * Convert RGB to HEX
 */
export function rgbToHex(rgb: RGB): string {
  const r = clamp(Math.round(rgb.r), 0, 255);
  const g = clamp(Math.round(rgb.g), 0, 255);
  const b = clamp(Math.round(rgb.b), 0, 255);

  const hex =
    '#' +
    [r, g, b]
      .map((x) => {
        const h = x.toString(16);
        return h.length === 1 ? '0' + h : h;
      })
      .join('');

  if (rgb.a !== undefined && rgb.a < 1) {
    const alpha = Math.round(rgb.a * 255)
      .toString(16)
      .padStart(2, '0');
    return hex + alpha;
  }

  return hex;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: rgb.a,
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsl.a,
  };
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(rgb: RGB): HSV {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / delta + 2) / 6;
        break;
      case b:
        h = ((r - g) / delta + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a: rgb.a,
  };
}

/**
 * Convert HSV to RGB
 */
export function hsvToRgb(hsv: HSV): RGB {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;

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

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsv.a,
  };
}

/**
 * Convert RGB to HWB
 */
export function rgbToHwb(rgb: RGB): HWB {
  const hsv = rgbToHsv(rgb);
  const w = ((100 - hsv.s) * hsv.v) / 100;
  const b = 100 - hsv.v;

  return {
    h: hsv.h,
    w: Math.round(w),
    b: Math.round(b),
    a: rgb.a,
  };
}

/**
 * Convert HWB to RGB
 */
export function hwbToRgb(hwb: HWB): RGB {
  const w = hwb.w / 100;
  const b = hwb.b / 100;

  let sum = w + b;
  if (sum > 1) {
    const wN = w / sum;
    const bN = b / sum;
    const v = 1 - bN;
    const s = v === 0 ? 0 : 1 - wN / v;

    return hsvToRgb({
      h: hwb.h,
      s: s * 100,
      v: v * 100,
      a: hwb.a,
    });
  }

  const v = 1 - b;
  const s = v === 0 ? 0 : 1 - w / v;

  return hsvToRgb({
    h: hwb.h,
    s: s * 100,
    v: v * 100,
    a: hwb.a,
  });
}

/**
 * Convert RGB to CMYK
 */
export function rgbToCmyk(rgb: RGB): CMYK {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = 1 - Math.max(r, g, b);

  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Convert CMYK to RGB
 */
export function cmykToRgb(cmyk: CMYK): RGB {
  const c = cmyk.c / 100;
  const m = cmyk.m / 100;
  const y = cmyk.y / 100;
  const k = cmyk.k / 100;

  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);

  return {
    r: Math.round(r),
    g: Math.round(g),
    b: Math.round(b),
  };
}

/**
 * Convert RGB to LAB (D65 illuminant)
 */
export function rgbToLab(rgb: RGB): LAB {
  // First convert RGB to XYZ
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // Apply gamma correction
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert to XYZ
  let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) * 100;
  let y = (r * 0.2126729 + g * 0.7151522 + b * 0.072175) * 100;
  let z = (r * 0.0193339 + g * 0.119192 + b * 0.9503041) * 100;

  // Normalize for D65
  x = x / 95.047;
  y = y / 100.0;
  z = z / 108.883;

  // Convert XYZ to LAB
  const fx = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
  const fy = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
  const fz = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

  const l = 116 * fy - 16;
  const a = 500 * (fx - fy);
  const bVal = 200 * (fy - fz);

  return {
    l: Math.round(l * 100) / 100,
    a: Math.round(a * 100) / 100,
    b: Math.round(bVal * 100) / 100,
    alpha: rgb.a,
  };
}

/**
 * Convert LAB to RGB
 */
export function labToRgb(lab: LAB): RGB {
  let y = (lab.l + 16) / 116;
  let x = lab.a / 500 + y;
  let z = y - lab.b / 200;

  // Convert to XYZ
  x = x > 0.206897 ? Math.pow(x, 3) : (x - 16 / 116) / 7.787;
  y = y > 0.206897 ? Math.pow(y, 3) : (y - 16 / 116) / 7.787;
  z = z > 0.206897 ? Math.pow(z, 3) : (z - 16 / 116) / 7.787;

  x = x * 95.047;
  y = y * 100.0;
  z = z * 108.883;

  // Convert XYZ to RGB
  x = x / 100;
  y = y / 100;
  z = z / 100;

  let r = x * 3.2404542 + y * -1.5371385 + z * -0.4985314;
  let g = x * -0.969266 + y * 1.8760108 + z * 0.041556;
  let b = x * 0.0556434 + y * -0.2040259 + z * 1.0572252;

  // Apply gamma correction
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b = b > 0.0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - 0.055 : 12.92 * b;

  return {
    r: clamp(Math.round(r * 255), 0, 255),
    g: clamp(Math.round(g * 255), 0, 255),
    b: clamp(Math.round(b * 255), 0, 255),
    a: lab.alpha,
  };
}

/**
 * Convert RGB to OKLCH (perceptually uniform)
 */
export function rgbToOklch(rgb: RGB): OKLCH {
  // Linear RGB
  let r = rgb.r / 255;
  let g = rgb.g / 255;
  let b = rgb.b / 255;

  // sRGB to linear
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Linear RGB to OKLab
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const lCube = Math.cbrt(l);
  const mCube = Math.cbrt(m);
  const sCube = Math.cbrt(s);

  const L = 0.2104542553 * lCube + 0.793617785 * mCube - 0.0040720468 * sCube;
  const a = 1.9779984951 * lCube - 2.428592205 * mCube + 0.4505937099 * sCube;
  const bOk = 0.0259040371 * lCube + 0.7827717662 * mCube - 0.808675766 * sCube;

  // Convert to LCH
  const C = Math.sqrt(a * a + bOk * bOk);
  let H = (Math.atan2(bOk, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return {
    l: Math.round(L * 1000) / 1000,
    c: Math.round(C * 1000) / 1000,
    h: Math.round(H * 10) / 10,
    a: rgb.a,
  };
}

/**
 * Convert OKLCH to RGB
 */
export function oklchToRgb(oklch: OKLCH): RGB {
  const { l: L, c: C, h: H } = oklch;

  // Convert LCH to Lab
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // OKLab to linear RGB
  const lCube = L + 0.3963377774 * a + 0.2158037573 * b;
  const mCube = L - 0.1055613458 * a - 0.0638541728 * b;
  const sCube = L - 0.0894841775 * a - 1.291485548 * b;

  const l = lCube * lCube * lCube;
  const m = mCube * mCube * mCube;
  const s = sCube * sCube * sCube;

  let r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
  let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  let bVal = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  // Linear to sRGB
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  bVal = bVal > 0.0031308 ? 1.055 * Math.pow(bVal, 1 / 2.4) - 0.055 : 12.92 * bVal;

  return {
    r: clamp(Math.round(r * 255), 0, 255),
    g: clamp(Math.round(g * 255), 0, 255),
    b: clamp(Math.round(bVal * 255), 0, 255),
    a: oklch.a,
  };
}
