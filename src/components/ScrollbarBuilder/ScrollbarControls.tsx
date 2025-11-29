import React from 'react';
import styles from './ScrollbarControls.module.css';
import { ScrollbarTheme, PRESETS } from './types';

interface ScrollbarControlsProps {
  theme: ScrollbarTheme;
  onChange: (theme: ScrollbarTheme) => void;
}

export const ScrollbarControls: React.FC<ScrollbarControlsProps> = ({ theme, onChange }) => {
  const updateTrack = (key: keyof ScrollbarTheme['track'], value: any) => {
    onChange({
      ...theme,
      track: { ...theme.track, [key]: value },
    });
  };

  const updateThumb = (key: keyof ScrollbarTheme['thumb'], value: any) => {
    onChange({
      ...theme,
      thumb: { ...theme.thumb, [key]: value },
    });
  };

  const loadPreset = (presetName: string) => {
    if (PRESETS[presetName]) {
      onChange(PRESETS[presetName]);
    }
  };

  const getPresetColor = (name: string) => {
    switch (name) {
      case 'neon':
        return {
          '--preset-color': '#00ffff',
          '--preset-glow': 'rgba(0, 255, 255, 0.5)',
        } as React.CSSProperties;
      case 'minimal':
        return {
          '--preset-color': '#ffffff',
          '--preset-glow': 'rgba(255, 255, 255, 0.2)',
        } as React.CSSProperties;
      case 'cyberpunk':
        return {
          '--preset-color': '#ff00ff',
          '--preset-glow': 'rgba(255, 0, 255, 0.5)',
        } as React.CSSProperties;
      default:
        return {};
    }
  };

  return (
    <div className={styles.container}>
      {/* Presets */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Quick Presets</h3>
        <div className={styles.presetGrid}>
          {Object.keys(PRESETS).map((name) => (
            <button
              key={name}
              className={styles.presetBtn}
              onClick={() => loadPreset(name)}
              style={getPresetColor(name)}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Track */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Track</h3>
        <div className={styles.controlGroup}>
          <div className={styles.fullWidth}>
            <label htmlFor="track-bg" className={styles.label}>
              Background Color
            </label>
            <div className={styles.colorInputWrapper}>
              <input
                id="track-bg"
                type="color"
                value={theme.track.background}
                onChange={(e) => updateTrack('background', e.target.value)}
                className={styles.colorPreview}
              />
              <input
                type="text"
                value={theme.track.background}
                onChange={(e) => updateTrack('background', e.target.value)}
                className={styles.colorText}
              />
            </div>
          </div>
          <div className={styles.fullWidth}>
            <label htmlFor="track-shadow" className={styles.label}>
              Shadow
            </label>
            <input
              id="track-shadow"
              type="text"
              value={theme.track.shadow}
              onChange={(e) => updateTrack('shadow', e.target.value)}
              className={styles.input}
              placeholder="e.g. inset 0 0 6px rgba(0,0,0,0.3)"
            />
          </div>
        </div>
      </div>

      {/* Thumb */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Thumb</h3>

        {/* Type Selector */}
        <div className={styles.typeSelector}>
          <button
            className={`${styles.typeBtn} ${theme.thumb.type === 'solid' ? styles.activeType : ''}`}
            onClick={() => updateThumb('type', 'solid')}
          >
            Solid
          </button>
          <button
            className={`${styles.typeBtn} ${theme.thumb.type === 'gradient' ? styles.activeType : ''}`}
            onClick={() => updateThumb('type', 'gradient')}
          >
            Gradient
          </button>
        </div>

        <div className={styles.controlGroup}>
          <div className={styles.fullWidth}>
            <label htmlFor="thumb-bg" className={styles.label}>
              {theme.thumb.type === 'solid' ? 'Background Color' : 'Gradient String'}
            </label>

            {theme.thumb.type === 'solid' ? (
              <div className={styles.colorInputWrapper}>
                <input
                  id="thumb-bg"
                  type="color"
                  value={theme.thumb.background}
                  onChange={(e) => updateThumb('background', e.target.value)}
                  className={styles.colorPreview}
                />
                <input
                  type="text"
                  value={theme.thumb.background}
                  onChange={(e) => updateThumb('background', e.target.value)}
                  className={styles.colorText}
                />
              </div>
            ) : (
              <input
                id="thumb-gradient"
                type="text"
                value={theme.thumb.gradient}
                onChange={(e) => updateThumb('gradient', e.target.value)}
                className={styles.input}
                placeholder="linear-gradient(...)"
              />
            )}
          </div>

          <div className={styles.fullWidth}>
            <label htmlFor="thumb-hover" className={styles.label}>
              Hover Color
            </label>
            <div className={styles.colorInputWrapper}>
              <input
                id="thumb-hover"
                type="color"
                value={theme.thumb.hoverBackground}
                onChange={(e) => updateThumb('hoverBackground', e.target.value)}
                className={styles.colorPreview}
              />
              <input
                type="text"
                value={theme.thumb.hoverBackground}
                onChange={(e) => updateThumb('hoverBackground', e.target.value)}
                className={styles.colorText}
              />
            </div>
          </div>

          <div>
            <label htmlFor="thumb-border" className={styles.label}>
              Border Color
            </label>
            <div className={styles.colorInputWrapper}>
              <input
                id="thumb-border"
                type="color"
                value={theme.thumb.border}
                onChange={(e) => updateThumb('border', e.target.value)}
                className={styles.colorPreview}
              />
              <input
                type="text"
                value={theme.thumb.border}
                onChange={(e) => updateThumb('border', e.target.value)}
                className={styles.colorText}
              />
            </div>
          </div>
          <div>
            <label htmlFor="thumb-border-width" className={styles.label}>
              Border Width ({theme.thumb.borderWidth}px)
            </label>
            <input
              id="thumb-border-width"
              type="number"
              min="0"
              max="5"
              value={theme.thumb.borderWidth}
              onChange={(e) => updateThumb('borderWidth', Number(e.target.value))}
              className={styles.input}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
