import React, { Suspense, lazy, useEffect, useRef } from 'react';
import './App.css';
import './components/Pages.css';
import { Routes, Route, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, Clock, Smartphone, Users, Languages, Home, Timer, ShieldCheck, Sprout, Store } from 'lucide-react';
import { Link } from './i18n/LocalizedLink';
import { useLanguage } from './i18n/LanguageContext';
import { LANG_CODES, splitLang } from './i18n/routing';
import { applyPageMeta } from './i18n/pageMeta';
import { COURSES, FEATURED_COURSE_IDS, getCourse } from './data/courses';
import { LEARNING_STAGES, LIVELIHOOD_STAGES } from './data/journey';
import Contact from './components/Contact';
import CourseCard from './components/CourseCard';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import WhatsAppButton from './components/WhatsAppButton';
import PageBoundary from './components/PageBoundary';

// Every page except Home loads on demand, so the first visit downloads less (slow networks).
const CoursesPage = lazy(() => import('./components/CoursesPage'));
const CourseDetailPage = lazy(() => import('./components/CourseDetailPage'));
const HowItWorksPage = lazy(() => import('./components/HowItWorksPage'));
const ServicesPage = lazy(() => import('./components/ServicesPage'));
const PartnersPage = lazy(() => import('./components/PartnersPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ImpactPage = lazy(() => import('./components/ImpactPage'));
const PathwaysPage = lazy(() => import('./components/PathwaysPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));

// "Why AgroStart": the core problems (problem statement document) and our response.
const WHY = [
  { id: 'w1', icon: Languages },
  { id: 'w2', icon: Home },
  { id: 'w3', icon: Timer },
  { id: 'w4', icon: ShieldCheck },
];

// "Who it is for": the pilot focus groups (target group document).
const WHO = [
  { id: 'g1', icon: Sprout },
  { id: 'g2', icon: Store },
  { id: 'g3', icon: Users },
];

const featured = FEATURED_COURSE_IDS.map((id) => COURSES.find((c) => c.id === id)).filter(Boolean);

function HomePage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-background"></div>
        <div className="container hero-inner">
          <div className="hero-content animate-fade-in-up">
            <div className="tag">{t('home.hero.tag')}</div>
            <h1>{t('home.hero.h1.pre')} <span className="highlight-green">{t('home.hero.h1.highlight')}</span></h1>
            <p>{t('home.hero.p')}</p>
            <div className="hero-actions">
              <Link to="/courses" className="btn btn-primary">{t('home.hero.cta1')} <ArrowRight size={16} /></Link>
              <Link to="/partners" className="btn btn-outline">{t('nav.partnerCta')}</Link>
            </div>
            <p className="hero-langs">{t('home.hero.langs')}</p>

            <ul className="hero-facts">
              <li className="hero-fact"><Clock size={20} aria-hidden="true" /> {t('home.fact1')}</li>
              <li className="hero-fact"><Smartphone size={20} aria-hidden="true" /> {t('home.fact2')}</li>
              <li className="hero-fact"><Users size={20} aria-hidden="true" /> {t('home.fact3')}</li>
            </ul>
          </div>

          <div className="hero-visual animate-fade-in-up delay-200">
            {/* Sample app screens in three languages (illustrative data) */}
            <div className="flower-mockup-container">
              {/* Left - Odia */}
              <div className="mockup-phone glass shadow-lg side-phone left-phone" aria-hidden="true">
                <div className="phone-header">
                  <span>ଶୁଭ ସକାଳ,<br /><strong>ରବି କୁମାର</strong></span>
                  <div className="avatar">RK</div>
                </div>
                <div className="phone-card">
                  <div className="card-title">ଆପଣଙ୍କର ପ୍ରଗତି</div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: '76%' }}></div></div>
                </div>
                <div className="phone-card dark">
                  <div className="card-title text-white">ସମନ୍ୱିତ କୀଟ ପରିଚାଳନା</div>
                  <button className="btn btn-primary btn-small" tabIndex={-1}>ପୁନରାରମ୍ଭ କରନ୍ତୁ</button>
                </div>
                <div className="phone-card shadow-sm" style={{ background: 'white' }}>
                  <div className="card-title">ଅନୁପାଳନ ସ୍କୋର</div>
                  <div className="score-val">92%</div>
                  <span className="badge-green">ଉତ୍କୃଷ୍ଟ</span>
                </div>
                <div className="phone-card shadow-sm" style={{ background: 'white' }}>
                  <div className="card-title">ସକ୍ରିୟ ଉପଭୋକ୍ତା</div>
                  <div className="score-val" style={{ fontSize: '1.5rem' }}>12,846</div>
                  <span className="trend-up">+18% ଏହି ମାସରେ</span>
                </div>
              </div>

              {/* Center - English */}
              <div className="mockup-phone glass shadow-lg center-phone" aria-hidden="true">
                <div className="phone-header">
                  <span>Good morning,<br /><strong>Ravi Kumar</strong></span>
                  <div className="avatar">RK</div>
                </div>
                <div className="phone-card">
                  <div className="card-title">Your Progress</div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: '76%' }}></div></div>
                </div>
                <div className="phone-card dark">
                  <div className="card-title text-white">Integrated Pest Management</div>
                  <button className="btn btn-primary btn-small" tabIndex={-1}>Resume</button>
                </div>
                <div className="phone-card shadow-sm" style={{ background: 'white' }}>
                  <div className="card-title">Compliance Score</div>
                  <div className="score-val">92%</div>
                  <span className="badge-green">Excellent</span>
                </div>
                <div className="phone-card shadow-sm" style={{ background: 'white' }}>
                  <div className="card-title">Active Users</div>
                  <div className="score-val" style={{ fontSize: '1.5rem' }}>12,846</div>
                  <span className="trend-up">+18% this month</span>
                </div>
              </div>

              {/* Right - Hindi */}
              <div className="mockup-phone glass shadow-lg side-phone right-phone" aria-hidden="true">
                <div className="phone-header">
                  <span>सुप्रभात,<br /><strong>रवि कुमार</strong></span>
                  <div className="avatar">RK</div>
                </div>
                <div className="phone-card">
                  <div className="card-title">आपकी प्रगति</div>
                  <div className="progress-bar"><div className="progress-fill" style={{ width: '76%' }}></div></div>
                </div>
                <div className="phone-card dark">
                  <div className="card-title text-white">एकीकृत कीट प्रबंधन</div>
                  <button className="btn btn-primary btn-small" tabIndex={-1}>फिर से शुरू करें</button>
                </div>
                <div className="phone-card shadow-sm" style={{ background: 'white' }}>
                  <div className="card-title">अनुपालन स्कोर</div>
                  <div className="score-val">92%</div>
                  <span className="badge-green">उत्कृष्ट</span>
                </div>
                <div className="phone-card shadow-sm" style={{ background: 'white' }}>
                  <div className="card-title">सक्रिय उपयोगकर्ता</div>
                  <div className="score-val" style={{ fontSize: '1.5rem' }}>12,846</div>
                  <span className="trend-up">+18% इस महीने</span>
                </div>
              </div>
            </div>
            <p className="sample-caption">{t('home.sample')}</p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="page-section band" id="vision">
        <div className="container partner-band">
          <div>
            <div className="tag">{t('vm.vision.h2')}</div>
            <p className="vision-statement" style={{ marginBottom: 0 }}>{t('vm.vision.text')}</p>
          </div>
          <Link to="/about#vision" className="btn btn-outline">{t('home.vision.more')} <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* WHY AGROSTART */}
      <section className="page-section" id="why">
        <div className="container">
          <div className="tag">{t('home.why.tag')}</div>
          <h2>{t('home.why.h2')}</h2>
          <div className="card-grid four" style={{ marginTop: '1.5rem' }}>
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

      {/* WHO IT IS FOR */}
      <section className="page-section alt" id="who">
        <div className="container">
          <div className="tag">{t('home.who.tag')}</div>
          <h2>{t('home.who.h2')}</h2>
          <div className="card-grid fit" style={{ marginTop: '1.5rem' }}>
            {WHO.map(({ id, icon: Icon }) => (
              <div className="info-card" key={id}>
                <div className="icon-wrapper"><Icon size={22} aria-hidden="true" /></div>
                <h3>{t(`home.who.${id}.title`)}</h3>
                <p>{t(`home.who.${id}.text`)}</p>
              </div>
            ))}
          </div>
          <p className="section-intro" style={{ marginTop: '1.5rem' }}>{t('home.who.also')}</p>
          <p>
            <Link to="/about#audience" className="btn btn-outline">{t('home.who.more')} <ArrowRight size={16} /></Link>
          </p>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section className="page-section" id="courses">
        <div className="container">
          <div className="tag">{t('home.courses.tag')}</div>
          <h2>{t('home.courses.h2')}</h2>
          <p className="section-intro">{t('home.courses.note')}</p>
          <div className="card-grid">
            {featured.map((c) => <CourseCard course={c} key={c.id} />)}
          </div>
          <p style={{ marginTop: '2rem' }}>
            <Link to="/courses" className="btn btn-outline">{t('home.courses.all')} <ArrowRight size={16} /></Link>
          </p>
        </div>
      </section>

      {/* LEARNER JOURNEY */}
      <section className="page-section alt" id="how">
        <div className="container">
          <div className="tag">{t('home.how.tag')}</div>
          <h2>{t('home.how.h2')}</h2>

          {[[LEARNING_STAGES, 'how.group.learn', 'learn'], [LIVELIHOOD_STAGES, 'how.group.live', 'live']].map(([stages, label, kind]) => (
            <div className="journey-group" key={kind}>
              <h3 className="stage-group">{t(label)}</h3>
              <ol className={`journey-row journey-${kind}`}>
                {stages.map((n) => (
                  <li className="journey-stage" key={n}>
                    <span className="step-num" aria-hidden="true">{n}</span>
                    <strong>{t(`how.s${n}.title`)}</strong>
                    <span>{t(`how.short.${n}`)}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <p className="journey-support"><strong>{t('how.support.strong')}</strong> {t('how.support.text')}</p>
          <p>
            <Link to="/how-it-works" className="btn btn-outline">{t('home.how.more')} <ArrowRight size={16} /></Link>
          </p>
        </div>
      </section>

      {/* PARTNER CALL TO ACTION */}
      <section className="page-section band" id="partner-cta">
        <div className="container partner-band">
          <div>
            <div className="tag">{t('home.partners.tag')}</div>
            <h2>{t('home.partners.h2')}</h2>
            <p>{t('home.partners.p')}</p>
          </div>
          <Link to="/partners" className="btn btn-primary">{t('nav.partnerCta')} <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* IMPACT: approach and goals. Real, dated numbers will replace the placeholders. */}
      <section className="impact" id="impact">
        <div className="container">
          <div className="section-header center">
            <div className="tag">{t('home.impact.tag')}</div>
            <h2>{t('home.impact.h2')}</h2>
          </div>
          <div className="impact-grid">
            {[1, 3, 4].map((n) => (
              <div className="impact-stat-box shadow-sm glass" key={n}>
                <span className="stat-label">{t(`home.impact.i${n}.label`)}</span>
                <div className="stat-value highlight-green">{t(`home.impact.i${n}.value`)}</div>
                <span className="stat-desc">{t(`home.impact.i${n}.desc`)}</span>
              </div>
            ))}
          </div>
          <p className="illustrative-note">{t('home.impact.note')}</p>
          <p className="impact-more"><Link to="/impact" className="btn btn-outline">{t('home.impact.more')} <ArrowRight size={16} /></Link></p>
        </div>
      </section>

      {/* CONTACT */}
      <Contact />
    </div>
  );
}

function NotFoundPage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      <div className="not-found-page">
        <div className="not-found-inner">
          <div className="not-found-emoji">🌾</div>
          <h1>{t('notfound.title')}</h1>
          <p>{t('notfound.text')}</p>
          <Link to="/" className="btn btn-primary">{t('notfound.back')} <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}

// Page-name keys used to build the browser tab title for each route.
const TITLE_KEYS = {
  '/courses': 'nav.courses',
  '/how-it-works': 'nav.howItWorks',
  '/services': 'nav.services',
  '/partners': 'nav.partners',
  '/about': 'nav.about',
  '/impact': 'nav.impact',
  '/pathways': 'nav.pathways',
  '/privacy': 'legal.privacy.title',
  '/terms': 'legal.terms.title',
  '/refund': 'legal.refund.title',
  '/accessibility': 'legal.accessibility.title',
};

// Shared header, footer and WhatsApp button around every page. It is the element of the
// "/:lang" route, so /hi/..., /or/... and /en/... all come through here. A first path
// segment that is not a supported language (an old link like /courses) is sent to the
// visitor's remembered language, e.g. /courses -> /hi/courses.
function Layout() {
  const { lang: langParam } = useParams();
  const { pathname, search, hash } = useLocation();
  const { t, lang, preferredLang } = useLanguage();
  const valid = LANG_CODES.includes(langParam);
  const rest = splitLang(pathname).rest.replace(/\/+$/, '') || '/';
  const last = useRef({ rest: null, hash: null });

  // Scroll to the anchor or the top, but not when only the language changed.
  useEffect(() => {
    if (!valid) return;
    if (last.current.rest === rest && last.current.hash === hash) return;
    last.current = { rest, hash };
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [valid, rest, hash]);

  // Title, description, canonical and language alternates for this page.
  useEffect(() => {
    if (!valid) return;
    const site = t('meta.siteTitle');
    const courseId = rest.match(/^\/courses\/([^/]+)$/)?.[1];
    let page = null;
    let description = t('footer.tagline');
    if (courseId && getCourse(courseId)) {
      page = t(`courses.${courseId}.title`);
      description = t(`courses.${courseId}.blurb`);
    } else if (TITLE_KEYS[rest]) {
      page = t(TITLE_KEYS[rest]);
    } else if (rest !== '/') {
      page = t('notfound.title');
    }
    applyPageMeta({ title: page ? `${page} | ${site}` : site, description, lang, rest });
  }, [valid, t, lang, rest]);

  if (!valid) return <Navigate to={`/${preferredLang}${pathname}${search}${hash}`} replace />;

  const skipToMain = (e) => {
    e.preventDefault();
    const main = document.getElementById('main');
    main?.focus();
    main?.scrollIntoView();
  };

  return (
    <>
      <a href="#main" className="skip-link" onClick={skipToMain}>{t('a11y.skip')}</a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <PageBoundary resetKey={pathname}>
          <Suspense fallback={<p className="page-loading" role="status">{t('a11y.loading')}</p>}>
            <Outlet />
          </Suspense>
        </PageBoundary>
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}

function RootRedirect() {
  const { preferredLang } = useLanguage();
  return <Navigate to={`/${preferredLang}`} replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="courses" element={<CoursesPage />} />
        <Route path="courses/:id" element={<CourseDetailPage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="partners" element={<PartnersPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="pathways" element={<PathwaysPage />} />
        <Route path="privacy" element={<LegalPage pageKey="privacy" />} />
        <Route path="terms" element={<LegalPage pageKey="terms" />} />
        <Route path="refund" element={<LegalPage pageKey="refund" />} />
        <Route path="accessibility" element={<LegalPage pageKey="accessibility" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
