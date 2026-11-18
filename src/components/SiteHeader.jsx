import React, { useState } from 'react';
import { Link, NavLink } from '../i18n/LocalizedLink';
import { Menu, X, BookOpen, ListChecks, Compass, Briefcase, Library, Handshake, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import logoMark from '../assets/logo-mark.webp';
import LanguageSwitcher from './LanguageSwitcher';
import './SiteChrome.css';

// Every link has an icon so people who read little can still find their way (brief, section 4).
// Menu follows the website framework; Services stays as its own page. About, Impact and
// Learning pathways are reached from the footer and from links on the pages.
const NAV = [
  { to: '/courses', key: 'nav.courses', icon: BookOpen },
  { to: '/how-it-works', key: 'nav.howItWorks', icon: ListChecks },
  { to: '/programmes', key: 'nav.programmes', icon: Compass },
  { to: '/services', key: 'nav.services', icon: Briefcase },
  { to: '/resources', key: 'nav.resources', icon: Library },
  { to: '/partners', key: 'nav.partnerCta', icon: Handshake },
  { to: '/contact', key: 'nav.contactUs', icon: Mail },
];

export default function SiteHeader() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

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
          {NAV.map(renderLink)}
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
          {NAV.map(renderLink)}
          <div className="mobile-nav-actions">
            <Link to="/courses" className="btn btn-primary" onClick={close}>{t('nav.explore')}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
