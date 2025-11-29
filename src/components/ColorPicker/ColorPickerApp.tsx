/**
 * ChromaForge Pro - Full Application Page
 * Dedicated route for color picker with advanced features
 */

import * as React from 'react';
import { SEO } from '../SEO/SEO';
import { createSoftwareApplicationSchema } from '../SEO/schemas';
import { useNavigate } from 'react-router-dom';
import styles from './ColorPickerApp.module.css';
import { useColorState } from './hooks/useColorState';
import { VibrantColorWheel } from './pickers/VibrantColorWheel';
import { LightnessSlider } from './pickers/LightnessSlider';
import { AlphaSlider } from './pickers/AlphaSlider';
import { ColorInputs } from './pickers/ColorInputs';
import { PalettePanel } from './panels/PalettePanel';
import { CollectionsPanel } from './panels/CollectionsPanel';
import { HistoryPanel } from './panels/HistoryPanel';
import { ImageExtractorPanel } from './panels/ImageExtractorPanel';
import { ContrastPanel } from './panels/ContrastPanel';
import { ExportPanel } from './panels/ExportPanel';
import { addToHistory } from './utils/colorStorage';
import { generatePalette } from './utils/paletteGenerator';
import type { ColorState, PaletteType } from './types';

const { memo, useEffect, useState, useRef } = React;

export const ColorPickerAppContent: React.FC = function ColorPickerApp() {
  const navigate = useNavigate();
  const { color, updateFromHex, updateFromRgb, updateFromHsl, updateFromHsv, setColor } =
    useColorState();

  const [currentPalette, setCurrentPalette] = useState<ColorState[]>([color]);
  const [paletteType, setPaletteType] = useState<PaletteType>('analogous');
  const [bgColor, setBgColor] = useState<ColorState>(color);
  const [lockedColors, setLockedColors] = useState<boolean[]>([]);

  // Ref to track if we are currently loading a collection to prevent auto-regeneration
  const isLoadingCollection = useRef(false);

  // Auto-save to history
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      addToHistory(color);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [color.hex]);

  // Regenerate palette when color or type changes
  useEffect(() => {
    if (isLoadingCollection.current) {
      isLoadingCollection.current = false;
      return;
    }
    const newPalette = generatePalette(color, paletteType, 5);

    setCurrentPalette((prev) => {
      if (lockedColors.some((locked) => locked)) {
        return newPalette.map((newColor, index) => {
          if (lockedColors[index] && prev[index]) {
            return prev[index];
          }
          return newColor;
        });
      }
      return newPalette;
    });
  }, [color, paletteType, lockedColors]); // Adding lockedColors to deps to ensure closure freshness, though logic mainly relies on color change triggering it.
  // Actually, if I add lockedColors to deps, toggling lock will trigger this.
  // If I toggle lock, I want the palette to stay same.
  // If I toggle lock, `generatePalette` runs with SAME color/type. Returns SAME palette.
  // Then we merge.
  // If I lock index 0. `prev[0]` is current color. `newPalette[0]` is current color. No change.
  // If I unlock index 0. `prev[0]` is current color. `newPalette[0]` is current color. No change.
  // So adding `lockedColors` to deps is safe and ensures correctness.

  const softwareSchema = createSoftwareApplicationSchema({
    name: 'ChromaForge Pro',
    description:
      'Advanced color picker with palette generation, image extraction, WCAG contrast, and code export.',
    url: 'https://obsidian-pixel.github.io/projects/colorpicker',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web Browser',
    offers: {
      price: '0',
      priceCurrency: 'USD',
    },
  });

  const handleLoadCollection = (colors: ColorState[]) => {
    if (colors.length > 0) {
      isLoadingCollection.current = true;
      setLockedColors(new Array(colors.length).fill(false));
      setColor(colors[0]);
      setCurrentPalette(colors);
    }
  };

  const handleImageColors = (colors: ColorState[]) => {
    if (colors.length > 0) {
      isLoadingCollection.current = true;
      setLockedColors(new Array(colors.length).fill(false));
      setColor(colors[0]);
      setCurrentPalette(colors);
    }
  };

  const handleToggleLock = (index: number) => {
    setLockedColors((prev) => {
      const newLocked = [...prev];
      // Ensure array is long enough
      while (newLocked.length < 5) newLocked.push(false);
      newLocked[index] = !newLocked[index];
      return newLocked;
    });
  };

  return (
    <div className={styles.page}>
      <SEO
        title="ChromaForge Pro - Advanced Color Picker"
        description="Professional color picker with palette generation, image color extraction, WCAG contrast checking, and code export."
        keywords={[
          'color picker',
          'palette generator',
          'image color extraction',
          'WCAG contrast',
          'CSS export',
          'Tailwind colors',
        ]}
        path="/projects/colorpicker"
        type="website"
        schema={softwareSchema}
      />

      <div className={styles.container}>
        <header className={styles.header}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate('/projects')}
            aria-label="Back"
          >
            ← Back
          </button>
          <div>
            <h1 className={styles.title}>ChromaForge Pro</h1>
          </div>
        </header>

        <main className={styles.mainContent}>
          <div className={styles.leftColumn}>
            <VibrantColorWheel
              hue={color.hsv.h}
              saturation={color.hsv.s}
              onChange={(h, s) => updateFromHsv({ ...color.hsv, h, s })}
              size={220}
            />

            <LightnessSlider
              hue={color.hsv.h}
              saturation={color.hsv.s}
              lightness={color.hsv.v}
              onChange={(v) => updateFromHsv({ ...color.hsv, v })}
            />

            <AlphaSlider
              color={color}
              alpha={(color.hsv.a || 1) * 100}
              onChange={(a) => updateFromHsv({ ...color.hsv, a: a / 100 })}
            />

            <ColorInputs
              color={color}
              onHexChange={updateFromHex}
              onRgbChange={updateFromRgb}
              onHslChange={updateFromHsl}
            />

            <div className={styles.formatDisplay}>
              <div className={styles.formatRow}>
                <span>HSV</span>
                <span>
                  {color.hsv.h}°, {color.hsv.s}%, {color.hsv.v}%
                </span>
              </div>
              <div className={styles.formatRow}>
                <span>OKLCH</span>
                <span>
                  {color.oklch.l.toFixed(2)}, {color.oklch.c.toFixed(2)}, {color.oklch.h.toFixed(1)}
                  °
                </span>
              </div>
              <div className={styles.formatRow}>
                <span>CMYK</span>
                <span>
                  {color.cmyk.c}%, {color.cmyk.m}%, {color.cmyk.y}%, {color.cmyk.k}%
                </span>
              </div>
            </div>

            <ContrastPanel foreground={color} background={bgColor} />
            <HistoryPanel onColorSelect={setColor} />
          </div>

          <div className={styles.rightColumn}>
            <ImageExtractorPanel onColorsExtracted={handleImageColors} onColorSelect={setColor} />

            <PalettePanel
              colors={currentPalette}
              selectedType={paletteType}
              onTypeChange={setPaletteType}
              onColorSelect={setColor}
              lockedColors={lockedColors}
              onToggleLock={handleToggleLock}
            />

            <ExportPanel colors={currentPalette} />

            <CollectionsPanel
              currentColors={currentPalette}
              onLoadCollection={handleLoadCollection}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export const ColorPickerApp = memo(ColorPickerAppContent);

ColorPickerApp.displayName = 'ColorPickerApp';
