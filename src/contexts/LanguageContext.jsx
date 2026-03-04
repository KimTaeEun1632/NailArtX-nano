import React, { useState, useEffect } from 'react';
import { translations } from '../constants/translations';
import { LanguageContext } from './LanguageContext';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ko');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => {
    try {
      const keys = key.split('.');
      let value = translations[lang];
      
      for (const k of keys) {
        if (value && Object.prototype.hasOwnProperty.call(value, k)) {
          value = value[k];
        } else {
          console.warn(`Translation key not found: ${key} (at segment: ${k})`);
          return key;
        }
      }
      return value;
    } catch (e) {
      console.error(`Error translating key: ${key}`, e);
      return key;
    }
  };

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'ko' ? 'en' : 'ko'));
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
