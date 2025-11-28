import * as React from 'react';
import styles from './page.module.css';
import { PromptCard } from '../components/PromptCard/PromptCard';
import { SearchBar } from '../components/SearchBar/Search-Bar';
import { PROMPTS_DATA, PromptDef } from '../data/prompts-data';

const { useMemo, useState, useCallback } = React;

const ITEMS_PER_PAGE = 6;

export const PromptLibraryPage: React.FC = () => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const categories = useMemo(() => {
        const cats = Array.from(new Set(PROMPTS_DATA.map(p => p.category)));
        return ['All', ...cats];
    }, []);

    const filtered = useMemo(() => {
        let result = PROMPTS_DATA;

        // Category Filter
        if (selectedCategory !== 'All') {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Search Filter
        const normalized = query.trim().toLowerCase();
        if (normalized) {
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(normalized) ||
                    p.description.toLowerCase().includes(normalized) ||
                    (p.tags ?? []).some((tag) => tag.toLowerCase().includes(normalized))
            );
        }

        return result;
    }, [query, selectedCategory]);

    const visiblePrompts = useMemo(() => {
        return filtered.slice(0, visibleCount);
    }, [filtered, visibleCount]);

    const onSearch = useCallback((value: string) => {
        setQuery(value);
        setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on search
    }, []);

    const onCategorySelect = useCallback((category: string) => {
        setSelectedCategory(category);
        setVisibleCount(ITEMS_PER_PAGE); // Reset pagination on category change
    }, []);

    const loadMore = useCallback(() => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    }, []);

    // Sticky detection for glassmorphism effect
    const controlsRef = React.useRef<HTMLDivElement>(null);
    const sentinelRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const sentinel = sentinelRef.current;
        const controls = controlsRef.current;

        if (!sentinel || !controls) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.classList.remove('is-stuck');
                    console.log('Controls unstuck - removed is-stuck class');
                } else {
                    controls.classList.add('is-stuck');
                    console.log('Controls stuck - added is-stuck class');
                }
            },
            { threshold: [1] }
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.page}>
            <section className={styles.section}>
                <h1 className={styles.pageTitle}>Prompt Library</h1>
                <p className={styles.pageDescription}>
                    Curated collection of engineered prompts for AI development
                </p>

                {/* Sentinel element for sticky detection */}
                <div ref={sentinelRef} style={{ height: '1px', marginTop: '-1px' }} />

                <div ref={controlsRef} className={styles.controls}>
                    <SearchBar onSearch={onSearch} />
                    <div className={styles.categories}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
                                onClick={() => onCategorySelect(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.promptGrid}>
                    {visiblePrompts.map((prompt) => (
                        <PromptCard key={prompt.id} {...prompt} />
                    ))}
                </div>

                {visibleCount < filtered.length && (
                    <div className={styles.loadMoreContainer}>
                        <button className={styles.loadMoreBtn} onClick={loadMore}>
                            Load More
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};
