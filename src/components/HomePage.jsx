import React from 'react';
import { ArrowRight, Users, Languages, Timer, Smartphone, Sprout, PawPrint, Store, Leaf, BookOpen, Award } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import { COURSES, FEATURED_COURSE_IDS } from '../data/courses';
import CourseCard from './CourseCard';
import './Pages.css';
import './Home.css';

// Home page, following the website framework: hero, quick facts, featured courses,
// why AgroStart, how it works (3 steps), learning pathways, impact and stories,
// partners, and a call to action for institutions and funders.

const FACTS = ['f1', 'f2', 'f3', 'f4'];

const WHY = [
  { id: 'y1', icon: Users },
  { id: 'y2', icon: Languages },
  { id: 'y3', icon: Timer },
  { id: 'y4', icon: Smartphone },
];

const STEPS = [
  { id: 's1', icon: BookOpen },
  { id: 's2', icon: Users },
  { id: 's3', icon: Award },
];

const CATEGORIES = [
  { id: 'horti', icon: Sprout },
  { id: 'live', icon: PawPrint },
  { id: 'ent', icon: Store },
  { id: 'dig', icon: Smartphone },
  { id: 'green', icon: Leaf },
];

const featured = FEATURED_COURSE_IDS.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean);

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      {/* HERO: one calm headline, one line of text, two buttons */}
      <section className="home-hero" id="hero">
        <div className="container">
          <h1>{t('home.hero.title')}</h1>
          <p className="home-hero-text">{t('home.hero.text')}</p>
          <div className="home-hero-actions">
            <Link to="/courses" className="btn btn-primary">{t('nav.explore')} <ArrowRight size={16} /></Link>
            <Link to="/partners" className="btn btn-outline">{t('nav.partnerCta')}</Link>
          </div>

          {/* Quick facts: only what is true today. Learner numbers follow once verified. */}
          <ul className="fact-strip" aria-label={t('home.facts.aria')}>
            {FACTS.map((id) => (
              <li key={id}>
                <strong>{t(`home.facts.${id}.value`)}</strong>
                <span className="fact-label">{t(`home.facts.${id}.label`)}</span>
                <span className="fact-desc">{t(`home.facts.${id}.desc`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="page-section" id="courses">
        <div className="container">
          <div className="center-head">
            <h2>{t('home.courses.h2')}</h2>
            <p>{t('home.courses.note')}</p>
          </div>
          <div className="card-grid">
            {featured.map((c) => <CourseCard course={c} key={c.id} />)}
          </div>
          <p className="center-action">
            <Link to="/courses" className="btn btn-outline">{t('home.courses.all')} <ArrowRight size={16} /></Link>
          </p>
        </div>
      </section>

      {/* WHY AGROSTART */}
      <section className="page-section alt" id="why">
        <div className="container">
          <div className="center-head">
            <h2>{t('home.why.h2')}</h2>
          </div>
          <div className="card-grid four">
            {WHY.map(({ id, icon: Icon }) => (
              <div className="info-card" key={id}>
                <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
                <h3>{t(`home.why.${id}.title`)}</h3>
                <p>{t(`home.why.${id}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS: three steps */}
      <section className="page-section" id="how">
        <div className="container">
          <div className="center-head">
            <h2>{t('home.how.h2')}</h2>
          </div>
          <ol className="three-steps">
            {STEPS.map(({ id, icon: Icon }, i) => (
              <li className="info-card" key={id}>
                <span className="step-badge" aria-hidden="true">{i + 1}</span>
                <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
                <h3>{t(`home.how.${id}.title`)}</h3>
                <p>{t(`home.how.${id}.text`)}</p>
              </li>
            ))}
          </ol>
          <p className="center-action">
            <Link to="/how-it-works" className="btn btn-outline">{t('home.how.more')} <ArrowRight size={16} /></Link>
          </p>
        </div>
      </section>

      {/* LEARNING PATHWAYS / CATEGORIES */}
      <section className="page-section alt" id="categories">
        <div className="container">
          <div className="center-head">
            <h2>{t('home.cat.h2')}</h2>
            <p>{t('home.cat.intro')}</p>
          </div>
          <ul className="cat-grid">
            {CATEGORIES.map(({ id, icon: Icon }) => (
              <li key={id}>
                <Link to="/pathways" className="cat-tile">
                  <span className="icon-wrapper"><Icon size={24} aria-hidden="true" /></span>
                  <strong>{t(`home.cat.${id}.title`)}</strong>
                  <span>{t(`home.cat.${id}.text`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VISION */}
      <section className="page-section band" id="vision">
        <div className="container partner-band">
          <div>
            <h2>{t('vm.vision.h2')}</h2>
            <p className="vision-statement" style={{ marginBottom: 0 }}>{t('vm.vision.text')}</p>
          </div>
          <Link to="/about#vision" className="btn btn-outline">{t('home.vision.more')} <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* IMPACT AND STORIES */}
      <section className="page-section alt" id="impact">
        <div className="container">
          <div className="center-head">
            <h2>{t('home.impact.h2')}</h2>
          </div>
          <div className="card-grid fit">
            {[1, 3, 4].map((n) => (
              <div className="info-card impact-card" key={n}>
                <span className="stat-label">{t(`home.impact.i${n}.label`)}</span>
                <div className="stat-value">{t(`home.impact.i${n}.value`)}</div>
                <p>{t(`home.impact.i${n}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="placeholder-box">
            <strong>{t('home.stories.title')}</strong>
            <p>{t('home.stories.text')}</p>
          </div>
          <p className="center-action">
            <Link to="/impact" className="btn btn-outline">{t('home.impact.more')} <ArrowRight size={16} /></Link>
          </p>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="page-section" id="partners-strip">
        <div className="container">
          <div className="center-head">
            <h2>{t('home.logos.h2')}</h2>
          </div>
          <div className="placeholder-box">
            <p>{t('home.logos.text')}</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FOR INSTITUTIONS AND FUNDERS */}
      <section className="page-section band" id="partner-cta">
        <div className="container partner-band">
          <div>
            <h2>{t('home.partners.h2')}</h2>
            <p>{t('home.partners.p')}</p>
          </div>
          <Link to="/partners" className="btn btn-primary">{t('nav.partnerCta')} <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
