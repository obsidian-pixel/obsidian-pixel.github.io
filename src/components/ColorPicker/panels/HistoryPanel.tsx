/**
 * ChromaForge Pro - History Panel
 * Recent color history from localStorage
 */

import * as React from 'react';
import styles from './HistoryPanel.module.css';
import type { ColorState } from '../types';
import { getHistory, clearHistory } from '../utils/colorStorage';

const { memo, useState, useEffect } = React;

interface HistoryPanelProps {
  onColorSelect: (color: ColorState) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = memo(({ onColorSelect }) => {
  const [history, setHistory] = useState<ColorState[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    setHistory(getHistory());
  };

  const handleClear = () => {
    if (confirm('Clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  // Listen for storage updates
  useEffect(() => {
    const interval = setInterval(loadHistory, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Colors</h3>
        {history.length > 0 && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear history"
          >
            Clear
          </button>
        )}
      </div>

      <div className={styles.grid}>
        {history.length === 0 ? (
          <p className={styles.empty}>No recent colors</p>
        ) : (
          history.slice(0, 20).map((color, index) => (
            <div
              key={index}
              className={styles.swatch}
              style={{ backgroundColor: color.hex }}
              onClick={() => onColorSelect(color)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onColorSelect(color);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Select color ${color.hex}`}
              title={color.hex}
            >
              <span className={styles.hexLabel}>{color.hex}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

HistoryPanel.displayName = 'HistoryPanel';
