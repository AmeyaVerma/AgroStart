// Keeps the page title, description, canonical link and language alternates (hreflang)
// in sync with the current page and language. These are set in the browser, so search
// engines that run JavaScript see them; fully static per-language meta tags would need
// pre-rendering (not part of this front-end).
import { LANGS } from './translations';
import { localize } from './routing';
import { SITE } from '../siteConfig';

function upsert(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}

export function applyPageMeta({ title, description, lang, rest }) {
  document.title = title;
  const url = `${SITE.url}${localize(lang, rest)}`;
  const locale = (LANGS.find((l) => l.code === lang)?.locale ?? 'en-IN').replace('-', '_');

  upsert('meta[name="description"]', 'meta', { name: 'description', content: description });
  upsert('meta[property="og:title"]', 'meta', { property: 'og:title', content: title });
  upsert('meta[property="og:description"]', 'meta', { property: 'og:description', content: description });
  upsert('meta[property="og:url"]', 'meta', { property: 'og:url', content: url });
  upsert('meta[property="og:locale"]', 'meta', { property: 'og:locale', content: locale });
  upsert('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });

  document.head.querySelectorAll('link[data-lang-alt]').forEach((el) => el.remove());
  const alts = [...LANGS.map((l) => [l.code, l.code]), ['x-default', 'en']];
  alts.forEach(([hreflang, code]) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = `${SITE.url}${localize(code, rest)}`;
    link.dataset.langAlt = 'true';
    document.head.appendChild(link);
  });
}
