import React, { useState } from 'react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import './SiteChrome.css';

const KEY = 'agrostart-notice-ok';

const wasDismissed = () => {
  try { return localStorage.getItem(KEY) === '1'; } catch { return false; }
};

// Small notice about what the site stores. Only the language choice and offline files are
// kept, so there is nothing to accept or refuse; the button just hides the notice.
export default function CookieNotice() {
  const { t } = useLanguage();
  const [hidden, setHidden] = useState(wasDismissed);
  if (hidden) return null;

  const dismiss = () => {
    try { localStorage.setItem(KEY, '1'); } catch { /* storage may be blocked */ }
    setHidden(true);
  };

  return (
    <div className="cookie-notice" role="region" aria-label={t('cookie.aria')}>
      <p>
        {t('cookie.text')}{' '}
        <Link to="/privacy">{t('footer.privacy')}</Link>
      </p>
      <button type="button" className="btn btn-primary" onClick={dismiss}>{t('cookie.ok')}</button>
    </div>
  );
}
