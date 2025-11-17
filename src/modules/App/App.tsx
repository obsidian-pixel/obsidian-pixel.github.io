/// <reference types="react" />
import * as React from 'react';
const { useMemo, useState, useCallback, lazy, Suspense } = React;
import styles from './app.module.css';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { ScrollButton } from '../../components/ScrollButton/Scroll-Button';
import { SearchBar } from '../../components/SearchBar/Search-Bar';
import { Card, CardProps } from '../../components/Card/Card';

const Sidebar = lazy(() => import('../../components/Sidebar/Sidebar'));

export const App: React.FC = () => {
  const [query, setQuery] = useState('');

  const builds: CardProps[] = useMemo(
    () => [
      {
        title: 'Beast Mode GPT',
        meta: 'Prompt engineering',
        description:
          'Beast Mode defines the operational law set for an autonomous, research-driven, secure React development agent.',
        iframeSrc: 'https://obsidian-pixel.github.io/beastmodegpt/',
        liveUrl: 'https://obsidian-pixel.github.io/beastmodegpt/',
        stealUrl: 'https://github.com/obsidian-pixel/beastmodegpt',
      },
      {
        title: 'Minimal Login Flow',
        meta: 'HTML • AI Generated',
        description: 'Minimal AI generated login form.',
        iframeSrc: 'https://obsidian-pixel.github.io/simpleloginflow/',
        liveUrl: 'https://obsidian-pixel.github.io/simpleloginflow/',
        stealUrl: 'https://github.com/obsidian-pixel/simpleloginflow',
      },
      {
        title: 'Super Advanced Color Picker',
        meta: 'HTML • CSS • JS • AI Generated',
        description: 'Interactive color picker playground.',
        iframeSrc: 'https://obsidian-pixel.github.io/SACPaaS',
        liveUrl: 'https://obsidian-pixel.github.io/SACPaaS',
        stealUrl: 'https://github.com/obsidian-pixel/SACPaaS/',
      },
      {
        title: 'Super Advanced Icon Generator',
        meta: 'HTML • CSS • JS • AI Generated',
        description: 'Generate icon sets programmatically.',
        iframeSrc: 'https://obsidian-pixel.github.io/ai-icons-generator/',
        liveUrl: 'https://obsidian-pixel.github.io/ai-icons-generator/',
        stealUrl: 'https://github.com/obsidian-pixel/ai-icons-generator',
      },
      {
        title: 'Advanced Virality Marketing Agent',
        meta: 'Prompt engineering',
        description: 'Aggressive growth agent prompt.',
        iframeSrc: 'https://obsidian-pixel.github.io/marketingbeastgpt/',
        liveUrl: 'https://obsidian-pixel.github.io/marketingbeastgpt/',
        stealUrl: 'https://github.com/obsidian-pixel/marketingbeastgpt',
      },
      {
        title: 'Custom Scrollbar Templates',
        meta: 'CSS Styling Tool',
        description: 'Gallery with copy-paste CSS code. Create custom scrollbars with ease.',
        iframeSrc:
          'https://claude.site/public/artifacts/07e0f00f-ba4c-4bac-bc72-fba41eea15e6/embed',
        liveUrl:
          'https://claude.ai/public/artifacts/07e0f00f-ba4c-4bac-bc72-fba41eea15e6',
        stealUrl:
          'https://claude.ai/public/artifacts/07e0f00f-ba4c-4bac-bc72-fba41eea15e6',
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return builds.filter(
      (b) =>
        b.title.toLowerCase().includes(normalized) ||
        b.description.toLowerCase().includes(normalized) ||
        (b.meta ?? '').toLowerCase().includes(normalized)
    );
  }, [builds, query]);

  const onSearch = useCallback((value: string) => setQuery(value), []);

  return (
    <div className={styles.app}>
      <div className={styles.headerArea}>
        <Header />
      </div>
      <div className={styles.sidebarArea}>
        <Suspense fallback={<div>Loading sidebar...</div>}>
          <Sidebar />
        </Suspense>
      </div>
      <div className={`${styles.content} container`}>
        <SearchBar onSearch={onSearch} />
        <section id="builds" className={styles.grid} aria-label="Builds">
          {filtered.map((card: CardProps) => (
            <Card key={card.title} {...card} />
          ))}
        </section>
      </div>
      <div className={styles.footerArea}>
        <Footer />
      </div>
      <ScrollButton />
    </div>
  );
};