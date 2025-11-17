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

      <div className={styles.section}>
        <div className={styles.title}>Navigation</div>
        <a href="#home" className={styles.link} aria-current="page">
          <i aria-hidden="true" className={`fi-rr-home ${styles.icon}`}></i>
          <span className={styles.linkText}>Home</span>
        </a>
        <a href="#projects" className={styles.link}>
          <i aria-hidden="true" className={`fi-rr-apps ${styles.icon}`}></i>
          <span className={styles.linkText}>Projects</span>
        </a>
        <a href="#about" className={styles.link}>
          <i aria-hidden="true" className={`fi-rr-info ${styles.icon}`}></i>
          <span className={styles.linkText}>About</span>
        </a>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Tools</div>
        <a href="#beastmode" className={styles.link}>
          <i aria-hidden="true" className={`fi-rr-code ${styles.icon}`}></i>
          <span className={styles.linkText}>Beast Mode GPT</span>
        </a>
        <a href="#colorpicker" className={styles.link}>
          <i aria-hidden="true" className={`fi-rr-palette ${styles.icon}`}></i>
          <span className={styles.linkText}>Color Picker</span>
        </a>
        <a href="#icons" className={styles.link}>
          <i aria-hidden="true" className={`fi-rr-picture ${styles.icon}`}></i>
          <span className={styles.linkText}>Icon Generator</span>
        </a>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Connect</div>
        <a href="https://x.com/raiduix" className={styles.link} target="_blank" rel="noopener noreferrer">
          <i aria-hidden="true" className={`fi-brands-twitter ${styles.icon}`}></i>
          <span className={styles.linkText}>Twitter/X</span>
        </a>
        <a href="https://github.com/obsidian-pixel" className={styles.link} target="_blank" rel="noopener noreferrer">
          <i aria-hidden="true" className={`fi-brands-github ${styles.icon}`}></i>
          <span className={styles.linkText}>GitHub</span>
        </a>
      </div>
    </nav>
  );
});

const Sidebar = memo(SidebarComponent);
export default Sidebar;