/// <reference types="react" />
import * as React from 'react';
import { SEO } from '../components/SEO/SEO';
import { createBreadcrumbSchema } from '../components/SEO/schemas';
import styles from './page.module.css';

export const ProjectsPage: React.FC = () => {
    const breadcrumbSchema = createBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Projects', url: '/projects' }
    ]);

    return (
        <div className={styles.page}>
            <SEO
                title="AI Projects & Frameworks"
                description="Explore cutting-edge AI projects, autonomous agent systems, and production-ready frameworks for modern AI development. Build the future with RAIDUIX."
                keywords={[
                    'AI projects',
                    'AI frameworks',
                    'autonomous agents',
                    'AI systems',
                    'AI development',
                    'machine learning projects',
                    'LLM applications'
                ]}
                path="/projects"
                type="website"
                schema={breadcrumbSchema}
            />
            
            <section className={styles.section}>
                <h1 className={styles.pageTitle}>Projects</h1>
                <p className={styles.pageDescription}>
                    Native applications built into RAIDUIX Vault
                </p>
                <div className={styles.comingSoon}>
                    <p>Native apps coming soon...</p>
                </div>
            </section>
        </div>
    );
};
