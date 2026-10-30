import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import { localize } from '../i18n/routing';
import { getCourse } from '../data/courses';
import { SITE } from '../siteConfig';
import './Pages.css';

export default function CourseDetailPage() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const course = getCourse(id);

  // Course structured data for search engines (schema.org/Course). No price or rating is
  // included because the real prices are not confirmed yet.
  useEffect(() => {
    if (!course) return undefined;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.courseLd = 'true';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: t(`courses.${id}.title`),
      description: t(`courses.${id}.blurb`),
      inLanguage: lang,
      url: `${SITE.url}${localize(lang, `/courses/${id}`)}`,
      provider: { '@type': 'Organization', name: SITE.legalName, url: SITE.url },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [course, id, lang, t]);

  if (!course) {
    return (
      <div className="app">
        <section className="page-section">
          <div className="container">
            <h1>{t('course.notFound')}</h1>
            <Link to="/courses" className="btn btn-primary"><ArrowLeft size={16} /> {t('course.back')}</Link>
          </div>
        </section>
      </div>
    );
  }

  const title = t(`courses.${id}.title`);
  const pageUrl = `${SITE.url}${localize(lang, `/courses/${id}`)}`;
  const shareLink = `https://wa.me/?text=${encodeURIComponent(`${t('course.shareText', { title })} ${pageUrl}`)}`;
  const isFree = course.price === 'Free';

  const rows = [
    [t('course.duration'), t('courses.hours', { n: course.hours })],
    [t('course.mode'), t(`opt.${course.mode}`)],
    [t('course.level'), t(`opt.${course.level}`)],
    [t('course.languages'), course.languages.map((l) => t(`opt.${l}`)).join(', ')],
    [t('course.audience'), course.audience.map((a) => t(`aud.${a}`)).join(', ')],
    [t('course.price'), isFree ? t('course.priceFree') : t('course.priceTbc')],
    [t('course.trainer'), t('course.trainerTbc')],
    [t('course.certificate'), t('course.certificateText')],
    [t('course.prereq'), t('course.prereqNone')],
  ];

  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <Link to="/courses" className="back-link"><ArrowLeft size={16} aria-hidden="true" /> {t('course.back')}</Link>
          <div className="pill-row">
            <span className="pill sample">{t('courses.sample')}</span>
            <span className={`pill${isFree ? ' free' : ''}`}>{t(`opt.${course.price}`)}</span>
            <span className="pill">{t(`opt.${course.topic}`)}</span>
          </div>
          <h1>{title}</h1>
          <p>{t(`courses.${id}.blurb`)}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container split course-detail">
          <div>
            <div className="notice" role="note"><p>{t('course.sampleNote')}</p></div>

            <h2>{t('course.outcomes')}</h2>
            <ul className="check-list">
              {[1, 2].map((n) => (
                <li key={n}><CheckCircle2 size={20} aria-hidden="true" /> {t(`courses.${id}.o${n}`)}</li>
              ))}
            </ul>

            <h2>{t('course.syllabus')}</h2>
            <p className="section-intro">{t('course.lessons')}</p>
            <div className="steps" role="list">
              {[1, 2, 3].map((n) => (
                <div className="step" role="listitem" key={n}>
                  <div className="step-num" aria-hidden="true">{n}</div>
                  <div>
                    <h3>{t('course.module', { n })}</h3>
                    <p>{t(`courses.${id}.m${n}`)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="info-card course-aside" aria-label={t('course.details')}>
            <h2>{t('course.details')}</h2>
            <dl className="detail-list">
              {rows.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
            <Link to="/#contact" className="btn btn-primary">{t('courses.register')} <ArrowRight size={16} /></Link>
            <a href={shareLink} className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} aria-hidden="true" /> {t('course.share')}
            </a>
          </aside>
        </div>
      </section>
    </div>
  );
}
