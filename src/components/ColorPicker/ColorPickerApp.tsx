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
import { ColorWheel } from './pickers/ColorWheel';
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

export const ColorPickerApp: React.FC = memo(function ColorPickerApp() {
  const navigate = useNavigate();
  const { color, updateFromHex, updateFromRgb, updateFromHsl, updateFromHsv, setColor } =
    useColorState();

  const [currentPalette, setCurrentPalette] = useState<ColorState[]>([color]);
  const [paletteType, setPaletteType] = useState<PaletteType>('analogous');
  const [bgColor, setBgColor] = useState<ColorState>(color);

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
    setCurrentPalette(newPalette);
  }, [color, paletteType]);

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
      setColor(colors[0]);
      setCurrentPalette(colors);
    }
  };

  const handleImageColors = (colors: ColorState[]) => {
    if (colors.length > 0) {
      isLoadingCollection.current = true;
      setColor(colors[0]);
      setCurrentPalette(colors);
    }
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
            <ColorWheel hsv={color.hsv} onChange={updateFromHsv} size={220} />

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
            <ImageExtractorPanel onColorsExtracted={handleImageColors} />

            <PalettePanel
              colors={currentPalette}
              selectedType={paletteType}
              onTypeChange={setPaletteType}
              onColorSelect={setColor}
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
});

ColorPickerApp.displayName = 'ColorPickerApp';
