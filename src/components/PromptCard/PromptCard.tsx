/// <reference types="react" />
import * as React from 'react';
import styles from './prompt-card.module.css';

export interface PromptCardProps {
    title: string;
    version?: string;
    description: string;
    tags?: string[];
    content: string;
}

const { useState, memo } = React;

import { Modal } from '../Modal/Modal';

export const PromptCard: React.FC<PromptCardProps> = memo(function PromptCard({
    title,
    version,
    description,
    tags,
    content,
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <>
            <article className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.titleRow}>
                        <h3 className={styles.title}>{title}</h3>
                        {version && <span className={styles.version}>{version}</span>}
                    </div>
                    <p className={styles.description}>{description}</p>
                    {tags && tags.length > 0 && (
                        <div className={styles.tags}>
                            {tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.actions}>
                    <button className={styles.btn} onClick={openModal}>
                        View Details
                    </button>
                    <button
                        className={`${styles.btn} ${copied ? styles.copied : ''}`}
                        onClick={copyToClipboard}
                    >
                        {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </button>
                </div>
            </article>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={title}>
                <div className={styles.modalHeader}>
                    <div className={styles.titleRow}>
                        <h2 className={styles.title}>{title}</h2>
                        {version && <span className={styles.version}>{version}</span>}
                    </div>
                    <p className={styles.description}>{description}</p>
                </div>

                <div className={styles.modalActions}>
                    <button
                        className={`${styles.btn} ${copied ? styles.copied : ''}`}
                        onClick={copyToClipboard}
                    >
                        {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                    </button>
                </div>

                <div className={styles.content}>
                    <pre className={styles.code}>{content}</pre>
                </div>
            </Modal>
        </>
    );
});
