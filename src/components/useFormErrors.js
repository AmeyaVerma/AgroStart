import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

// Shows form problems as visible text with a warning icon (see FieldError), instead of the
// browser's own pop-up, so the message never depends on colour alone and is translated.
// Usage: put `noValidate` on the <form>, call validate(e.currentTarget) on submit, and call
// clear(name) when a field changes.
export default function useFormErrors() {
  const { t } = useLanguage();
  const [errors, setErrors] = useState({});

  const validate = (form) => {
    const next = {};
    let first = null;
    Array.from(form.elements).forEach((el) => {
      if (!el.name || !el.willValidate || el.validity.valid) return;
      if (el.type === 'checkbox') next[el.name] = t('form.consentRequired');
      else if (el.validity.typeMismatch) next[el.name] = t('form.emailInvalid');
      else next[el.name] = t('form.required');
      if (!first) first = el;
    });
    setErrors(next);
    if (first) first.focus();
    return !first;
  };

  const clear = (name) => setErrors((prev) => {
    if (!prev[name]) return prev;
    const rest = { ...prev };
    delete rest[name];
    return rest;
  });

  const reset = () => setErrors({});

  return { errors, validate, clear, reset, count: Object.keys(errors).length };
}

// Props to spread on an input so assistive tech knows about its error.
export const errorProps = (id, message) => (message
  ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` }
  : {});
