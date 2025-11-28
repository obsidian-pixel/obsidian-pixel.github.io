/// <reference types="react" />
import * as React from 'react';
import styles from './header.module.css';

const { memo } = React;
export const Header: React.FC = memo(function HeaderComponent() {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.logo} aria-label="Site logo">&gt; Obsidian-Pixel&apos;s Vault</div>
        <h1 className={styles.title}>RAIDUIX — Vault of tools, built by AI.</h1>
        <p className={styles.subtitle}>
          I build awesome things with AI. You steal it. We both win.
        </p>
        <div className={styles.actions}>
          <a className={styles.cta} href="/projects">Explore Projects</a>
          <div className={styles.links} aria-label="Social links">
            <span style={{ paddingRight: '12px' }}>Follow me:</span>
            <a href="https://x.com/raiduix" target="_blank" rel="noopener noreferrer">[X]</a>
            <a href="https://github.com/obsidian-pixel" target="_blank" rel="noopener noreferrer">[GitHub]</a>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;