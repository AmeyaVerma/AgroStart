import React from 'react';
import { Link } from '../i18n/LocalizedLink';
import { useLanguage } from '../i18n/LanguageContext';
import { FieldError } from './FieldError';
import { errorProps } from './useFormErrors';

// "I agree..." checkbox for forms that collect personal details (DPDP Act, 2023).
// The sentence comes from the dictionaries; {link} marks where the privacy-policy link goes.
export default function ConsentCheckbox({ id, error, onChange }) {
  const { t } = useLanguage();
  const [before, after] = t('consent.text').split('{link}');
  return (
    <div className="form-group consent">
      <label className="consent-label" htmlFor={id}>
        <input id={id} type="checkbox" name="consent" required onChange={onChange} {...errorProps(id, error)} />
        <span>
          {before}
          <Link to="/privacy" target="_blank" rel="noopener noreferrer">{t('consent.link')}</Link>
          {after}
        </span>
      </label>
      <FieldError id={id} message={error} />
    </div>
  );
}
