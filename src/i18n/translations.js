// Language list and dictionaries. English is the source text and the fallback for any
// missing key. The Hindi and Odia text is a first draft and MUST be reviewed by a fluent
// speaker before launch (brief, section 7).
//
// To add a language: add an entry to LANGS, create <code>.js with the same keys as en.js
// (check with `npm run check:i18n`), and add it to `dictionaries` below.

import en from './en';
import hi from './hi';
import or from './or';

export const LANGS = [
  { code: 'en', label: 'English', short: 'EN', locale: 'en-IN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिं', locale: 'hi-IN' },
  { code: 'or', label: 'ଓଡ଼ିଆ', short: 'ଓଡ଼ି', locale: 'or-IN' },
];

export const DEFAULT_LANG = 'en';

export const dictionaries = { en, hi, or };

