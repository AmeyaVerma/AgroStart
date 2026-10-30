import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DEFAULT_LANG, LANGS, dictionaries } from './translations';
import { localize, splitLang } from './routing';

const STORAGE_KEY = 'agrostart-lang';
const LanguageContext = createContext(null);

const isSupported = (code) => LANGS.some((l) => l.code === code);

const readStoredLang = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isSupported(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG; // storage blocked (private mode, etc.)
  }
};

// The language comes from the URL prefix (/hi/..., /or/..., /en/...). A visit without a
// prefix falls back to the remembered choice (see LanguageGate in App.jsx, which redirects).
// Must be rendered inside <BrowserRouter>.
export function LanguageProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [stored, setStored] = useState(readStoredLang);

  const urlLang = splitLang(location.pathname).lang;
  const lang = urlLang ?? stored;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((code) => {
    if (!isSupported(code)) return;
    setStored(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* choice still applies for this visit */
    }
    // Same page, other language: swap the prefix and keep query string and hash.
    const { rest } = splitLang(location.pathname);
    navigate(`${localize(code, rest)}${location.search}${location.hash}`);
  }, [location.pathname, location.search, location.hash, navigate]);

  // Falls back to English, then to the key itself, so a missing translation never breaks the page.
  // {placeholders} in strings are filled from `params`. Arrays (legal text) are returned as-is.
  const t = useCallback(
    (key, params) => {
      const raw = dictionaries[lang]?.[key] ?? dictionaries[DEFAULT_LANG][key] ?? key;
      if (!params || typeof raw !== 'string') return raw;
      return raw.replace(/\{(\w+)\}/g, (m, name) => (name in params ? params[name] : m));
    },
    [lang],
  );

  // Singular/plural helper: uses "<base>.one" when n === 1, otherwise "<base>.other".
  const tn = useCallback((base, n) => t(`${base}.${n === 1 ? 'one' : 'other'}`, { n }), [t]);

  const locale = LANGS.find((l) => l.code === lang)?.locale ?? 'en-IN';

  const value = useMemo(
    () => ({ lang, setLang, t, tn, locale, preferredLang: stored }),
    [lang, setLang, t, tn, locale, stored],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
