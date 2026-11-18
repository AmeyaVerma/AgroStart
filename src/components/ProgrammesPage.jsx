import React from 'react';
import { MapPin, Building2, Images, ArrowRight } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';
import './Dynamic.css';
import Reveal from './Reveal';
import groupField from '../assets/photos/group-field.webp';
import fieldPeople from '../assets/photos/field-people.webp';
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
        <div className="container media-split">
          <Reveal className="photo-card lift">
            <img src={groupField} alt={t('prog.pilot.h2')} loading="lazy" />
            <span className="photo-badge">{t('prog.pilot.badge')}</span>
          </Reveal>
          <Reveal className="copy prose" delay={120}>
            <div className="icon-wrapper"><MapPin size={22} aria-hidden="true" /></div>
            <h2 style={{ marginTop: 0 }}>{t('prog.pilot.h2')}</h2>
            <p>{t('prog.pilot.p1')}</p>
            <p>{t('prog.pilot.goal')}</p>
            <div className="notice" role="note" style={{marginTop:"1rem"}}>
              <div><strong>{t('prog.pilot.strong')}</strong><p>{t('prog.pilot.tbc')}</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container media-split reverse">
          <Reveal className="photo-card lift">
            <img src={fieldPeople} alt="" loading="lazy" />
          </Reveal>
          <Reveal className="copy prose" delay={120}>
            <div className="icon-wrapper"><Building2 size={22} aria-hidden="true" /></div>
            <h2 style={{ marginTop: 0 }}>{t('prog.inst.h2')}</h2>
            <p>{t('prog.inst.p')}</p>
            <Link to="/partners" className="btn btn-primary">{t('prog.inst.cta')} <ArrowRight size={16} /></Link>
          </Reveal>
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
