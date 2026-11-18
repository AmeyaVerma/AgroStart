import React, { useState } from 'react';
import { Search, Library, FileText, Newspaper, PlayCircle, CalendarDays } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';
import './Catalogue.css';
import './Home.css';

// Resources (website framework): library, Package of Practices guides, blog, videos and
// news. No items are published yet, so each tab says so honestly instead of showing
// invented content. Items will come from the CMS once it exists.
const TABS = [
  { id: 'library', icon: Library },
  { id: 'pop', icon: FileText },
  { id: 'blog', icon: Newspaper },
  { id: 'videos', icon: PlayCircle },
  { id: 'news', icon: CalendarDays },
];

const ITEMS = []; // { id, tab, title, language, tags }

export default function ResourcesPage() {
  const { t } = useLanguage();
  const [tab, setTab] = useState('library');
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('All');

  const needle = query.trim().toLowerCase();
  const shown = ITEMS.filter((i) =>
    i.tab === tab &&
    (language === 'All' || i.language === language) &&
    (!needle || i.title.toLowerCase().includes(needle)));

  return (
    <div className="app">
      <section className="page-hero catalogue-hero">
        <div className="container">
          <h1>{t('res.h1')}</h1>
          <p>{t('res.p')}</p>
          <form className="course-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="res-search" className="sr-only">{t('res.search')}</label>
            <Search size={20} aria-hidden="true" />
            <input id="res-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t('res.search')} />
          </form>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="resource-bar">
            <div className="tab-list" role="tablist" aria-label={t('nav.resources')}>
              {TABS.map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={tab === id}
                  aria-controls="res-panel"
                  className={`tab${tab === id ? ' active' : ''}`}
                  onClick={() => setTab(id)}
                >
                  <Icon size={16} aria-hidden="true" /> {t(`res.tab.${id}`)}
                </button>
              ))}
            </div>
            <div className="filter-group">
              <label htmlFor="res-lang">{t('courses.f.language')}</label>
              <select id="res-lang" value={language} onChange={(e) => setLanguage(e.target.value)}>
                {['All', 'Odia', 'Hindi', 'English'].map((l) => <option key={l} value={l}>{t(`opt.${l}`)}</option>)}
              </select>
            </div>
          </div>

          <div id="res-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
            {shown.length === 0 ? (
              <div className="placeholder-box">
                <strong>{t('res.empty.title')}</strong>
                <p>{t(`res.empty.${tab}`)}</p>
              </div>
            ) : (
              <div className="card-grid">
                {shown.map((i) => <div className="info-card" key={i.id}><h3>{i.title}</h3></div>)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
