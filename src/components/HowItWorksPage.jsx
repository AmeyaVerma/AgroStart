import React from 'react';
import { Link } from '../i18n/LocalizedLink';
import { PlayCircle, ArrowRight, Smartphone, MapPin, Award, UserPlus, Route, BookOpen, Hammer, Sparkles, Link2, Briefcase, LifeBuoy } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LEARNING_STAGES, LIVELIHOOD_STAGES, STAGES_WITH_STATUS } from '../data/journey';
import FaqSection from './FaqSection';
import './Pages.css';
import './Dynamic.css';
import fieldPeople from '../assets/photos/field-people.webp';
import './Home.css';
import './Polish.css';

// Icon for each of the eight stages (AgroStart Learner Journey document).
const STAGE_ICONS = { 1: UserPlus, 2: Route, 3: BookOpen, 4: Hammer, 5: Award, 6: Sparkles, 7: Link2, 8: Briefcase };

// One stage of the learner journey, shown as a circle with its number, title and text.
function Stage({ n, t }) {
  const Icon = STAGE_ICONS[n];
  return (
    <li className="info-card track-stage">
      <span className="stage-circle">
        <Icon size={26} aria-hidden="true" />
        <span className="stage-count" aria-hidden="true">{n}</span>
      </span>
      <h4>{t(`how.s${n}.title`)}</h4>
      <p>{t(`how.s${n}.text`)}</p>
      {STAGES_WITH_STATUS.includes(n) && (
        <p className="stage-status"><strong>{t('how.statusLabel')}</strong> {t(`how.s${n}.status`)}</p>
      )}
    </li>
  );
}

export default function HowItWorksPage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      <section className="page-hero with-photo">
        <div className="photo-hero"><img src={fieldPeople} alt="" loading="eager" /></div>
        <div className="container">
          <div className="tag">{t('how.tag')}</div>
          <h1>{t('how.h1')}</h1>
          <p>{t('how.p')}</p>
        </div>
      </section>

      {/* Three parts of every course */}
      <section className="page-section">
        <div className="container">
          <div className="center-head">
            <h2>{t('how.m.h2')}</h2>
          </div>
          <div className="card-grid three">
            {[['online', Smartphone], ['ground', MapPin], ['cert', Award]].map(([id, Icon]) => (
              <div className="info-card" key={id}>
                <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
                <h3>{t(`how.m.${id}.title`)}</h3>
                <p>{t(`how.m.${id}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The learner journey: eight stages in two tracks */}
      <section className="page-section alt">
        <div className="container">
          <div className="center-head">
            <h2>{t('how.h2')}</h2>
          </div>

          <h3 className="track-title">{t('how.group.learn')}</h3>
          <ol className="track five">
            {LEARNING_STAGES.map((n) => <Stage n={n} t={t} key={n} />)}
          </ol>

          <h3 className="track-title">{t('how.group.live')}</h3>
          <ol className="track three">
            {LIVELIHOOD_STAGES.map((n) => <Stage n={n} t={t} key={n} />)}
          </ol>

          <div className="notice info" style={{ marginTop: '2.5rem' }}>
            <LifeBuoy size={22} aria-hidden="true" style={{ flexShrink: 0, color: 'var(--forest-green)' }} />
            <p><strong>{t('how.support.strong')}</strong> {t('how.support.text')}</p>
          </div>
        </div>
      </section>

      {/* Video and next step */}
      <section className="page-section">
        <div className="container split">
          <div>
            <h2 style={{ marginTop: 0 }}>{t('how.watch')}</h2>
            <div className="video-placeholder" role="img" aria-label={t('how.video.aria')}>
              <PlayCircle size={56} aria-hidden="true" />
              <strong>{t('how.video.title')}</strong>
              <span>{t('how.video.text')}</span>
            </div>
          </div>
          <div style={{ alignSelf: 'center' }}>
            <div className="notice info">
              <p>{t('how.notice')}</p>
            </div>
            <Link to="/courses" className="btn btn-primary">
              {t('how.seeCourses')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
