import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from '@/App';
import '@/index.css';
import { I18nProvider } from '@/i18n/I18nProvider';

/* ✅ Remove fallback WP (evita duplicação) */
const intro = document.getElementById("seo-intro");
if (intro) intro.remove();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <I18nProvider>
          <App />
        </I18nProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
