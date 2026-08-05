import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';
import { initI18n } from '@/i18n';
import { useAppStore } from '@/lib/store/store';

import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container #root is missing from index.html.');
}

/*
 * i18next is initialised before the first render, using the locale already rehydrated from
 * storage. Rendering first and switching language in an effect would show one frame of the wrong
 * language on every cold load — a flash of English for a French reader.
 */
await initI18n(useAppStore.getState().settings.locale);

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
