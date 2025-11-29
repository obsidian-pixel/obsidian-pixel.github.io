/**
 * ChromaForge Pro - Export Panel
 * Export colors in multiple formats (CSS, Tailwind, JSON, etc.)
 */

import * as React from 'react';
import styles from './ExportPanel.module.css';
import type { ColorState } from '../types';

const { memo, useState } = React;

interface ExportPanelProps {
  colors: ColorState[];
}

type ExportFormat = 'css' | 'tailwind' | 'scss' | 'json' | 'hex';

export const ExportPanel: React.FC<ExportPanelProps> = memo(({ colors }) => {
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const generateExport = (): string => {
    if (colors.length === 0) return '';

    switch (format) {
      case 'css':
        return generateCSSVariables(colors);
      case 'tailwind':
        return generateTailwindConfig(colors);
      case 'scss':
        return generateSCSSVariables(colors);
      case 'json':
        return generateJSON(colors);
      case 'hex':
        return generateRawHex(colors);
      default:
        return '';
    }
  };

  const handleCopy = () => {
    const code = generateExport();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCode = generateExport();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Export Code</h3>
        <button
          type="button"
          onClick={handleCopy}
          className={styles.copyBtn}
          disabled={!exportCode}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>

      <div className={styles.formats}>
        {(['css', 'tailwind', 'scss', 'json', 'hex'] as ExportFormat[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFormat(f)}
            className={`${styles.formatBtn} ${format === f ? styles.active : ''}`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className={styles.codeBlock}>
        <pre className={styles.code}>{exportCode || 'No colors to export'}</pre>
      </div>
    </div>
  );
});

ExportPanel.displayName = 'ExportPanel';

/**
 * Generate CSS custom properties
 */
function generateCSSVariables(colors: ColorState[]): string {
  const vars = colors
    .map((color, i) => {
      const { r, g, b } = color.rgb;
      return `  --color-${i + 1}: ${color.hex};\n  --color-${i + 1}-rgb: ${r}, ${g}, ${b};`;
    })
    .join('\n');
  return `:root {\n${vars}\n}`;
}

/**
 * Generate Tailwind config (Object format)
 */
function generateTailwindConfig(colors: ColorState[]): string {
  const colorObj = colors.reduce(
    (acc, color, i) => {
      acc[`brand-${i + 1}`] = color.hex;
      return acc;
    },
    {} as Record<string, string>
  );

  return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(colorObj, null, 6).replace(/"/g, "'")}
    }
  }
}`;
}

/**
 * Generate SCSS variables
 */
function generateSCSSVariables(colors: ColorState[]): string {
  return colors.map((color, i) => `$color-${i + 1}: ${color.hex};`).join('\n');
}

/**
 * Generate JSON format
 */
function generateJSON(colors: ColorState[]): string {
  return JSON.stringify(
    colors.map((c, i) => ({
      name: `color-${i + 1}`,
      hex: c.hex,
      rgb: c.rgb,
      hsl: c.hsl,
    })),
    null,
    2
  );
}

/**
 * Generate Raw Hex List
 */
function generateRawHex(colors: ColorState[]): string {
  return colors.map((c) => c.hex).join('\n');
}
