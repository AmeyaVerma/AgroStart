import React from 'react';
import { Users, GraduationCap, Sprout, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';

// The four levels AgroStart tracks (brief, section 6.9).
const LEVELS = [
  { id: 'l1', icon: <Users size={24} aria-hidden="true" /> },
  { id: 'l2', icon: <GraduationCap size={24} aria-hidden="true" /> },
  { id: 'l3', icon: <Sprout size={24} aria-hidden="true" /> },
  { id: 'l4', icon: <TrendingUp size={24} aria-hidden="true" /> },
];

export default function ImpactPage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <div className="tag">{t('impactPage.tag')}</div>
          <h1>{t('impactPage.h1')}</h1>
          <p>{t('impactPage.p')}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <h2>{t('impactPage.levels.h2')}</h2>
          <div className="card-grid" style={{ marginTop: '1.5rem' }}>
            {LEVELS.map((l, i) => (
              <div className="info-card" key={l.id}>
                <div className="icon-wrapper">{l.icon}</div>
                <h3>{i + 1}. {t(`impactPage.${l.id}.title`)}</h3>
                <p>{t(`impactPage.${l.id}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholders only: real, dated numbers replace these once verified (brief, section 14) */}
      <section className="impact" id="numbers">
        <div className="container">
          <div className="section-header center">
            <h2>{t('impactPage.numbers.h2')}</h2>
          </div>
          <div className="impact-grid">
            {[1, 3, 4].map((n) => (
              <div className="impact-stat-box shadow-sm glass" key={n}>
                <span className="stat-label">{t(`home.impact.i${n}.label`)}</span>
                <div className="stat-value highlight-green">{t(`home.impact.i${n}.value`)}</div>
                <span className="stat-desc">{t(`home.impact.i${n}.desc`)}</span>
              </div>
            ))}
          </div>
          <p className="illustrative-note">{t('home.impact.note')}</p>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container split">
          <div>
            <h2>{t('impactPage.rules.h2')}</h2>
            <ul className="check-list">
              {[1, 2, 3].map((n) => (
                <li key={n}><CheckCircle2 size={20} aria-hidden="true" /> {t(`impactPage.r${n}`)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>{t('impactPage.stories.h2')}</h2>
            <div className="notice" role="note">
              <strong>{t('about.soon')}</strong>
              <p>{t('impactPage.stories.text')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
