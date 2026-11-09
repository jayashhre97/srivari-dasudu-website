import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext(null);
const STORAGE_KEY = 'srivari_lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'te') return saved;
    } catch {
      /* ignore */
    }
    return 'en';
  });

  const setLang = (next) => {
    const value = next === 'te' ? 'te' : 'en';
    setLangState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'te' ? 'te' : 'en';
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang] || translations.en;
    const fallback = translations.en;

    const t = (key, vars) => {
      let text = dict[key] ?? fallback[key] ?? key;
      if (vars && typeof text === 'string') {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }
      return text;
    };

    return {
      lang,
      setLang,
      t,
      isTe: lang === 'te',
      isEn: lang === 'en'
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}
