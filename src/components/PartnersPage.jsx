import React, { useState } from 'react';
import { GraduationCap, HandCoins, Sprout, Building2, Download, Send, UserCog, Users, Wallet, Handshake, Landmark } from 'lucide-react';
import { SITE } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import ConsentCheckbox from './ConsentCheckbox';
import useFormErrors, { errorProps } from './useFormErrors';
import { FieldError, FormErrorSummary } from './FieldError';
import './Pages.css';
import './Contact.css';

// The `en` strings are what gets written into the enquiry email (always English, so the
// AgroStart team can read it). On screen, labels come from the dictionaries.
const SEGMENTS = [
  { id: 'academic', en: 'Academic institutions', icon: <GraduationCap size={22} /> },
  { id: 'csr', en: 'CSR and government programmes', icon: <HandCoins size={22} /> },
  { id: 'fpo', en: 'Farmer Producer Organisations (FPOs)', icon: <Sprout size={22} /> },
  { id: 'company', en: 'Agri companies', icon: <Building2 size={22} /> },
  { id: 'field', en: 'Extension and field staff', icon: <UserCog size={22} /> },
];

const WAYS = [
  { id: 'enrol', icon: <Users size={22} aria-hidden="true" /> },
  { id: 'sponsor', icon: <Wallet size={22} aria-hidden="true" /> },
  { id: 'deliver', icon: <Handshake size={22} aria-hidden="true" /> },
];

const INTERESTS = [
  { id: 'custom', en: 'Customised programme' },
  { id: 'group', en: 'Group enrolment for an FPO' },
  { id: 'sponsored', en: 'Sponsored learner seats' },
  { id: 'tot', en: 'Training of Trainers' },
  { id: 'unsure', en: 'Not sure yet' },
];

const TIMELINES = [
  { id: '1', en: 'Within 1 month' },
  { id: '2', en: '1 to 3 months' },
  { id: '3', en: '3 to 6 months' },
  { id: '4', en: 'Just exploring' },
];

const EMPTY = { name: '', email: '', organisation: '', type: SEGMENTS[0].en, interest: INTERESTS[0].en, groupSize: '', location: '', timeline: TIMELINES[0].en, message: '' };

export default function PartnersPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const { errors, validate, clear, reset, count } = useFormErrors();
  const change = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    clear(e.target.name);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
    const subject = encodeURIComponent(`Partner enquiry from ${form.organisation}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.organisation}\nType: ${form.type}\n` +
      `Programme interest: ${form.interest}\nLearner group size: ${form.groupSize}\nLocation: ${form.location}\n` +
      `Timeline: ${form.timeline}\n\n${form.message}`,
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const field = (id, label, props = {}) => (
    <div className="form-group">
      <label htmlFor={`p-${id}`}>{label}</label>
      <input id={`p-${id}`} name={id} value={form[id]} onChange={change} {...props} {...errorProps(`p-${id}`, errors[id])} />
      <FieldError id={`p-${id}`} message={errors[id]} />
    </div>
  );

  const select = (id, label, options, keyOf) => (
    <div className="form-group">
      <label htmlFor={`p-${id}`}>{label}</label>
      <select id={`p-${id}`} name={id} value={form[id]} onChange={change}>
        {options.map((o) => <option key={o.id} value={o.en}>{t(keyOf(o.id))}</option>)}
      </select>
    </div>
  );

  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <div className="tag">{t('partners.tag')}</div>
          <h1>{t('partners.h1')}</h1>
          <p>{t('partners.p')}</p>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <h2>{t('partners.who')}</h2>
          <div className="card-grid three" style={{ marginTop: '1.5rem' }}>
            {SEGMENTS.map((s) => (
              <div className="info-card" key={s.id}>
                <div className="icon-wrapper">{s.icon}</div>
                <h3>{t(`partners.seg.${s.id}.title`)}</h3>
                <p>{t(`partners.seg.${s.id}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section alt">
        <div className="container">
          <h2>{t('partners.why.h2')}</h2>
          <div className="card-grid fit" style={{ marginTop: '1.5rem' }}>
            <div className="info-card">
              <div className="icon-wrapper"><Landmark size={22} aria-hidden="true" /></div>
              <h3>{t('partners.why.inst.title')}</h3>
              <p>{t('partners.why.inst.text')}</p>
            </div>
            <div className="info-card">
              <div className="icon-wrapper"><HandCoins size={22} aria-hidden="true" /></div>
              <h3>{t('partners.why.gov.title')}</h3>
              <p>{t('partners.why.gov.text')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <h2>{t('partners.ways.h2')}</h2>
          <div className="card-grid fit" style={{ marginTop: '1.5rem' }}>
            {WAYS.map((w) => (
              <div className="info-card" key={w.id}>
                <div className="icon-wrapper">{w.icon}</div>
                <h3>{t(`partners.ways.${w.id}.title`)}</h3>
                <p>{t(`partners.ways.${w.id}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section alt" id="enquiry">
        <div className="container split">
          <div>
            <h2>{t('partners.formTitle')}</h2>
            <p className="section-intro">{t('partners.formIntro')}</p>
            {/* TODO: link the real proposal deck PDF here once AgroStart provides it. */}
            <span className="btn btn-outline disabled" aria-disabled="true"><Download size={16} /> {t('partners.deck')}</span>
          </div>

          <div className="contact-form-card shadow-lg">
            {submitted ? (
              <div className="form-success" role="status">
                <h4>{t('partners.thanks')}</h4>
                <p>{t('partners.thanksText')}</p>
                <button type="button" className="btn btn-primary" onClick={() => { setSubmitted(false); setForm(EMPTY); reset(); }}>{t('partners.sendAnother')}</button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit} noValidate>
                {field('name', t('partners.f.name'), { required: true, autoComplete: 'name' })}
                {field('email', t('partners.f.email'), { type: 'email', required: true, autoComplete: 'email' })}
                {field('organisation', t('partners.f.org'), { required: true, autoComplete: 'organization' })}
                {select('type', t('partners.f.type'), SEGMENTS, (id) => `partners.seg.${id}.title`)}
                {select('interest', t('partners.f.interest'), INTERESTS, (id) => `partners.int.${id}`)}
                {field('groupSize', t('partners.f.size'), { inputMode: 'numeric', placeholder: t('partners.f.sizePh') })}
                {field('location', t('partners.f.location'), { required: true })}
                {select('timeline', t('partners.f.timeline'), TIMELINES, (id) => `partners.time.${id}`)}
                <div className="form-group">
                  <label htmlFor="p-message">{t('partners.f.message')}</label>
                  <textarea id="p-message" name="message" rows="3" value={form.message} onChange={change}></textarea>
                </div>
                <ConsentCheckbox id="partners-consent" error={errors.consent} onChange={() => clear('consent')} />
                <FormErrorSummary count={count} />
                <button type="submit" className="btn btn-primary btn-submit">{t('partners.send')} <Send size={16} /></button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
