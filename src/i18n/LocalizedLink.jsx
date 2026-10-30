import React from 'react';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { localize } from './routing';

// Drop-in replacements for react-router's Link and NavLink that keep the visitor in the
// current language: to="/courses" becomes /hi/courses on the Hindi site.
export function Link({ to, ...props }) {
  const { lang } = useLanguage();
  return <RouterLink to={localize(lang, to)} {...props} />;
}

export function NavLink({ to, ...props }) {
  const { lang } = useLanguage();
  return <RouterNavLink to={localize(lang, to)} {...props} />;
}
