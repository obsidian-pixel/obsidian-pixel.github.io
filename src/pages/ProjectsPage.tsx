/// <reference types="react" />
import * as React from 'react';
import styles from './page.module.css';

export const ProjectsPage: React.FC = () => {
    return (
        <div className={styles.page}>
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
