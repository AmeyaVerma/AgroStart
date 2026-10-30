import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// One field's error: warning icon + words (never colour alone). Linked to its input with
// aria-describedby={`${id}-error`}; the "Error:" prefix is read out by screen readers.
export function FieldError({ id, message }) {
  const { t } = useLanguage();
  if (!message) return null;
  return (
    <p className="field-error" id={`${id}-error`}>
      <AlertCircle size={16} aria-hidden="true" />
      <span><span className="sr-only">{t('form.errorLabel')}: </span>{message}</span>
    </p>
  );
}

// Summary shown above the submit button once a submit attempt found problems.
export function FormErrorSummary({ count }) {
  const { t } = useLanguage();
  if (!count) return null;
  return (
    <p className="form-error-summary" role="alert">
      <AlertCircle size={18} aria-hidden="true" /> {t('form.errorSummary')}
    </p>
  );
}

