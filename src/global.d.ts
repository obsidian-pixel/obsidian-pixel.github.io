/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="jest" />
/// <reference types="node" />

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}

// Global type augmentations for React
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: unknown;
    }
  }
}