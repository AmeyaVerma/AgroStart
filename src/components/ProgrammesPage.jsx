import React from 'react';
import { MapPin, Building2, Images, ArrowRight } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';
import './Polish.css';
import './Home.css';

// Programmes and pilots (website framework). Only what is confirmed is stated; locations,
// numbers and outcomes are added once verified.
export default function ProgrammesPage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <h1>{t('prog.h1')}</h1>
          <p>{t('prog.p')}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container split">
          <div className="prose">
            <div className="icon-wrapper"><MapPin size={22} aria-hidden="true" /></div>
            <h2 style={{ marginTop: 0 }}>{t('prog.pilot.h2')}</h2>
            <p>{t('prog.pilot.p1')}</p>
            <p>{t('prog.pilot.goal')}</p>
          </div>
          <div className="notice" role="note">
            <strong>{t('prog.pilot.strong')}</strong>
            <p>{t('prog.pilot.tbc')}</p>
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container split">
          <div className="prose">
            <div className="icon-wrapper"><Building2 size={22} aria-hidden="true" /></div>
            <h2 style={{ marginTop: 0 }}>{t('prog.inst.h2')}</h2>
            <p>{t('prog.inst.p')}</p>
            <Link to="/partners" className="btn btn-primary">{t('prog.inst.cta')} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <div className="center-head">
            <div className="icon-wrapper" style={{ margin: '0 auto 1rem' }}><Images size={22} aria-hidden="true" /></div>
            <h2>{t('prog.cases.h2')}</h2>
          </div>
          <div className="placeholder-box"><p>{t('prog.cases.text')}</p></div>
        </div>
      </section>
    </div>
  );
}
