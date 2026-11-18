import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, NavLink } from '../i18n/LocalizedLink';
import { Menu, X, ChevronDown, BookOpen, ListChecks, Compass, Briefcase, Library, Handshake, Info, TrendingUp, Milestone, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { splitLang } from '../i18n/routing';
import logoMark from '../assets/logo-mark.webp';
import LanguageSwitcher from './LanguageSwitcher';
import './SiteChrome.css';

// Every link has an icon so people who read little can still find their way (brief, section 4).
// Menu follows the website framework; Services stays as its own page.
const PRIMARY_NAV = [
  { to: '/courses', key: 'nav.courses', icon: BookOpen },
  { to: '/how-it-works', key: 'nav.howItWorks', icon: ListChecks },
  { to: '/programmes', key: 'nav.programmes', icon: Compass },
  { to: '/services', key: 'nav.services', icon: Briefcase },
  { to: '/resources', key: 'nav.resources', icon: Library },
  { to: '/partners', key: 'nav.partnerCta', icon: Handshake },
];

// "About" opens a short list; the mobile menu shows every link.
const ABOUT_NAV = [
  { to: '/about', key: 'nav.aboutUs', icon: Info },
  { to: '/impact', key: 'nav.impact', icon: TrendingUp },
  { to: '/pathways', key: 'nav.pathways', icon: Milestone },
  { to: '/contact', key: 'nav.contact', icon: Mail },
];
const ABOUT_PATHS = ABOUT_NAV.map((i) => i.to);
const ALL_NAV = [...PRIMARY_NAV, ...ABOUT_NAV];

export default function SiteHeader() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutRef = useRef(null);
  const close = () => { setOpen(false); setAboutOpen(false); };
  const aboutActive = ABOUT_PATHS.includes(splitLang(pathname).rest.replace(/\/+$/, ''));

  // Close the "About" menu on outside click or Escape.
  useEffect(() => {
    if (!aboutOpen) return undefined;
    const onClick = (e) => { if (aboutRef.current && !aboutRef.current.contains(e.target)) setAboutOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setAboutOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [aboutOpen]);

  const renderLink = (item) => (
    <NavLink key={item.to} to={item.to} onClick={close}>
      <item.icon size={18} aria-hidden="true" />
      <span>{t(item.key)}</span>
    </NavLink>
  );

  return (
    <header className="header glass">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={close}>
          <img className="logo-mark" src={logoMark} alt="" width="72" height="72" />
          <div className="logo-text">
            <span className="logo-title">AgroStart</span>
            <span className="logo-subtitle">{t('brand.subtitle')}</span>
          </div>
        </Link>

        <nav className="nav" aria-label={t('nav.main')}>
          {PRIMARY_NAV.map(renderLink)}
          <div className="nav-more" ref={aboutRef}>
            <button
              type="button"
              className={`nav-more-btn${aboutActive ? ' active' : ''}`}
              aria-expanded={aboutOpen}
              aria-haspopup="true"
              onClick={() => setAboutOpen((o) => !o)}
            >
              {t('nav.about')} <ChevronDown size={14} aria-hidden="true" />
            </button>
            {aboutOpen && <div className="nav-more-menu">{ABOUT_NAV.map(renderLink)}</div>}
          </div>
        </nav>

        <div className="header-actions">
          <Link to="/courses" className="btn btn-primary">{t('nav.explore')}</Link>
        </div>

        <LanguageSwitcher />

        <button
          className="hamburger-btn"
          onClick={() => setOpen((o) => !o)}
          aria-label={t('nav.menu')}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="mobile-nav-drawer">
          {ALL_NAV.map(renderLink)}
          <div className="mobile-nav-actions">
            <Link to="/courses" className="btn btn-primary" onClick={close}>{t('nav.explore')}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
