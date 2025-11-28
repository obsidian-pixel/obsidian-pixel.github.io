import * as React from 'react';
import { Link } from 'react-router-dom';
import styles from './home.module.css';

export const HomePage: React.FC = () => {
  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Architect the Future of <br />
            Intelligent Systems
          </h1>
          <p className={styles.heroSubtitle}>
            Access a curated vault of elite prompts, autonomous agent frameworks,
            and cognitive architectures designed for the next generation of AI development.
          </p>
          <div className={styles.ctaGroup}>
            <Link to="/prompts" className={styles.primaryBtn}>
              Explore Library
              <i className="fi-rr-arrow-right"></i>
            </Link>
            <a href="https://github.com/obsidian-pixel" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              <i className="fi-brands-github"></i>
              View Source
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className={styles.socialProof}>
        <h3 className={styles.proofTitle}>Powering Next-Gen Development</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>500+</span>
            <span className={styles.statLabel}>Premium Prompts</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>10k+</span>
            <span className={styles.statLabel}>Developers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>99%</span>
            <span className={styles.statLabel}>Satisfaction</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Engineered for Excellence</h2>
          <p className={styles.heroSubtitle}>
            Everything you need to craft, optimize, and deploy world-class AI prompts.
          </p>
        </div>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fi-rr-brain"></i>
            </div>
            <h3 className={styles.featureTitle}>Advanced Prompt Engineering</h3>
            <p className={styles.featureDesc}>
              Chain-of-Thought, Few-Shot learning, and cognitive frameworks that unlock AI's full potential.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fi-rr-shield-check"></i>
            </div>
            <h3 className={styles.featureTitle}>Security & Safety</h3>
            <p className={styles.featureDesc}>
              Prompt injection defenses, input validation, and safety protocols built into every template.
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <i className="fi-rr-rocket-lunch"></i>
            </div>
            <h3 className={styles.featureTitle}>Production-Ready</h3>
            <p className={styles.featureDesc}>
              Copy-paste ready prompts with detailed context, examples, and output formatting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
