import * as React from 'react';
import styles from './faq.module.css';

const { useState } = React;

export interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps & { index: number }> = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className={styles.questionText}>{question}</span>
        <i className={`fi-rr-angle-small-${isOpen ? 'up' : 'down'} ${styles.icon}`}></i>
      </button>
      <div
        id={`faq-answer-${index}`}
        className={styles.faqAnswer}
        aria-hidden={!isOpen}
      >
        <p>{answer}</p>
      </div>
    </div>
  );
};

export interface FAQProps {
  items: FAQItemProps[];
  title?: string;
  className?: string;
}

export const FAQ: React.FC<FAQProps> = ({ 
  items, 
  title = 'Frequently Asked Questions',
  className = ''
}) => {
  return (
    <section className={`${styles.faqSection} ${className}`}>
      <h2 className={styles.faqTitle}>{title}</h2>
      <div className={styles.faqList}>
        {items.map((item, index) => (
          <FAQItem
            key={index}
            index={index}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </section>
  );
};
