import React from 'react';
import { LANGS } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import './SiteChrome.css';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();
  return (
    <div className="lang-switcher" role="group" aria-label={t('lang.label')}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          className={`lang-btn${lang === l.code ? ' active' : ''}`}
          aria-pressed={lang === l.code}
          aria-label={l.label}
          title={l.label}
          onClick={() => setLang(l.code)}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

