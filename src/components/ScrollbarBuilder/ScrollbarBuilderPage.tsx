import React, { useState } from 'react';
import styles from './ScrollbarBuilderPage.module.css';
import { ScrollbarTheme, DEFAULT_SCROLLBAR_THEME } from './types';
import { ScrollbarPreview } from './ScrollbarPreview';
import { ScrollbarControls } from './ScrollbarControls';
import { CodeExportPanel } from './CodeExportPanel';

export const ScrollbarBuilderPage: React.FC = () => {
  const [theme, setTheme] = useState<ScrollbarTheme>(DEFAULT_SCROLLBAR_THEME);

  return (
    <div className={styles.container}>
      <div className={styles.controlsColumn}>
        <div className={styles.header}>
          <h1 className={styles.title}>Scrollbar Architect</h1>
          <p className={styles.subtitle}>Design advanced scrollbars</p>
        </div>
        <ScrollbarControls theme={theme} onChange={setTheme} />
      </div>

      <div className={styles.previewColumn}>
        <ScrollbarPreview theme={theme} />
      </div>

      <div className={styles.codeColumn}>
        <CodeExportPanel theme={theme} />
      </div>
    </div>
  );
};
