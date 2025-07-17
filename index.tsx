
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Stagewise Toolbar Integration
import { initToolbar } from '@stagewise/toolbar';

const stagewiseConfig = {
  plugins: [],
};

function setupStagewise() {
  if (process.env.NODE_ENV === 'development') {
    initToolbar(stagewiseConfig);
  }
}

setupStagewise();

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
