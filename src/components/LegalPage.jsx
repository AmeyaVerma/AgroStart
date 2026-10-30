import React from 'react';
import { Link } from '../i18n/LocalizedLink';
import { SITE } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';

// DRAFT TEXT ONLY. The wording lives in src/i18n/*.js ("legal.*"). Every policy must be
// reviewed by legal counsel and confirmed by AgroStart before publishing.
// Line format: 'h:' heading, 'p:' paragraph, 'l:' list item. {email} / {legal} are filled
// in here, and [[text]] marks an open decision (highlighted).

// Turns one line of text into React nodes: [[open decision]] and {email}.
function renderInline(text) {
  return text.split(/(\[\[.*?\]\]|\{email\})/g).map((part, i) => {
    if (part === '{email}') return <a key={i} href={`mailto:${SITE.email}`}>{SITE.email}</a>;
    if (part.startsWith('[[')) return <span key={i} className="tbc">[{part.slice(2, -2)}]</span>;
    return part;
  });
}

// Groups consecutive list lines into one <ul>.
function renderBody(lines) {
  const out = [];
  let list = [];
  const flush = () => {
    if (list.length) { out.push(<ul key={`ul-${out.length}`}>{list}</ul>); list = []; }
  };
  lines.forEach((raw, i) => {
    const kind = raw.slice(0, 2);
    const text = raw.slice(2).split('{legal}').join(SITE.legalName);
    if (kind === 'l:') { list.push(<li key={i}>{renderInline(text)}</li>); return; }
    flush();
    if (kind === 'h:') out.push(<h2 key={i}>{text}</h2>);
    else out.push(<p key={i}>{renderInline(text)}</p>);
  });
  flush();
  return out;
}

export default function LegalPage({ pageKey }) {
  const { t } = useLanguage();
  return (
    <div className="app">
      <section className="page-hero">
        <div className="container">
          <div className="tag">{t('legal.tag')}</div>
          <h1>{t(`legal.${pageKey}.title`)}</h1>
          <p>{t(`legal.${pageKey}.intro`)}</p>
        </div>
      </section>
      <section className="page-section">
        <div className="container">
          <div className="prose">
            <div className="notice" role="note">
              <strong>{t('legal.draft.strong')}</strong>
              <p>{t('legal.draft.text')}</p>
            </div>
            {renderBody(t(`legal.${pageKey}.body`))}
            <p style={{ marginTop: '2rem' }}>
              <Link to="/">{t('legal.back')}</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
