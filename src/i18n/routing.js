// Helpers for language-prefixed URLs: /en/..., /hi/..., /or/...
import { LANGS } from './translations';

export const LANG_CODES = LANGS.map((l) => l.code);

// "/hi/courses" -> { lang: 'hi', rest: '/courses' }; "/courses" -> { lang: null, rest: '/courses' }
export function splitLang(pathname) {
  const m = pathname.match(/^\/([a-z]{2})(?=\/|$)/);
  if (m && LANG_CODES.includes(m[1])) return { lang: m[1], rest: pathname.slice(3) || '/' };
  return { lang: null, rest: pathname };
}

// Adds the language prefix to an internal path. Already-prefixed and external targets are left alone.
//   '/' -> '/hi'   '/courses' -> '/hi/courses'   '/#contact' -> '/hi#contact'
export function localize(lang, to) {
  if (typeof to !== 'string' || !to.startsWith('/')) return to;
  if (splitLang(to.split(/[?#]/)[0]).lang) return to;
  if (to === '/') return `/${lang}`;
  if (to.startsWith('/#') || to.startsWith('/?')) return `/${lang}${to.slice(1)}`;
  return `/${lang}${to}`;
}
