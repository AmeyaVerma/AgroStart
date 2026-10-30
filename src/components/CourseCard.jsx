import React from 'react';
import { Clock, Layers, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';

// One course in the catalogue (used on the Courses page and the Home page).
export default function CourseCard({ course: c }) {
  const { t } = useLanguage();
  return (
    <article className="info-card course-card">
      <div className="pill-row">
        <span className="pill sample">{t('courses.sample')}</span>
        <span className={`pill${c.price === 'Free' ? ' free' : ''}`}>{t(`opt.${c.price}`)}</span>
        <span className="pill">{t(`opt.${c.level}`)}</span>
      </div>
      <h3>{t(`courses.${c.id}.title`)}</h3>
      <p>{t(`courses.${c.id}.blurb`)}</p>
      <div className="course-meta">
        <span><Clock size={16} aria-hidden="true" /> {t('courses.hours', { n: c.hours })}</span>
        <span><Smartphone size={16} aria-hidden="true" /> {t(`opt.${c.mode}`)}</span>
        <span><Layers size={16} aria-hidden="true" /> {t(`opt.${c.topic}`)}</span>
      </div>
      <p className="best-for"><strong>{t('courses.bestFor')}:</strong> {c.audience.slice(0, 2).map((a) => t(`aud.${a}`)).join(', ')}</p>
      <ul className="pill-row" aria-label={t('courses.languages')}>
        {c.languages.map((l) => <li className="pill" key={l}>{t(`opt.${l}`)}</li>)}
      </ul>
      <div className="course-actions">
        <Link to={`/courses/${c.id}`} className="btn btn-primary">{t('courses.view')} <ArrowRight size={16} /></Link>
      </div>
    </article>
  );
}
