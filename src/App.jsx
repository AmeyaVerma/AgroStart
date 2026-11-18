import React, { Suspense, lazy, useEffect, useRef } from 'react';
import './App.css';
import './components/Pages.css';
import { Routes, Route, Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Link } from './i18n/LocalizedLink';
import { useLanguage } from './i18n/LanguageContext';
import { LANG_CODES, splitLang } from './i18n/routing';
import { applyPageMeta } from './i18n/pageMeta';
import { getCourse } from './data/courses';
import HomePage from './components/HomePage';
import CookieNotice from './components/CookieNotice';
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
const ProgrammesPage = lazy(() => import('./components/ProgrammesPage'));
const ResourcesPage = lazy(() => import('./components/ResourcesPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));

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
  '/programmes': 'nav.programmes',
  '/resources': 'nav.resources',
  '/contact': 'nav.contact',
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
      <CookieNotice />
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
        <Route path="programmes" element={<ProgrammesPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="contact" element={<ContactPage />} />
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
