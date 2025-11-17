/// <reference types="react" />
import * as React from 'react';
import styles from './footer.module.css';

const { memo } = React;
export const Footer: React.FC = memo(function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.tagline}>&gt; Steal. Improve. Tag @RAIDUIX.</p>
        <div className={styles.links}>
          <a href="https://x.com/raiduix" target="_blank" rel="noopener noreferrer">[X]</a>
          <a href="https://github.com/obsidian-pixel" target="_blank" rel="noopener noreferrer">[GitHub]</a>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;