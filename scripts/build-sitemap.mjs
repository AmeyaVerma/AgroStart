// Regenerates public/sitemap.xml with every page in every language, each with its
// language alternates (hreflang). Run with: npm run sitemap
// Sample course pages are left out on purpose until the real course list exists.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const SITE = 'https://www.agrostart.in';
const LANGS = ['en', 'hi', 'or'];
const PAGES = ['', '/courses', '/how-it-works', '/services', '/partners', '/about', '/impact', '/pathways', '/privacy', '/terms', '/refund', '/accessibility'];

const url = (lang, page) => `${SITE}/${lang}${page}`;
const today = new Date().toISOString().slice(0, 10);

const entries = PAGES.flatMap((page) =>
  LANGS.map((lang) => {
    const alternates = [
      ...LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l, page)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${url('en', page)}"/>`,
    ].join('\n');
    return `  <url>\n    <loc>${url(lang, page)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`;
  }),
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');
writeFileSync(out, xml);
console.log(`Wrote ${entries.length} URLs to public/sitemap.xml`);
