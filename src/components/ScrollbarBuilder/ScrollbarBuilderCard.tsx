import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ColorPicker/ColorPickerCard.module.css'; // Reusing existing card styles for consistency

export const ScrollbarBuilderCard: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/projects/scrollbar-builder');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('/projects/scrollbar-builder');
    }
  };

  return (
    <article
      className={styles.card}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Open Scrollbar Architect"
    >
      <div className={styles.preview}>
        <div className={styles.previewWheel} style={{ height: '200px', alignItems: 'center' }}>
          {/* Visual representation of a scrollbar */}
          <div
            style={{
              width: '50px',
              height: '160px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '25px',
              padding: '4px',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.3)',
              display: 'flex',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '60px',
                background: 'linear-gradient(180deg, #00ffff 0%, #0088ff 100%)',
                borderRadius: '20px',
                marginTop: '10px',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)',
              }}
            />
          </div>
        </div>
        <div className={styles.previewContent}>
          <h3 className={styles.title}>Scrollbar Architect</h3>
          <p className={styles.subtitle}>Advanced Scrollbar Studio</p>

          <div
            className={styles.colorDisplay}
            style={{
              background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2a2a 100%)',
              borderColor: 'rgba(255,255,255,0.1)',
            }}
          >
            <span className={styles.hexValue} style={{ fontSize: '14px', color: '#00ffff' }}>
              CSS • SCSS • Tailwind
            </span>
          </div>

          <div className={styles.expandBtn} aria-hidden="true">
            + Open App
          </div>
        </div>
      </div>
    </article>
  );
};
