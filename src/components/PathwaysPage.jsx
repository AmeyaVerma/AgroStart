import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';

// Each pathway and the sample course it starts with. SAMPLE DATA: replace with the real
// pathways once AgroStart confirms them (brief, section 6.1).
const PATHWAYS = [
  { id: 'p1', course: 'smartphone-farming' },
  { id: 'p2', course: 'fpo-governance' },
  { id: 'p3', course: 'agri-enterprise' },
  { id: 'p4', course: 'trainer-skills' },
];

export default function PathwaysPage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <div className="tag">{t('pathwaysPage.tag')}</div>
          <h1>{t('pathwaysPage.h1')}</h1>
          <p>{t('pathwaysPage.p')}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <h2>{t('pathwaysPage.how.h2')}</h2>
          <div className="card-grid" style={{ marginTop: '1.5rem' }}>
            {[1, 2, 3].map((n) => (
              <div className="info-card" key={n}>
                <div className="step-num" aria-hidden="true">{n}</div>
                <h3>{t(`pathwaysPage.s${n}.title`)}</h3>
                <p>{t(`pathwaysPage.s${n}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <div className="notice" role="note"><p>{t('pathwaysPage.sampleNote')}</p></div>
          <div className="card-grid">
            {PATHWAYS.map((p) => (
              <article className="info-card" key={p.id}>
                <h3>{t(`pathways.${p.id}.title`)}</h3>
                <ol className="pathway-list">
                  {[1, 2, 3].map((n) => <li key={n}>{t(`pathways.${p.id}.s${n}`)}</li>)}
                </ol>
                <p className="badge-line"><Award size={18} aria-hidden="true" /> {t('pathwaysPage.badge')}</p>
                <Link to={`/courses/${p.course}`} className="btn btn-outline">
                  {t('pathwaysPage.courseLink')} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
