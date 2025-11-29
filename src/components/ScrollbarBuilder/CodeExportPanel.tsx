import React, { useState } from 'react';
import styles from './CodeExportPanel.module.css';
import { ScrollbarTheme } from './types';

interface CodeExportPanelProps {
  theme: ScrollbarTheme;
}

type ExportFormat = 'css' | 'tailwind' | 'scss';

export const CodeExportPanel: React.FC<CodeExportPanelProps> = ({ theme }) => {
  const [format, setFormat] = useState<ExportFormat>('css');
  const [copied, setCopied] = useState(false);

  const getThumbBackground = () => {
    return theme.thumb.type === 'solid' ? theme.thumb.background : theme.thumb.gradient;
  };

  const generateCSS = () => {
    return `/* Webkit Scrollbar */
::-webkit-scrollbar {
  width: ${theme.width}px;
  height: ${theme.width}px;
}

::-webkit-scrollbar-track {
  background: ${theme.track.background};
  border-radius: ${theme.borderRadius}px;
  box-shadow: ${theme.track.shadow};
}

::-webkit-scrollbar-thumb {
  background: ${getThumbBackground()};
  border-radius: ${theme.borderRadius}px;
  border: ${theme.thumb.borderWidth}px solid ${theme.thumb.border};
}

::-webkit-scrollbar-thumb:hover {
  background: ${theme.thumb.hoverBackground};
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: ${theme.thumb.type === 'solid' ? theme.thumb.background : 'auto'} ${theme.track.background};
}`;
  };

  const generateTailwind = () => {
    const thumbBg = getThumbBackground().replace(/ /g, '_');

    return `/* Tailwind CSS Plugin required: tailwind-scrollbar */
/* Or using arbitrary values (experimental) */

.scrollbar-custom::-webkit-scrollbar {
  @apply w-[${theme.width}px] h-[${theme.width}px];
}

.scrollbar-custom::-webkit-scrollbar-track {
  @apply bg-[${theme.track.background}] rounded-[${theme.borderRadius}px] shadow-[${theme.track.shadow.replace(/ /g, '_')}];
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  @apply bg-[${thumbBg}] rounded-[${theme.borderRadius}px] border-[${theme.thumb.borderWidth}px] border-[${theme.thumb.border}];
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  @apply bg-[${theme.thumb.hoverBackground}];
}`;
  };

  const generateSCSS = () => {
    return `@mixin custom-scrollbar {
  &::-webkit-scrollbar {
    width: ${theme.width}px;
    height: ${theme.width}px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.track.background};
    border-radius: ${theme.borderRadius}px;
    box-shadow: ${theme.track.shadow};
  }

  &::-webkit-scrollbar-thumb {
    background: ${getThumbBackground()};
    border-radius: ${theme.borderRadius}px;
    border: ${theme.thumb.borderWidth}px solid ${theme.thumb.border};
    
    &:hover {
      background: ${theme.thumb.hoverBackground};
    }
  }
}`;
  };

  const getCode = () => {
    switch (format) {
      case 'css':
        return generateCSS();
      case 'tailwind':
        return generateTailwind();
      case 'scss':
        return generateSCSS();
      default:
        return '';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${format === 'css' ? styles.activeTab : ''}`}
          onClick={() => setFormat('css')}
        >
          CSS
        </button>
        <button
          className={`${styles.tab} ${format === 'tailwind' ? styles.activeTab : ''}`}
          onClick={() => setFormat('tailwind')}
        >
          Tailwind
        </button>
        <button
          className={`${styles.tab} ${format === 'scss' ? styles.activeTab : ''}`}
          onClick={() => setFormat('scss')}
        >
          SCSS
        </button>
      </div>
      <pre className={styles.codeBlock}>{getCode()}</pre>
      <div className={styles.actions}>
        <button className={styles.copyButton} onClick={handleCopy}>
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
    </div>
  );
};
