import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Contact from './Contact';
import FaqSection from './FaqSection';
import './Pages.css';
import './Polish.css';

// Contact and support (website framework): enquiry form, email, phone, WhatsApp, address
// with map link, and the FAQ.
export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <h1>{t('nav.contact')}</h1>
          <p>{t('contact.page.p')}</p>
        </div>
      </section>
      <Contact />
      <FaqSection />
    </div>
  );
}
