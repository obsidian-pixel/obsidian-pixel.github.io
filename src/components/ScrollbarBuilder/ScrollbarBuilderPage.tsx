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
      <div className={styles.controlsPanel}>
        <div className={styles.header}>
          <h1 className={styles.title}>Scrollbar Architect</h1>
          <p className={styles.subtitle}>Design advanced scrollbars for any framework</p>
        </div>

        <ScrollbarControls theme={theme} onChange={setTheme} />
        <CodeExportPanel theme={theme} />
      </div>

      <div className={styles.previewPanel}>
        <ScrollbarPreview theme={theme} />
      </div>
    </div>
  );
};
