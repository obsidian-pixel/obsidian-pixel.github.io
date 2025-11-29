/**
 * ChromaForge Pro - Card Component
 * Clickable card that links to dedicated color picker route
 * Mobile-first responsive design
 */

import { memo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ColorPickerCard.module.css';
import { VibrantColorWheel } from './pickers/VibrantColorWheel';

export const ColorPickerCard: React.FC = memo(function ColorPickerCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const defaultColor = {
    h: 180,
    s: 100,
    v: 100,
    a: 1,
  };

  const handleClick = () => {
    navigate('/projects/colorpicker');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('/projects/colorpicker');
    }
  };

  return (
    <article
      ref={cardRef}
      className={styles.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Open ChromaForge Pro Color Picker"
    >
      <div className={styles.preview}>
        <div className={styles.previewWheel}>
          <VibrantColorWheel
            hue={defaultColor.h}
            saturation={defaultColor.s}
            onChange={() => {}}
            size={200}
          />
        </div>
        <div className={styles.previewContent}>
          <h3 className={styles.title}>ChromaForge Pro</h3>
          <p className={styles.subtitle}>Advanced Color Intelligence Studio</p>
          <div className={styles.colorDisplay} style={{ backgroundColor: '#00ffff' }}>
            <span className={styles.hexValue}>#00ffff</span>
          </div>
          <div className={styles.expandBtn} aria-hidden="true">
            + Open App
          </div>
        </div>
      </div>
    </article>
  );
});

ColorPickerCard.displayName = 'ColorPickerCard';
