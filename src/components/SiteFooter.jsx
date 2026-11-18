import React, { useState } from 'react';
import { Link } from '../i18n/LocalizedLink';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { SITE, whatsappLink } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import './SiteChrome.css';
import logoMark from '../assets/logo-mark.webp';

const EMAIL_RE = /^[^s@]+@[^s@]+.[^s@]+$/;

export default function SiteFooter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  // No back end yet: the sign-up opens the visitor's email app, like the other forms.
  const subscribe = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) { setError(true); return; }
    setError(false);
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Newsletter sign-up')}&body=${encodeURIComponent('Please add this email to the AgroStart newsletter: ' + email.trim())}`;
  };

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
            <form className="footer-news" onSubmit={subscribe} noValidate>
              <h2 className="footer-heading">{t('footer.news.h')}</h2>
              <p>{t('footer.news.p')}</p>
              <label htmlFor="news-email" className="sr-only">{t('footer.news.label')}</label>
              <div className="footer-news-row">
                <input
                  id="news-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('footer.news.label')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={error}
                  aria-describedby={error ? 'news-error' : undefined}
                />
                <button type="submit" className="btn btn-primary">{t('footer.news.btn')}</button>
              </div>
              {error && <p id="news-error" className="footer-news-error" role="alert">{t('footer.news.error')}</p>}
              <p className="footer-news-note">{t('footer.news.note')}</p>
            </form>
          </div>

          <nav className="footer-col" aria-label={t('footer.learn')}>
            <h2 className="footer-heading">{t('footer.learn')}</h2>
            <Link to="/courses">{t('footer.courses')}</Link>
            <Link to="/pathways">{t('footer.pathways')}</Link>
            <Link to="/how-it-works">{t('footer.howItWorks')}</Link>
            <Link to="/resources">{t('footer.resources')}</Link>
          </nav>

          <nav className="footer-col" aria-label={t('footer.partners')}>
            <h2 className="footer-heading">{t('footer.partners')}</h2>
            <Link to="/partners">{t('footer.forPartners')}</Link>
            <Link to="/programmes">{t('footer.programmes')}</Link>
            <Link to="/services">{t('footer.services')}</Link>
            <Link to="/impact">{t('footer.impact')}</Link>
            <Link to="/contact">{t('footer.contact')}</Link>
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
