import React, { useMemo, useState } from 'react';
import { Users, MapPin, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import { COURSES } from '../data/courses';
import { durationGroup, modeGroup } from '../data/courses-meta';
import CourseCard from './CourseCard';
import './Pages.css';
import './Polish.css';
import './Catalogue.css';

const PATHWAYS = ['p1', 'p2', 'p3', 'p4'];

const uniq = (key) => Array.from(new Set(COURSES.flatMap((c) => [].concat(c[key]))));

// Filter groups: each has a key, a label key and the option values. Option labels come
// from "opt.*" (or "opt.dur.*" and "opt.mode.*" for the derived groups).
const GROUPS = [
  { key: 'topic', label: 'courses.f.topic', options: uniq('topic'), prefix: 'opt.' },
  { key: 'languages', label: 'courses.f.language', options: uniq('languages'), prefix: 'opt.' },
  { key: 'duration', label: 'courses.f.duration', options: ['short', 'medium', 'long'], prefix: 'opt.dur.' },
  { key: 'level', label: 'courses.f.level', options: uniq('level'), prefix: 'opt.' },
  { key: 'mode', label: 'courses.f.mode', options: ['online', 'ground', 'blended'], prefix: 'opt.mode.' },
  { key: 'price', label: 'courses.f.price', options: uniq('price'), prefix: 'opt.' },
];

const EMPTY = { topic: 'All', languages: 'All', duration: 'All', level: 'All', mode: 'All', price: 'All' };

const matches = (c, f) =>
  (f.topic === 'All' || c.topic === f.topic) &&
  (f.languages === 'All' || c.languages.includes(f.languages)) &&
  (f.duration === 'All' || durationGroup(c.hours) === f.duration) &&
  (f.level === 'All' || c.level === f.level) &&
  (f.mode === 'All' || modeGroup(c.mode) === f.mode) &&
  (f.price === 'All' || c.price === f.price);

export default function CoursesPage() {
  const { t, tn } = useLanguage();
  const [f, setF] = useState(EMPTY);
  const [query, setQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const shown = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return COURSES.filter((c) => {
      if (!matches(c, f)) return false;
      if (!needle) return true;
      const text = `${t(`courses.${c.id}.title`)} ${t(`courses.${c.id}.blurb`)} ${t(`opt.${c.topic}`)}`.toLowerCase();
      return text.includes(needle);
    });
  }, [f, query, t]);

  const active = Object.values(f).some((v) => v !== 'All') || query.trim() !== '';
  const clear = () => { setF(EMPTY); setQuery(''); };

  return (
    <div className="app">
      <section className="page-hero catalogue-hero">
        <div className="container">
          <h1>{t('courses.h1')}</h1>
          <p>{t('courses.p')}</p>
          <form className="course-search" role="search" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="course-search" className="sr-only">{t('courses.search')}</label>
            <Search size={20} aria-hidden="true" />
            <input
              id="course-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('courses.searchPh')}
            />
          </form>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="notice" role="note">
            <strong>{t('courses.notice.strong')}</strong>
            <p>{t('courses.notice.p')}</p>
          </div>

          <div className="catalogue">
            <aside className="catalogue-filters" aria-label={t('courses.filters')}>
              <button
                type="button"
                className="btn btn-outline filters-toggle"
                aria-expanded={filtersOpen}
                onClick={() => setFiltersOpen((o) => !o)}
              >
                <SlidersHorizontal size={16} aria-hidden="true" /> {t('courses.filters')}
              </button>
              <div className={`filters-body${filtersOpen ? ' open' : ''}`}>
                {GROUPS.map((g) => (
                  <fieldset className="filter-fieldset" key={g.key}>
                    <legend>{t(g.label)}</legend>
                    {['All', ...g.options].map((o) => (
                      <label className="filter-option" key={o}>
                        <input
                          type="radio"
                          name={`f-${g.key}`}
                          checked={f[g.key] === o}
                          onChange={() => setF((p) => ({ ...p, [g.key]: o }))}
                        />
                        <span>{o === 'All' ? t('opt.All') : t(`${g.prefix}${o}`)}</span>
                      </label>
                    ))}
                  </fieldset>
                ))}
                {active && <button type="button" className="btn btn-outline" onClick={clear}>{t('courses.clear')}</button>}
              </div>
            </aside>

            <div className="catalogue-results">
              <h2 className="sr-only">{t('nav.courses')}</h2>
              <p aria-live="polite" className="result-count">{tn('courses.count', shown.length)}</p>
              {shown.length === 0 ? (
                <div className="empty-state">
                  <p>{t('courses.empty')}</p>
                  <button type="button" className="btn btn-outline" onClick={clear}>{t('courses.clear')}</button>
                </div>
              ) : (
                <div className="card-grid catalogue-grid">
                  {shown.map((c) => <CourseCard course={c} key={c.id} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section alt" id="pathways">
        <div className="container">
          <h2>{t('pathways.h2')}</h2>
          <p className="section-intro">{t('pathways.intro')}</p>
          <p style={{ textAlign: 'center' }}><Link to="/pathways" className="btn btn-outline">{t('pathways.all')}</Link></p>
          <div className="card-grid">
            {PATHWAYS.map((p) => (
              <div className="info-card" key={p}>
                <h3>{t(`pathways.${p}.title`)}</h3>
                <div className="pathway-steps">
                  {[1, 2, 3].map((n) => <span className="pill" key={n}>{n}. {t(`pathways.${p}.s${n}`)}</span>)}
                </div>
              </div>
            ))}
          </div>
          <p className="section-intro" style={{ marginTop: '1.5rem', maxWidth: 'none' }}>
            <Users size={16} aria-hidden="true" /> {t('pathways.group')}{' '}
            <MapPin size={16} aria-hidden="true" /> <Link to="/partners" style={{ textDecoration: 'underline', color: 'var(--forest-green)' }}>{t('pathways.talk')}</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
