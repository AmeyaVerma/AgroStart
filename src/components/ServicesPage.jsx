import React from 'react';
import { ArrowRight, Sprout, GraduationCap, Store, Smartphone, Briefcase } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import './ServicesPage.css';
import '../App.css';
import './Pages.css';
import Contact from './Contact';

// Services beyond courses, grouped by who would buy them (AgroStart_Services document).
// Titles and descriptions live in the dictionaries as services.<id>.title / .text.
// `first` marks the four services suggested for the first phase.
const GROUPS = [
  { id: 'farm', icon: Sprout, items: ['f1', 'f2', 'f3', 'f4', 'f5'], first: ['f1'] },
  { id: 'training', icon: GraduationCap, items: ['t1', 't2', 't3', 't4', 't5'], first: ['t1', 't2'] },
  { id: 'enterprise', icon: Store, items: ['e1', 'e2', 'e3', 'e4', 'e5'], first: ['e1'] },
  { id: 'digital', icon: Smartphone, items: ['d1', 'd2', 'd3', 'd4'], first: [] },
  { id: 'programme', icon: Briefcase, items: ['p1', 'p2', 'p3', 'p4'], first: [] },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div className="app">
      {/* ── PAGE HERO ── */}
      <section className="services-hero">
        <div className="container">
          <div className="tag">{t('services.tag')}</div>
          <h1>
            {t('services.h1.pre')}{' '}
            <span className="highlight-green">{t('services.h1.highlight')}</span>
          </h1>
          <p>{t('services.p')}</p>
          <div className="services-hero-actions">
            <a href="#farm" className="btn btn-primary">{t('services.explore')} <ArrowRight size={16} /></a>
            <Link to="/#contact" className="btn btn-outline">{t('nav.consultation')}</Link>
          </div>
        </div>
      </section>

      {/* ── FIRST PHASE ── */}
      <section className="page-section services-first">
        <div className="container">
          <div className="notice info">
            <p><strong>{t('services.first.strong')}</strong> {t('services.first.text')}</p>
          </div>
        </div>
      </section>

      {/* ── SERVICE GROUPS ── */}
      {GROUPS.map(({ id, icon: Icon, items, first }, i) => (
        <section className={`page-section${i % 2 === 0 ? '' : ' alt'}`} id={id} key={id}>
          <div className="container">
            <div className="group-head">
              <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
              <h2>{t(`services.group.${id}`)}</h2>
            </div>
            <div className="card-grid fit service-grid">
              {items.map((item) => (
                <article className="info-card service-card" key={item}>
                  {first.includes(item) && <span className="pill first-pill">{t('services.firstBadge')}</span>}
                  <h3>{t(`services.${item}.title`)}</h3>
                  <p>{t(`services.${item}.text`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── BOTTOM CTA ── */}
      <section className="services-cta-band">
        <div className="container">
          <h2>{t('services.cta.h2')}</h2>
          <p>{t('services.cta.p')}</p>
          <Link to="/#contact" className="btn-white">
            {t('services.cta.btn')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CONTACT (same as main page) ── */}
      <Contact />
    </div>
  );
}
