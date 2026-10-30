import React from 'react';
import { Link } from '../i18n/LocalizedLink';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { SITE, whatsappLink } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import './SiteChrome.css';
import logoMark from '../assets/logo-mark.webp';

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-name">
              <img className="footer-logo" src={logoMark} alt="" width="44" height="44" />
              <span>AgroStart</span>
            </div>
            <p>{t('footer.tagline')}</p>
            <ul className="footer-contact">
              <li><MapPin size={16} aria-hidden="true" /> {t('site.location')}</li>
              <li><Phone size={16} aria-hidden="true" /> <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></li>
              <li><Mail size={16} aria-hidden="true" /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li>
                <MessageCircle size={16} aria-hidden="true" />{' '}
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{t('whatsapp.label')}</a>
              </li>
            </ul>
          </div>

          <nav className="footer-col" aria-label={t('footer.learn')}>
            <h2 className="footer-heading">{t('footer.learn')}</h2>
            <Link to="/courses">{t('footer.courses')}</Link>
            <Link to="/pathways">{t('footer.pathways')}</Link>
            <Link to="/how-it-works">{t('footer.howItWorks')}</Link>
          </nav>

          <nav className="footer-col" aria-label={t('footer.partners')}>
            <h2 className="footer-heading">{t('footer.partners')}</h2>
            <Link to="/partners">{t('footer.forPartners')}</Link>
            <Link to="/services">{t('footer.services')}</Link>
            <Link to="/impact">{t('footer.impact')}</Link>
            <Link to="/#contact">{t('footer.contact')}</Link>
          </nav>

          <nav className="footer-col" aria-label={t('footer.company')}>
            <h2 className="footer-heading">{t('footer.company')}</h2>
            <Link to="/about">{t('footer.about')}</Link>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
            <Link to="/refund">{t('footer.refund')}</Link>
            <Link to="/accessibility">{t('footer.accessibility')}</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {SITE.legalName}, {t('site.location')}</span>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
