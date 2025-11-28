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

const { memo, useState, useRef, useEffect } = React;
export const Card: React.FC<CardProps> = memo(function CardComponent(props: CardProps) {
  const { title, meta, description, iframeSrc, liveUrl, stealUrl } = props;
  const [expanded, setExpanded] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [shadowStyle, setShadowStyle] = useState<string>('');
  const iframeId = React.useMemo(() => `card-iframe-${title.replace(/\s+/g, '-').toLowerCase()}`, [title]);
  const toggleExpand = () => setExpanded((v) => !v);

  useEffect(() => {
    let animationFrameId: number;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetShadowX = 0;
    let targetShadowY = 0;
    let currentShadowX = 0;
    let currentShadowY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.pageX;
      targetMouseY = e.pageY;
    };

    const updateShadow = () => {
      if (!cardRef.current) {
        animationFrameId = requestAnimationFrame(updateShadow);
        return;
      }

      // Smooth mouse position
      currentMouseX += (targetMouseX - currentMouseX) * 0.1;
      currentMouseY += (targetMouseY - currentMouseY) * 0.1;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate vector from card center to cursor
      const dx = currentMouseX - centerX;
      const dy = currentMouseY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Normalize direction and calculate shadow offset (opposite direction)
      const maxDistance = 600;
      const influence = Math.min(distance / maxDistance, 1);
      const shadowStrength = 8 + influence * 12;
      
      targetShadowX = -dx * (shadowStrength / distance) * (influence * 0.8);
      targetShadowY = -dy * (shadowStrength / distance) * (influence * 0.8);
      
      // Smooth shadow transition
      currentShadowX += (targetShadowX - currentShadowX) * 0.15;
      currentShadowY += (targetShadowY - currentShadowY) * 0.15;
      
      // Dynamic blur and spread based on distance
      const blur = 16 + influence * 12;
      const spread = 4 + influence * 6;
      const opacity = 0.15 + influence * 0.1;
      
      setShadowStyle(`${currentShadowX}px ${currentShadowY}px ${blur}px ${spread}px rgba(0,0,0,${opacity})`);
      
      animationFrameId = requestAnimationFrame(updateShadow);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrameId = requestAnimationFrame(updateShadow);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return (
    <>
      {expanded ? <div className={styles.backdrop} onClick={toggleExpand} aria-hidden="true" /> : null}
      <article ref={cardRef} className={`${styles.card} ${expanded ? styles.expanded : ''}`} role={expanded ? 'dialog' : undefined} aria-modal={expanded ? 'true' : undefined} aria-labelledby={expanded ? `${iframeId}-label` : undefined} style={{ boxShadow: shadowStyle }}>
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