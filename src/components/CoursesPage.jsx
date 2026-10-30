import React, { useMemo, useState } from 'react';
import { Users, MapPin } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import { COURSES } from '../data/courses';
import CourseCard from './CourseCard';
import './Pages.css';

const PATHWAYS = ['p1', 'p2', 'p3', 'p4'];

const uniq = (key) => ['All', ...Array.from(new Set(COURSES.flatMap((c) => [].concat(c[key]))))];

function Select({ id, label, options, value, onChange, t }) {
  return (
    <div className="filter-group">
      <label htmlFor={`f-${id}`}>{label}</label>
      <select id={`f-${id}`} value={value} onChange={onChange}>
        {options.map((o) => <option key={o} value={o}>{t(`opt.${o}`)}</option>)}
      </select>
    </div>
  );
}

export default function CoursesPage() {
  const { t, tn } = useLanguage();
  const [f, setF] = useState({ languages: 'All', topic: 'All', level: 'All', price: 'All' });
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const shown = useMemo(
    () => COURSES.filter((c) =>
      (f.languages === 'All' || c.languages.includes(f.languages)) &&
      (f.topic === 'All' || c.topic === f.topic) &&
      (f.level === 'All' || c.level === f.level) &&
      (f.price === 'All' || c.price === f.price)),
    [f],
  );

  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <div className="tag">{t('courses.tag')}</div>
          <h1>{t('courses.h1')}</h1>
          <p>{t('courses.p')}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="notice" role="note">
            <strong>{t('courses.notice.strong')}</strong>
            <p>{t('courses.notice.p')}</p>
          </div>

          <div className="filters" role="group" aria-label={t('courses.filters')}>
            <Select id="languages" label={t('courses.f.language')} options={uniq('languages')} value={f.languages} onChange={set('languages')} t={t} />
            <Select id="topic" label={t('courses.f.topic')} options={uniq('topic')} value={f.topic} onChange={set('topic')} t={t} />
            <Select id="level" label={t('courses.f.level')} options={uniq('level')} value={f.level} onChange={set('level')} t={t} />
            <Select id="price" label={t('courses.f.price')} options={uniq('price')} value={f.price} onChange={set('price')} t={t} />
          </div>

          <h2 className="sr-only">{t('nav.courses')}</h2>
          <p aria-live="polite" className="sr-count">{tn('courses.count', shown.length)}</p>

          {shown.length === 0 ? (
            <div className="empty-state">{t('courses.empty')}</div>
          ) : (
            <div className="card-grid">
              {shown.map((c) => <CourseCard course={c} key={c.id} />)}
            </div>
          )}
        </div>
      </section>

      <section className="page-section alt" id="pathways">
        <div className="container">
          <h2>{t('pathways.h2')}</h2>
          <p className="section-intro">{t('pathways.intro')}</p>
          <p><Link to="/pathways" className="btn btn-outline">{t('pathways.all')}</Link></p>
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
          <p className="section-intro" style={{ marginTop: '1.5rem' }}>
            <Users size={16} aria-hidden="true" /> {t('pathways.group')}{' '}
            <MapPin size={16} aria-hidden="true" /> <Link to="/partners" style={{ textDecoration: 'underline', color: 'var(--forest-green)' }}>{t('pathways.talk')}</Link>.
          </p>
        </div>
      </section>
    </div>
  );
}
