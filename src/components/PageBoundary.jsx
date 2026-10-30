import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

function LoadError({ onRetry }) {
  const { t } = useLanguage();
  return (
    <div className="page-error" role="alert">
      <AlertCircle size={40} aria-hidden="true" />
      <p>{t('a11y.loadError')}</p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>{t('a11y.retry')}</button>
    </div>
  );
}

// Catches a page that fails to load (for example on a patchy network) and offers a retry
// instead of a blank screen (brief, section 8: "clear loading and retry states").
export default class PageBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false, key: props.resetKey };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  static getDerivedStateFromProps(props, state) {
    // Moving to another page clears the error.
    return props.resetKey !== state.key ? { failed: false, key: props.resetKey } : null;
  }

  render() {
    if (this.state.failed) return <LoadError onRetry={() => window.location.reload()} />;
    return this.props.children;
  }
}
