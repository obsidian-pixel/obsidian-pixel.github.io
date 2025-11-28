/// <reference types="react" />
import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

const { memo } = React;
export const Footer: React.FC = memo(function FooterComponent() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>RAIDUIX Vault</h3>
            <p className={styles.footerDescription}>
              Advanced AI prompt engineering library with 500+ premium prompts for GPT-4, Claude, and LLM development.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <nav className={styles.footerNav}>
              <Link to="/" className={styles.footerLink}>Home</Link>
              <Link to="/prompts" className={styles.footerLink}>Prompt Library</Link>
              <Link to="/projects" className={styles.footerLink}>Projects</Link>
            </nav>
          </div>

          {/* Resources */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Resources</h4>
            <nav className={styles.footerNav}>
              <a href="https://github.com/obsidian-pixel" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                GitHub Repository
              </a>
              <a href="https://x.com/raiduix" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                X (Twitter)
              </a>
            </nav>
          </div>

          {/* Topics */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Topics</h4>
            <div className={styles.footerTopics}>
              <span className={styles.topic}>AI Prompts</span>
              <span className={styles.topic}>Prompt Engineering</span>
              <span className={styles.topic}>GPT-4</span>
              <span className={styles.topic}>Claude AI</span>
              <span className={styles.topic}>Chain-of-Thought</span>
              <span className={styles.topic}>Few-Shot Learning</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} RAIDUIX. Built for next-generation AI development.
          </p>
          <p className={styles.tagline}>&gt; Steal. Improve. Tag @RAIDUIX.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;