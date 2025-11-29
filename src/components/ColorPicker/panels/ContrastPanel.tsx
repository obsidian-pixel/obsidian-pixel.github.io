/**
 * ChromaForge Pro - Contrast Checker Panel
 * WCAG contrast ratio calculator
 */

import { memo } from 'react';
import styles from './ContrastPanel.module.css';
import type { ColorState } from '../types';
import { getContrastRatio, checkWCAGCompliance } from '../utils/contrastChecker';

interface ContrastPanelProps {
  foreground: ColorState;
  background: ColorState;
}

export const ContrastPanel: React.FC<ContrastPanelProps> = memo(({ foreground, background }) => {
  const ratio = getContrastRatio(foreground.rgb, background.rgb);
  const compliance = checkWCAGCompliance(ratio);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Contrast Checker</h3>

      <div className={styles.preview}>
        <div
          className={styles.sample}
          style={{ backgroundColor: background.hex, color: foreground.hex }}
        >
          <span className={styles.sampleText}>Aa</span>
        </div>
      </div>

      <div className={styles.ratio}>
        <span className={styles.ratioLabel}>Contrast Ratio</span>
        <span className={styles.ratioValue}>{ratio.toFixed(2)}:1</span>
      </div>

      <div className={styles.compliance}>
        <div className={styles.level}>
          <span className={styles.levelName}>WCAG AA</span>
          <div className={styles.levelTests}>
            <div className={`${styles.test} ${compliance.aa.normal ? styles.pass : styles.fail}`}>
              <span>Normal Text</span>
              <span>{compliance.aa.normal ? '✓' : '✕'}</span>
            </div>
            <div className={`${styles.test} ${compliance.aa.large ? styles.pass : styles.fail}`}>
              <span>Large Text</span>
              <span>{compliance.aa.large ? '✓' : '✕'}</span>
            </div>
          </div>
        </div>

        <div className={styles.level}>
          <span className={styles.levelName}>WCAG AAA</span>
          <div className={styles.levelTests}>
            <div className={`${styles.test} ${compliance.aaa.normal ? styles.pass : styles.fail}`}>
              <span>Normal Text</span>
              <span>{compliance.aaa.normal ? '✓' : '✕'}</span>
            </div>
            <div className={`${styles.test} ${compliance.aaa.large ? styles.pass : styles.fail}`}>
              <span>Large Text</span>
              <span>{compliance.aaa.large ? '✓' : '✕'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ContrastPanel.displayName = 'ContrastPanel';
