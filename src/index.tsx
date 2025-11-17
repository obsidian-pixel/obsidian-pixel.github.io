/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="jest" />
/// <reference types="node" />

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ErrorBoundary } from './modules/ErrorBoundary/ErrorBoundary';
import { App } from './modules/App/App';
import './styles/main.css';
import '@flaticon/flaticon-uicons/css/regular/rounded.css';
import '@flaticon/flaticon-uicons/css/brands/all.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);