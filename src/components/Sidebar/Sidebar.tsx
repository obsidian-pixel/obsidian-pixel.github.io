/// <reference types="react" />
import * as React from 'react';
const { useState, useCallback, memo } = React;
import styles from './sidebar.module.css';

const SidebarComponent: React.FC = memo(function SidebarComponent() {
  const [open, setOpen] = useState(false);
  const expanded = open;

  const toggleMenu = useCallback(() => {
    setOpen((prev: boolean) => !prev);
  }, []);
  const onEnter = useCallback(() => {}, []);
  const onLeave = useCallback(() => {}, []);

  return (
    <nav
      id="sidebar-nav"
      className={`${styles.sidebar} ${expanded ? styles.expanded : ''}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label="Sidebar navigation"
      data-expanded={expanded ? 'true' : undefined}
    >
      <div className={styles.header}>
        <div className={styles.logo}>RAIDUIX</div>
        <button
          className={styles.menuBtn}
          onClick={toggleMenu}
          aria-expanded={open}
          aria-controls="sidebar-nav"
          title={open ? 'Close menu' : 'Open menu'}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      <div className={styles.mainNav}>
        <a href="/" className={styles.link} aria-current="page" title="Home">
          <i aria-hidden="true" className={`fi-rr-home ${styles.icon}`}></i>
          <span className={styles.linkText}>Home</span>
        </a>
        <a href="/projects" className={styles.link} title="Projects">
          <i aria-hidden="true" className={`fi-rr-apps ${styles.icon}`}></i>
          <span className={styles.linkText}>Projects</span>
        </a>
        <a href="/prompts" className={styles.link} title="Prompt Library">
          <i aria-hidden="true" className={`fi-rr-document ${styles.icon}`}></i>
          <span className={styles.linkText}>Prompt Library</span>
        </a>
      </div>

      <div className={styles.socialLinks}>
        <a
          href="https://x.com/raiduix"
          className={styles.socialIcon}
          target="_blank"
          rel="noopener noreferrer"
          title="X (Twitter)"
        >
          <i aria-hidden="true" className="fi-brands-twitter"></i>
        </a>
        <a
          href="https://github.com/obsidian-pixel"
          className={styles.socialIcon}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <i aria-hidden="true" className="fi-brands-github"></i>
        </a>
      </div>
    </nav>
  );
});

const Sidebar = memo(SidebarComponent);
export default Sidebar;
