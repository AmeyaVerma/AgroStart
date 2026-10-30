import React, { useState } from 'react';
import './Contact.css';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2 } from 'lucide-react';
import { SITE, whatsappLink } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import ConsentCheckbox from './ConsentCheckbox';
import useFormErrors, { errorProps } from './useFormErrors';
import { FieldError, FormErrorSummary } from './FieldError';

const InstagramIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const TwitterIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const LinkedinIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>);

const MAP_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.location)}`;

// Social links are only shown once a real address is set in siteConfig.js.
const SOCIAL = [
  { label: 'Instagram', url: SITE.instagram, icon: <InstagramIcon /> },
  { label: 'Twitter', url: SITE.twitter, icon: <TwitterIcon /> },
  { label: 'LinkedIn', url: SITE.linkedin, icon: <LinkedinIcon /> },
].filter((s) => s.url);

const Contact = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { errors, validate, clear, reset, count } = useFormErrors();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    clear(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;

    // The email to the AgroStart team is always written in English.
    const subject = encodeURIComponent(`AgroStart Enquiry from ${form.name} — ${form.company}`);
    const body = encodeURIComponent(
      `Full Name: ${form.name}\n` +
      `Work Email: ${form.email}\n` +
      `Company: ${form.company}\n\n` +
      `How can we help?\n${form.message}`
    );

    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const field = (name, labelKey, phKey, props = {}) => {
    const id = `contact-${name}`;
    const Tag = props.textarea ? 'textarea' : 'input';
    return (
      <div className="form-group">
        <label htmlFor={id}>{t(labelKey)}</label>
        <Tag
          id={id}
          name={name}
          placeholder={t(phKey)}
          value={form[name]}
          onChange={handleChange}
          required
          {...(props.textarea ? { rows: 4 } : { type: props.type || 'text' })}
          {...errorProps(id, errors[name])}
        />
        <FieldError id={id} message={errors[name]} />
      </div>
    );
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="contact-inner">

          <div className="contact-info">
            <div className="tag">{t('contact.tag')}</div>
            <h2>{t('contact.h2')}</h2>
            <p className="contact-lead">{t('contact.lead')}</p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon"><Mail size={20} aria-hidden="true" /></div>
                <div>
                  <h3>{t('contact.email')}</h3>
                  <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon"><Phone size={20} aria-hidden="true" /></div>
                <div>
                  <h3>{t('contact.call')}</h3>
                  <p><a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon"><MessageCircle size={20} aria-hidden="true" /></div>
                <div>
                  <h3>{t('contact.whatsapp')}</h3>
                  <p><a href={whatsappLink()} target="_blank" rel="noopener noreferrer">{t('contact.whatsappLink')}</a></p>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon"><MapPin size={20} aria-hidden="true" /></div>
                <div>
                  <h3>{t('contact.visit')}</h3>
                  <p>
                    {t('contact.address.1')}<br />{t('contact.address.2')}<br />
                    <a href={MAP_URL} target="_blank" rel="noopener noreferrer">{t('contact.map')}</a>
                  </p>
                </div>
              </div>
            </div>

            {SOCIAL.length > 0 && (
              <div className="social-links">
                {SOCIAL.map((s) => (
                  <a key={s.label} href={s.url} className="social-btn" target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="contact-form-card glass shadow-lg">
            <h3>{t('contact.formTitle')}</h3>

            {submitted ? (
              <div className="form-success" role="status">
                <div className="form-success-icon"><CheckCircle2 size={44} aria-hidden="true" /></div>
                <h4>{t('contact.sentTitle')}</h4>
                <p>{t('contact.sentText')}</p>
                <button className="btn btn-primary" onClick={() => { setSubmitted(false); reset(); }}>{t('contact.sendAnother')}</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                {field('name', 'contact.name', 'contact.namePh')}
                {field('email', 'contact.workEmail', 'contact.workEmailPh', { type: 'email' })}
                {field('company', 'contact.company', 'contact.companyPh')}
                {field('message', 'contact.help', 'contact.helpPh', { textarea: true })}

                <ConsentCheckbox id="contact-consent" error={errors.consent} onChange={() => clear('consent')} />

                <FormErrorSummary count={count} />
                <button type="submit" className="btn btn-primary btn-submit">
                  {t('contact.submit')} <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
