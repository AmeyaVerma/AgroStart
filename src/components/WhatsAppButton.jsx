import React from 'react';
import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../siteConfig';
import { useLanguage } from '../i18n/LanguageContext';
import './SiteChrome.css';

export default function WhatsAppButton() {
  const { t } = useLanguage();
  return (
    <aside aria-label={t('whatsapp.aria')}>
      <a
        className="whatsapp-fab"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={26} aria-hidden="true" />
        <span className="whatsapp-fab-label">{t('whatsapp.label')}</span>
      </a>
    </aside>
  );
}
