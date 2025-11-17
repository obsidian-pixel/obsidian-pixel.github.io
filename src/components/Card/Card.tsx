/// <reference types="react" />
import * as React from 'react';
import styles from './card.module.css';

export type CardProps = {
  title: string;
  meta?: string;
  description: string;
  iframeSrc: string;
  liveUrl: string;
  stealUrl: string;
};

const { memo, useState } = React;
export const Card: React.FC<CardProps> = memo(function CardComponent(props: CardProps) {
  const { title, meta, description, iframeSrc, liveUrl, stealUrl } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const iframeId = React.useMemo(() => `card-iframe-${title.replace(/\s+/g, '-').toLowerCase()}`, [title]);
  const toggleExpand = () => setExpanded((v) => !v);
  return (
    <>
      {expanded ? <div className={styles.backdrop} onClick={toggleExpand} aria-hidden="true" /> : null}
      <article className={`${styles.card} ${expanded ? styles.expanded : ''}`} role={expanded ? 'dialog' : undefined} aria-modal={expanded ? 'true' : undefined} aria-labelledby={expanded ? `${iframeId}-label` : undefined}>
        <div className={styles.img}>
          <iframe
            id={iframeId}
            src={iframeSrc}
            loading="lazy"
            title={title}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            referrerPolicy="no-referrer"
            allowFullScreen
          />
          <button type="button" className={styles.expandBtn} aria-label={expanded ? 'Collapse preview' : 'Expand preview'} aria-expanded={expanded ? 'true' : 'false'} aria-controls={iframeId} onClick={toggleExpand}>
            {expanded ? '− Minimize' : '+ Expand'}
          </button>
        </div>
        <div className={styles.content}>
          <h3 id={`${iframeId}-label`} className={styles.title}>{title}</h3>
          {meta ? <p className={styles.meta}>{meta}</p> : null}
          <p className={styles.desc}>{description}</p>
          <div className={styles.links}>
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>[Live]</a>
            <a href={stealUrl} target="_blank" rel="noopener noreferrer" className={styles.btn}>[Steal]</a>
          </div>
        </div>
      </article>
    </>
  );
});

Card.displayName = 'Card';