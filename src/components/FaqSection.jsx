import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import './Pages.css';

const FAQ_IDS = [1, 2, 3, 4, 5, 6, 7];

// Frequently asked questions, shown at the bottom of the How it Works page.
export default function FaqSection() {
  const { t, lang } = useLanguage();

  // FAQ structured data (schema.org/FAQPage)
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.faqLd = 'true';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: lang,
      mainEntity: FAQ_IDS.map((n) => ({
        '@type': 'Question',
        name: t(`faq.q${n}`),
        acceptedAnswer: { '@type': 'Answer', text: t(`faq.a${n}`) },
      })),
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [t, lang]);

  return (
    <section className="page-section alt" id="faq">
      <div className="container faq-wrap">
        <h2>{t('faq.h2')}</h2>
        <div className="faq-list">
          {FAQ_IDS.map((n) => (
            <details className="faq-item" key={n}>
              <summary>{t(`faq.q${n}`)}</summary>
              <p>{t(`faq.a${n}`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
