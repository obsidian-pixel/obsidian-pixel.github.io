/**
 * FAQ Schema for Rich Snippets
 * Provides structured data for Frequently Asked Questions
 */

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generate FAQ Schema for SEO rich snippets
 */
export const createFAQSchema = (faqs: FAQItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

/**
 * Default FAQ items for RAIDUIX Vault
 */
export const defaultFAQs: FAQItem[] = [
  {
    question: 'What is RAIDUIX Vault?',
    answer: 'RAIDUIX Vault is an advanced AI prompt engineering library providing 500+ premium prompts, autonomous agent frameworks, and cognitive architectures designed for next-generation AI development with GPT-4, Claude, and other LLMs.'
  },
  {
    question: 'What is prompt engineering?',
    answer: 'Prompt engineering is the practice of designing and optimizing text inputs (prompts) to get the best possible outputs from AI language models. It involves techniques like chain-of-thought reasoning, few-shot learning, and structured formatting to guide AI responses effectively.'
  },
  {
    question: 'How do I use AI prompts effectively?',
    answer: 'Use AI prompts effectively by: 1) Being specific and clear in your instructions, 2) Providing relevant context and examples, 3) Using structured formats like JSON or markdown, 4) Incorporating few-shot examples, 5) Iterating and refining based on outputs, 6) Testing prompts across different scenarios.'
  },
  {
    question: 'What are chain-of-thought prompts?',
    answer: 'Chain-of-thought prompts encourage AI models to break down complex problems into step-by-step reasoning. By asking the AI to "think step by step" or show its reasoning process, you get more accurate, transparent, and reliable answers for complex tasks like math, logic, and analysis.'
  },
  {
    question: 'How to prevent prompt injection attacks?',
    answer: 'Prevent prompt injection by: 1) Validating and sanitizing all user inputs, 2) Using delimiters to separate instructions from user content, 3) Implementing output filtering, 4) Setting clear boundaries in system prompts, 5) Using structured formats like JSON, 6) Monitoring for suspicious patterns, 7) Applying defense-in-depth security principles.'
  },
  {
    question: 'What is few-shot learning in AI prompts?',
    answer: 'Few-shot learning provides the AI with a few examples (typically 2-5) of the desired input-output format before asking it to perform a task. This helps the model understand the pattern, format, and style you want, leading to more consistent and accurate responses without extensive training.'
  },
  {
    question: 'What is the difference between GPT-4 and Claude prompts?',
    answer: 'While both GPT-4 and Claude respond well to similar prompting techniques, Claude tends to be more verbose and cautious by default, often requiring prompts that encourage conciseness. GPT-4 generally follows instructions more literally. Claude excels at longer context windows and nuanced conversations, while GPT-4 offers stronger creative and coding capabilities. Both benefit from clear, structured prompts.'
  },
  {
    question: 'How do I optimize prompt length?',
    answer: 'Optimize prompt length by: 1) Being concise while maintaining clarity, 2) Removing redundant instructions, 3) Using bullet points for multiple requirements, 4) Placing the most important instructions first and last, 5) Balancing detail with brevity, 6) Testing different lengths to find the sweet spot, 7) Using system prompts for persistent context to keep user prompts shorter.'
  }
];

/**
 * HowTo Schema for tutorial content
 */
export const createHowToSchema = (
  name: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  description,
  step: steps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text
  }))
});
