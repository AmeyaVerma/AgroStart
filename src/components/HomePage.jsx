import React from 'react';
import { ArrowRight, Users, Languages, Timer, Smartphone, Sprout, PawPrint, Store, Leaf, BookOpen, Award } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import { COURSES, FEATURED_COURSE_IDS } from '../data/courses';
import CourseCard from './CourseCard';
import HeroBackdrop from './HeroBackdrop';
import Reveal from './Reveal';
import CountUp from './CountUp';
import groupField from '../assets/photos/group-field.webp';
import handPlant from '../assets/photos/hand-plant.webp';
import fieldPeople from '../assets/photos/field-people.webp';
import farmerBook from '../assets/photos/farmer-book.webp';
import womanGreens from '../assets/photos/woman-greens.webp';
import './Pages.css';
import './Home.css';
import './Polish.css';
import './Dynamic.css';

// Home page, following the website framework: hero, quick facts, featured courses,
// why AgroStart, how it works (3 steps), learning pathways, impact and stories,
// partners, and a call to action for institutions and funders.

const FACTS = ['f1', 'f2', 'f3'];

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

const PHOTOS = [
  { src: groupField, caption: 'home.photos.p1' },
  { src: farmerBook, caption: 'home.photos.p2' },
  { src: fieldPeople, caption: 'home.photos.p3' },
  { src: handPlant, caption: 'home.photos.p4' },
  { src: womanGreens, caption: 'home.photos.p5' },
];

const featured = FEATURED_COURSE_IDS.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean);

export default function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      {/* HERO */}
      <section className="home-hero" id="hero">
        <HeroBackdrop />
        <div className="container">
          <h1>{t('home.hero.title')}</h1>
          <p className="home-hero-text">{t('home.hero.text')}</p>
          <div className="home-hero-actions">
            <Link to="/courses" className="btn btn-primary">{t('nav.explore')} <ArrowRight size={16} /></Link>
            <Link to="/partners" className="btn btn-outline">{t('nav.partnerCta')}</Link>
          </div>

          {/* Quick facts strip */}
          <ul className="fact-strip" aria-label={t('home.facts.aria')}>
            {FACTS.map((id, i) => (
              <Reveal as="li" key={id} delay={i * 120}>
                <strong><CountUp value={t(`home.facts.${id}.value`)} /></strong>
                <span className="fact-label">{t(`home.facts.${id}.label`)}</span>
                <span className="fact-desc">{t(`home.facts.${id}.desc`)}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* PHOTO STRIP: real photos tell the story */}
      <section className="page-section" id="moments">
        <div className="container">
          <Reveal className="center-head">
            <h2>{t('home.photos.h2')}</h2>
            <p>{t('home.photos.intro')}</p>
          </Reveal>
          <Reveal>
            <div className="photo-strip">
              {PHOTOS.map((p) => (
                <figure className="photo-card lift" key={p.caption}>
                  <img src={p.src} alt={t(p.caption)} loading="lazy" />
                  <div className="scrim" aria-hidden="true" />
                  <figcaption className="caption">{t(p.caption)}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="page-section alt" id="courses">
        <div className="container">
          <Reveal className="center-head">
            <h2>{t('home.courses.h2')}</h2>
            <p>{t('home.courses.note')}</p>
          </Reveal>
          <div className="card-grid">
            {featured.map((c, i) => <Reveal key={c.id} delay={i * 100}><CourseCard course={c} /></Reveal>)}
          </div>
          <Reveal as="p" className="center-action">
            <Link to="/courses" className="btn btn-outline">{t('home.courses.all')} <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      {/* WHY AGROSTART, with a photo */}
      <section className="page-section" id="why">
        <div className="container">
          <div className="media-split">
            <Reveal className="photo-card wide lift">
              <img src={farmerBook} alt={t('home.why.photoAlt')} loading="lazy" />
              <span className="photo-badge">{t('home.why.badge')}</span>
            </Reveal>
            <Reveal className="copy" delay={100}>
              <h2>{t('home.why.h2')}</h2>
              <div className="why-list">
                {WHY.map(({ id, icon: Icon }) => (
                  <div className="why-row" key={id}>
                    <span className="icon-wrapper"><Icon size={20} aria-hidden="true" /></span>
                    <div>
                      <strong>{t(`home.why.${id}.title`)}</strong>
                      <p>{t(`home.why.${id}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="page-section alt" id="how">
        <div className="container">
          <Reveal className="center-head">
            <h2>{t('home.how.h2')}</h2>
          </Reveal>
          <ol className="three-steps">
            {STEPS.map(({ id, icon: Icon }, i) => (
              <Reveal as="li" className="info-card lift" key={id} delay={i * 120}>
                <span className="step-badge" aria-hidden="true">{i + 1}</span>
                <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
                <h3>{t(`home.how.${id}.title`)}</h3>
                <p>{t(`home.how.${id}.text`)}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal as="p" className="center-action">
            <Link to="/how-it-works" className="btn btn-outline">{t('home.how.more')} <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      {/* LEARNING PATHWAYS */}
      <section className="page-section" id="categories">
        <div className="container">
          <Reveal className="center-head">
            <h2>{t('home.cat.h2')}</h2>
            <p>{t('home.cat.intro')}</p>
          </Reveal>
          <ul className="cat-grid">
            {CATEGORIES.map(({ id, icon: Icon }, i) => (
              <Reveal as="li" key={id} delay={i * 80}>
                <Link to="/pathways" className="cat-tile lift">
                  <span className="icon-wrapper"><Icon size={24} aria-hidden="true" /></span>
                  <strong>{t(`home.cat.${id}.title`)}</strong>
                  <span>{t(`home.cat.${id}.text`)}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* VISION */}
      <section className="page-section band" id="vision">
        <Reveal className="container partner-band">
          <div>
            <h2>{t('vm.vision.h2')}</h2>
            <p className="vision-statement" style={{ marginBottom: 0 }}>{t('vm.vision.text')}</p>
          </div>
          <Link to="/about#vision" className="btn btn-outline">{t('home.vision.more')} <ArrowRight size={16} /></Link>
        </Reveal>
      </section>

      {/* IMPACT with animated counters */}
      <section className="page-section alt" id="impact">
        <div className="container">
          <Reveal className="center-head">
            <h2>{t('home.impact.h2')}</h2>
          </Reveal>
          <div className="card-grid fit">
            {[1, 3, 4].map((n, i) => (
              <Reveal as="div" className="info-card impact-card lift" key={n} delay={i * 120}>
                <span className="stat-label">{t(`home.impact.i${n}.label`)}</span>
                <div className="stat-value count"><CountUp value={t(`home.impact.i${n}.value`)} /></div>
                <p>{t(`home.impact.i${n}.desc`)}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="placeholder-box">
            <strong>{t('home.stories.title')}</strong>
            <p>{t('home.stories.text')}</p>
          </Reveal>
          <Reveal as="p" className="center-action">
            <Link to="/impact" className="btn btn-outline">{t('home.impact.more')} <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      {/* PARTNER CTA */}
      <section className="page-section band" id="partner-cta">
        <Reveal className="container partner-band">
          <div>
            <h2>{t('home.partners.h2')}</h2>
            <p>{t('home.partners.p')}</p>
          </div>
          <Link to="/partners" className="btn btn-primary">{t('nav.partnerCta')} <ArrowRight size={16} /></Link>
        </Reveal>
      </section>
    </div>
  );
}
