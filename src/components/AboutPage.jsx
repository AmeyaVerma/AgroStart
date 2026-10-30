import React from 'react';
import { Target, Languages, Smartphone } from 'lucide-react';
import { SITE } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';

// Who we serve, as short lists of group names (titles come from the dictionaries).
const AUDIENCE = [
  { label: 'about.audience.primary', titles: ['home.who.g1.title', 'home.who.g2.title', 'home.who.g3.title'] },
  { label: 'about.audience.secondary', titles: ['about.audience.s1.title', 'about.audience.s2.title', 'about.audience.s3.title'] },
  { label: 'about.audience.institutional', titles: ['about.audience.i1.title', 'about.audience.i2.title'] },
];

const MISSION = [1, 2, 3, 4];
const GOALS = [
  { id: 'short', items: [1, 2, 3, 4] },
  { id: 'mid', items: [1, 2, 3, 4] },
  { id: 'long', items: [1, 2, 3] },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const cards = [
    { id: 'c1', icon: <Target size={22} /> },
    { id: 'c2', icon: <Languages size={22} /> },
    { id: 'c3', icon: <Smartphone size={22} /> },
  ];

  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <div className="tag">{t('about.tag')}</div>
          <h1>{t('about.h1')}</h1>
          <p>{t('about.p')}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container split">
          <div className="prose">
            <h2 style={{ marginTop: 0 }}>{t('about.who')}</h2>
            <p>{t('about.who.p1', { legal: SITE.legalName, location: t('site.location') })}</p>
            <p>{t('about.who.founder')}</p>
            <div className="notice info">
              <p>
                <strong>{t('about.ambition.strong')}</strong> {t('about.ambition.text')}
              </p>
            </div>
          </div>

          <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
            {cards.map((c) => (
              <div className="info-card" key={c.id}>
                <div className="icon-wrapper">{c.icon}</div>
                <h3>{t(`about.${c.id}.title`)}</h3>
                <p>{t(`about.${c.id}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, mission and goals (Vision, Mission and Goals document) */}
      <section className="page-section alt" id="vision">
        <div className="container">
          <div className="tag">{t('vm.tag')}</div>
          <h2>{t('vm.vision.h2')}</h2>
          <p className="vision-statement">{t('vm.vision.text')}</p>

          <h2>{t('vm.mission.h2')}</h2>
          <div className="steps" role="list">
            {MISSION.map((n) => (
              <div className="step" role="listitem" key={n}>
                <div className="step-num" aria-hidden="true">{n}</div>
                <div><p>{t(`vm.mission.m${n}`)}</p></div>
              </div>
            ))}
          </div>

          <h2>{t('vm.goals.h2')}</h2>
          <div className="card-grid three">
            {GOALS.map((g) => (
              <div className="info-card" key={g.id}>
                <h3>{t(`vm.goals.${g.id}`)}</h3>
                <ul className="name-list">
                  {g.items.map((n) => <li key={n}>{t(`vm.goals.${g.id}.${n}`)}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="section-intro" style={{ marginTop: '1.5rem' }}>{t('vm.goals.note')}</p>

          <h2>{t('vm.values.h2')}</h2>
          <p className="section-intro">{t('vm.values.text')}</p>
        </div>
      </section>

      {/* Who we serve (target group document), kept short */}
      <section className="page-section" id="audience">
        <div className="container">
          <h2>{t('about.audience.h2')}</h2>
          <p className="section-intro">{t('about.audience.intro')}</p>
          <div className="audience-grid">
            {AUDIENCE.map((g) => (
              <div className="info-card audience-col" key={g.label}>
                <h3>{t(g.label)}</h3>
                <ul className="name-list">
                  {g.titles.map((key) => <li key={key}>{t(key)}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="notice info" style={{ marginTop: '2rem' }}>
            <p><strong>{t('about.audience.pilot.strong')}</strong> {t('about.audience.pilot.text')}</p>
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <h2>{t('about.trainers')}</h2>
          <div className="notice" role="note">
            <strong>{t('about.soon')}</strong>
            <p>{t('about.trainers.text')}</p>
          </div>
          <h2>{t('about.tech')}</h2>
          <p className="section-intro">{t('about.tech.text')}</p>
          <h2>{t('about.advisory')}</h2>
          <p className="section-intro">{t('about.advisory.text')}</p>
        </div>
      </section>
    </div>
  );
}
