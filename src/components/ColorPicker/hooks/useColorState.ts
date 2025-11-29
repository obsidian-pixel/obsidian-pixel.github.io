/**
 * ChromaForge Pro - Color State Management Hook
 * Centralized state with synchronized format updates
 */

import { useState, useCallback, useMemo } from 'react';
import type { ColorState } from '../types';
import * as conv from '../utils/colorConversions';

const DEFAULT_COLOR: ColorState = {
  hex: '#00ffff',
  rgb: { r: 0, g: 255, b: 255, a: 1 },
  hsl: { h: 180, s: 100, l: 50, a: 1 },
  hsv: { h: 180, s: 100, v: 100, a: 1 },
  hwb: { h: 180, w: 0, b: 0, a: 1 },
  oklch: { l: 0.905, c: 0.151, h: 194.8, a: 1 },
  lab: { l: 91.11, a: -48.08, b: -14.13, alpha: 1 },
  cmyk: { c: 100, m: 0, y: 0, k: 0 },
};

export function useColorState(initialColor?: ColorState) {
  const [color, setColor] = useState<ColorState>(initialColor || DEFAULT_COLOR);

  const updateFromRgb = useCallback((rgb: typeof color.rgb) => {
    setColor({
      hex: conv.rgbToHex(rgb),
      rgb,
      hsl: conv.rgbToHsl(rgb),
      hsv: conv.rgbToHsv(rgb),
      hwb: conv.rgbToHwb(rgb),
      oklch: conv.rgbToOklch(rgb),
      lab: conv.rgbToLab(rgb),
      cmyk: conv.rgbToCmyk(rgb),
    });
  }, []);

  const updateFromHex = useCallback(
    (hex: string) => {
      const rgb = conv.hexToRgb(hex);
      updateFromRgb(rgb);
    },
    [updateFromRgb]
  );

  const updateFromHsl = useCallback(
    (hsl: typeof color.hsl) => {
      const rgb = conv.hslToRgb(hsl);
      updateFromRgb(rgb);
    },
    [updateFromRgb]
  );

  const updateFromHsv = useCallback(
    (hsv: typeof color.hsv) => {
      const rgb = conv.hsvToRgb(hsv);
      updateFromRgb(rgb);
    },
    [updateFromRgb]
  );

  const updateFromHwb = useCallback(
    (hwb: typeof color.hwb) => {
      const rgb = conv.hwbToRgb(hwb);
      updateFromRgb(rgb);
    },
    [updateFromRgb]
  );

  const updateFromOklch = useCallback(
    (oklch: typeof color.oklch) => {
      const rgb = conv.oklchToRgb(oklch);
      updateFromRgb(rgb);
    },
    [updateFromRgb]
  );

  const updateFromLab = useCallback(
    (lab: typeof color.lab) => {
      const rgb = conv.labToRgb(lab);
      updateFromRgb(rgb);
    },
    [updateFromRgb]
  );

  const updateFromCmyk = useCallback(
    (cmyk: typeof color.cmyk) => {
      const rgb = conv.cmykToRgb(cmyk);
      updateFromRgb(rgb);
    },
    [updateFromRgb]
  );

  return useMemo(
    () => ({
      color,
      updateFromRgb,
      updateFromHex,
      updateFromHsl,
      updateFromHsv,
      updateFromHwb,
      updateFromOklch,
      updateFromLab,
      updateFromCmyk,
      setColor,
    }),
    [
      color,
      updateFromRgb,
      updateFromHex,
      updateFromHsl,
      updateFromHsv,
      updateFromHwb,
      updateFromOklch,
      updateFromLab,
      updateFromCmyk,
    ]
  );
}
