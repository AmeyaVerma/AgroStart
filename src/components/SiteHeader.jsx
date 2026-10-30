import React, { useState } from 'react';
import { Link, NavLink } from '../i18n/LocalizedLink';
import { Menu, X, BookOpen, ListChecks, Briefcase, Handshake, Info, TrendingUp, Milestone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import logoMark from '../assets/logo-mark.webp';
import LanguageSwitcher from './LanguageSwitcher';
import './SiteChrome.css';

// Every link has an icon so people who read little can still find their way (brief, section 4).
const PRIMARY_NAV = [
  { to: '/courses', key: 'nav.courses', icon: BookOpen },
  { to: '/how-it-works', key: 'nav.howItWorks', icon: ListChecks },
  { to: '/services', key: 'nav.services', icon: Briefcase },
  { to: '/partners', key: 'nav.partners', icon: Handshake },
  { to: '/about', key: 'nav.about', icon: Info },
];

// Impact and Pathways sit in the bar with the rest.
const MORE_NAV = [
  { to: '/impact', key: 'nav.impact', icon: TrendingUp },
  { to: '/pathways', key: 'nav.pathways', icon: Milestone },
];

const ALL_NAV = [...PRIMARY_NAV, ...MORE_NAV];

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
          {ALL_NAV.map(renderLink)}
        </nav>

        <div className="header-actions">
          <Link to="/#contact" className="btn btn-outline">{t('nav.consultation')}</Link>
          <Link to="/partners" className="btn btn-primary">{t('nav.partnerCta')}</Link>
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
            <Link to="/#contact" className="btn btn-outline" onClick={close}>{t('nav.consultation')}</Link>
            <Link to="/partners" className="btn btn-primary" onClick={close}>{t('nav.partnerCta')}</Link>
          </div>
        </div>
      )}
    </header>
  );
}
