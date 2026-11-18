import React from 'react';
import { Target, Languages, Smartphone, Users, Award, Quote, Globe, Layers, Route, Handshake, CheckCircle2, GraduationCap, Cpu, UserRound } from 'lucide-react';
import { SITE } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';
import './Dynamic.css';
import Reveal from './Reveal';
import fieldPeople from '../assets/photos/field-people.webp';
import './Home.css';
import './Polish.css';

// Who we serve, as short lists of group names (titles come from the dictionaries).
const AUDIENCE = [
  { label: 'about.audience.primary', titles: ['home.who.g1.title', 'home.who.g2.title', 'home.who.g3.title'] },
  { label: 'about.audience.secondary', titles: ['about.audience.s1.title', 'about.audience.s2.title', 'about.audience.s3.title'] },
  { label: 'about.audience.institutional', titles: ['about.audience.i1.title', 'about.audience.i2.title'] },
];

const MISSION = [
  { n: 1, icon: Globe },
  { n: 2, icon: Layers },
  { n: 3, icon: Route },
  { n: 4, icon: Handshake },
];

const GOALS = [
  { id: 'short', items: [1, 2, 3, 4] },
  { id: 'mid', items: [1, 2, 3, 4] },
  { id: 'long', items: [1, 2, 3] },
];

const VALUES = [1, 2, 3, 4, 5];

const PEOPLE = [
  { key: 'team', icon: UserRound, title: 'about.team.h2', text: 'about.team.text', soon: true },
  { key: 'trainers', icon: GraduationCap, title: 'about.trainers', text: 'about.trainers.text', soon: true },
  { key: 'tech', icon: Cpu, title: 'about.tech', text: 'about.tech.text', soon: false },
  { key: 'advisory', icon: Handshake, title: 'about.advisory', text: 'about.advisory.text', soon: true },
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

      {/* Who we are, with a photo */}
      <section className="page-section">
        <div className="container media-split">
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
              <div className="info-card mission-card" key={c.id}>
                <div className="icon-wrapper">{c.icon}</div>
                <div>
                  <h3>{t(`about.${c.id}.title`)}</h3>
                  <p>{t(`about.${c.id}.text`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width photo band */}
      <section className="page-section" style={{paddingTop:0, paddingBottom:"4rem"}}>
        <div className="container">
          <Reveal className="photo-card wide lift">
            <img src={fieldPeople} alt={t('about.photo.alt')} loading="lazy" />
            <div className="scrim" aria-hidden="true" />
            <figcaption className="caption">{t('about.photo.caption')}</figcaption>
          </Reveal>
        </div>
      </section>

      {/* Phygital learning model */}
      <section className="page-section alt" id="phygital">
        <div className="container">
          <div className="center-head">
            <h2>{t('about.phy.h2')}</h2>
            <p>{t('about.phy.p')}</p>
          </div>
          <div className="phygital-diagram">
            {[['d1', Smartphone, null], ['d2', Users, '+'], ['d3', Award, '=']].map(([id, Icon, sign]) => (
              <React.Fragment key={id}>
                {sign && <span className="phygital-sign" aria-hidden="true">{sign}</span>}
                <div className="info-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                  <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
                  <h3>{t(`about.phy.${id}.title`)}</h3>
                  <p>{t(`about.phy.${id}.text`)}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="page-section" id="vision">
        <div className="container">
          <div className="center-head"><h2>{t('vm.vision.h2')}</h2></div>
          <div className="statement-card">
            <span className="statement-icon"><Quote size={24} aria-hidden="true" /></span>
            <p>{t('vm.vision.text')}</p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="page-section alt" id="mission">
        <div className="container">
          <div className="center-head"><h2>{t('vm.mission.h2')}</h2></div>
          <div className="grid-2">
            {MISSION.map(({ n, icon: Icon }) => (
              <div className="info-card mission-card" key={n}>
                <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
                <p>{t(`vm.mission.m${n}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="page-section" id="goals">
        <div className="container">
          <div className="center-head"><h2>{t('vm.goals.h2')}</h2></div>
          <div className="horizon-grid">
            {GOALS.map((g) => (
              <div className="info-card horizon-card" key={g.id}>
                <span className="horizon-label">{t(`vm.goals.${g.id}`)}</span>
                <ul className="tick-list">
                  {g.items.map((n) => (
                    <li key={n}><CheckCircle2 size={18} aria-hidden="true" /> <span>{t(`vm.goals.${g.id}.${n}`)}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="section-intro" style={{ marginTop: '1.75rem' }}>{t('vm.goals.note')}</p>
        </div>
      </section>

      {/* Values */}
      <section className="page-section alt" id="values">
        <div className="container">
          <div className="center-head"><h2>{t('vm.values.h2')}</h2></div>
          <div className="chip-row">
            {VALUES.map((n) => (
              <span className="value-chip" key={n}><CheckCircle2 size={18} aria-hidden="true" /> {t(`vm.values.v${n}`)}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Who our courses are for */}
      <section className="page-section" id="audience">
        <div className="container">
          <div className="center-head">
            <h2>{t('about.audience.h2')}</h2>
            <p>{t('about.audience.intro')}</p>
          </div>
          <div className="audience-grid">
            {AUDIENCE.map((g) => (
              <div className="info-card audience-col" key={g.label}>
                <h3>{t(g.label)}</h3>
                <ul className="tick-list">
                  {g.titles.map((key) => <li key={key}><CheckCircle2 size={18} aria-hidden="true" /> <span>{t(key)}</span></li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="notice info" style={{ marginTop: '2rem' }}>
            <p><strong>{t('about.audience.pilot.strong')}</strong> {t('about.audience.pilot.text')}</p>
          </div>
        </div>
      </section>

      {/* Team, trainers, technology and advisory partners */}
      <section className="page-section alt">
        <div className="container">
          <div className="profile-grid">
            {PEOPLE.map(({ key, icon: Icon, title, text, soon }) => (
              <div className="info-card profile-card" key={key} style={soon ? undefined : { borderStyle: 'solid' }}>
                <div className="avatar-ring"><Icon size={34} aria-hidden="true" /></div>
                <h3>{t(title)}</h3>
                <p>{t(text)}</p>
                {soon && <span className="pill">{t('about.soon')}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
