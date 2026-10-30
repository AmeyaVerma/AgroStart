import React from 'react';
import { Link } from '../i18n/LocalizedLink';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LEARNING_STAGES, LIVELIHOOD_STAGES, STAGES_WITH_STATUS } from '../data/journey';
import FaqSection from './FaqSection';
import './Pages.css';

// One stage of the learner journey (AgroStart_Learner_Journey document).
function Stage({ n, t }) {
  return (
    <div className="step" role="listitem">
      <div className="step-num" aria-hidden="true">{n}</div>
      <div>
        <h4>{t(`how.s${n}.title`)}</h4>
        <p>{t(`how.s${n}.text`)}</p>
        {STAGES_WITH_STATUS.includes(n) && (
          <p className="stage-status"><strong>{t('how.statusLabel')}</strong> {t(`how.s${n}.status`)}</p>
        )}
      </div>
    </div>
  );
}

export default function HowItWorksPage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <div className="tag">{t('how.tag')}</div>
          <h1>{t('how.h1')}</h1>
          <p>{t('how.p')}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container split">
          <div>
            <h2>{t('how.h2')}</h2>

            <h3 className="stage-group">{t('how.group.learn')}</h3>
            <div className="steps" role="list">
              {LEARNING_STAGES.map((n) => <Stage n={n} t={t} key={n} />)}
            </div>

            <h3 className="stage-group">{t('how.group.live')}</h3>
            <div className="steps" role="list">
              {LIVELIHOOD_STAGES.map((n) => <Stage n={n} t={t} key={n} />)}
            </div>

            <div className="notice info" style={{ marginTop: '1.5rem' }}>
              <p><strong>{t('how.support.strong')}</strong> {t('how.support.text')}</p>
            </div>
          </div>

          <div>
            <h2>{t('how.watch')}</h2>
            <div className="video-placeholder" role="img" aria-label={t('how.video.aria')}>
              <PlayCircle size={56} aria-hidden="true" />
              <strong>{t('how.video.title')}</strong>
              <span>{t('how.video.text')}</span>
            </div>
            <div className="notice info" style={{ marginTop: '1.5rem' }}>
              <p>{t('how.notice')}</p>
            </div>
            <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              {t('how.seeCourses')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}
