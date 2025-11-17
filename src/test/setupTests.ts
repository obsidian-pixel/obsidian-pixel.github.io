import '@testing-library/jest-dom';

// JSDOM stub for scrollTo
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).scrollTo = () => {};