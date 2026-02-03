import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { detectBrowserLocale, createI18n } from './index';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() =>
    localStorage.getItem('lang') || detectBrowserLocale()
  );
  const [i18n, setI18n] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadI18n() {
      const instance = await createI18n(locale);
      if (!active) return;

      document.documentElement.lang = locale;
      localStorage.setItem('lang', locale);
      setI18n(instance);
    }

    loadI18n();
    return () => { active = false; };
  }, [locale]);

  // ✅ fallback imediato (não bloqueia render)
  const t = i18n?.t ?? ((key) => key);

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return ctx;
}
