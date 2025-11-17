/// <reference types="react" />
import * as React from 'react';
const { useEffect, useState, useCallback, memo } = React;
import styles from './scroll-button.module.css';

export const ScrollButton: React.FC = memo(function ScrollButtonComponent() {
  const [rotated, setRotated] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const top = el.scrollTop;
      const maxScroll = Math.max(el.scrollHeight - el.clientHeight, 0);
      const scrollPercent = maxScroll > 0 ? top / maxScroll : 0;
      setRotated(scrollPercent >= 0.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const smoothScrollTo = useCallback((target: number) => {
    const el = document.scrollingElement || document.documentElement;
    if (typeof el.scrollTo === 'function') {
      el.scrollTo({ top: target, behavior: 'smooth' });
    } else {
      el.scrollTop = target;
    }
  }, []);

  const onClick = useCallback(() => {
    const el = document.scrollingElement || document.documentElement;
    const top = el.scrollTop;
    const maxScroll = Math.max(el.scrollHeight - el.clientHeight, 0);
    const scrollPercent = maxScroll > 0 ? top / maxScroll : 0;
    if (scrollPercent >= 0.5) {
      smoothScrollTo(0);
    } else {
      smoothScrollTo(maxScroll);
    }
  }, [smoothScrollTo]);

  return (
    <div className={styles.controls}>
      <button
        onClick={onClick}
        className={`${styles.btn} ${rotated ? styles.rotated : ''}`}
        aria-label={rotated ? 'Scroll up' : 'Scroll down'}
      >
        ↓
      </button>
    </div>
  );
});

ScrollButton.displayName = 'ScrollButton';

export default ScrollButton;