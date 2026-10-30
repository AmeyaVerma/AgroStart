# AgroStart Digital Agriculture Academy: website

Public website for AgroStart (www.agrostart.in). React + Vite, deployed on Vercel.
Available in English, Hindi and Odia, with a mobile-first design.

This is the **front-end only**. Learner accounts, payments, certificates, the admin CMS and the
impact dashboard need a backend and are not part of this repo yet (see the brief).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build (the offline service worker only runs here)
npm run lint
npm run check:i18n # every language must have exactly the same text keys
npm run sitemap    # rewrite public/sitemap.xml (run after adding or removing a page)
```

## Where things are

| What | Where |
|---|---|
| Contact details, WhatsApp number, social links, site URL | `src/siteConfig.js` |
| All visible text (English, Hindi, Odia) | `src/i18n/en.js`, `hi.js`, `or.js` |
| Courses (sample data) | `src/data/courses.js` |
| Pages | `src/components/*Page.jsx`, routes in `src/App.jsx` |
| Colours, fonts, spacing | design tokens at the top of `src/index.css` |
| Header, footer, WhatsApp button | `src/components/SiteHeader.jsx`, `SiteFooter.jsx`, `WhatsAppButton.jsx` |
| Offline support | `public/sw.js` |

## Common jobs

**Change a phone number, email or link**: edit `src/siteConfig.js`. To show the Instagram or Twitter
icon, fill in `instagram` or `twitter` there (they are hidden while empty).

**Change any wording**: find the key in `src/i18n/en.js`, then change the same key in `hi.js` and `or.js`.
Run `npm run check:i18n` to confirm nothing is missing. Legal pages are written as lists of lines:
`h:` heading, `p:` paragraph, `l:` list item; `[[text]]` marks a decision still to be made.

**Add a language**: add it to `LANGS` in `src/i18n/translations.js`, create `src/i18n/<code>.js` with the
same keys as `en.js`, and add it to `dictionaries`. Add the code to `LANGS` in `scripts/build-sitemap.mjs`.
Links, the switcher and `/<code>/...` URLs then work automatically. If the language needs a new font,
import it in `src/main.jsx`.

**Add or edit a course**: add an entry to `src/data/courses.js` and these keys for each language:
`courses.<id>.title`, `.blurb`, `.o1`, `.o2` (outcomes), `.m1` to `.m3` (modules). Courses are marked
"Sample" on screen until you remove the `courses.sample` pill in `src/components/CourseCard.jsx`.

**Add a page**: create the component, add a `lazy(...)` import and a `<Route>` in `src/App.jsx`, add a title
key to `TITLE_KEYS` there, add a nav or footer link, and add the path to `scripts/build-sitemap.mjs`.
Use `Link` from `src/i18n/LocalizedLink` (not react-router's) so links keep the current language.

**Add images**: use WebP, about 1200px wide at most, and add `loading="lazy"` for anything below the fold.
Original PNGs from the first version are in git history.

## How some things work

- **Language URLs**: `/en/...`, `/hi/...`, `/or/...`. The language comes from the URL. An old link without a
  prefix (for example `/courses`) redirects to the visitor's last chosen language, or English.
- **Page titles and descriptions** change with the page and language (`src/i18n/pageMeta.js`). They are set in
  the browser, so search engines must run JavaScript to see them. Pre-rendering would be needed for fully static tags.
- **Forms** (Contact, For Partners) open the visitor's email app with the details filled in (`mailto:`).
  This is a stand-in until a backend sends enquiries to a shared inbox with a confirmation email.
  The email to the AgroStart team is always in English.
- **Consent**: both forms need the privacy checkbox before they send.
- **Offline**: `public/sw.js` caches the page shell and static files. Bump `VERSION` in it to clear old caches.
  It registers only in production builds.
- There is no Resources page. The FAQ sits at the bottom of the How it Works page (`src/components/FaqSection.jsx`).

## Audience and pilot focus (from the problem statement and target group document)

The site's wording follows that document: the problem is summarised on the Home page ("Why AgroStart"), the audience
groups are on the Home page and, as a short list, on the About page (`#audience`), and each sample course is tagged with who it suits
(`audience` in `src/data/courses.js`, labels `aud.*`).

- **Pilot focus:** young farmers (18 to 35), agri-entrepreneurs, and FPO members and managers, reached through
  partner organisations such as FPOs, colleges and KVKs.
- **Reached with partners:** rural youth and dropouts, women farmers and SHG members, agriculture students.
- **Institutional:** extension and field staff (as learners); universities, KVKs, skill councils and companies as
  delivery partners or sponsors. Do not name any organisation as a partner or imply certification without written approval.

Still to define for each segment (planning work for the AgroStart team, not site content):
language and literacy level, smartphone and data access, weekly time available, main goal (income, skill,
credential or business launch), and who pays (self, FPO, scheme or CSR).

## Placeholders to replace before launch

Everything below is marked on screen or in the code as sample or "to be confirmed".

- Contact details in `src/siteConfig.js` (currently SkillDesk's email and phone)
- Sample courses and pathways; confirm which of the 23 Services are available now
- Impact numbers: show only real, dated figures; the 1,000,000+ farmers goal is a target, not a result
- Proposal deck PDF (the button in `PartnersPage.jsx` is disabled), explainer video, trainer profiles
- Legal pages (privacy, terms, refund, accessibility): draft text, needs legal review
- Hindi and Odia text: first drafts, need review by fluent speakers
- Real photographs (the current illustrations are placeholders; some contain English text)
- Partner logos only with written approval

## Notes for developers

- Colours follow the palette PDF (white-led, green writing). All colour values are tokens at the top of
  `src/index.css`; use them instead of hex codes. Every button is fresh green with white text (deep green on hover).
  There is no gold and there are no dark bands: deep green is for the footer and button hover only. Leaf green and the
  pale tints are fills or accents, never text on white. Check contrast (4.5:1 for body text) when adding colours.
- Keep tap targets at least 44px tall and keep headings in order (h1, then h2, then h3).
- After large edits, if the dev server shows a blank page, stop it and run `npm run dev -- --force`.
