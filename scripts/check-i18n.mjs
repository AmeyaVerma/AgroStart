// Verifies every language defines exactly the same keys as English, and that
// placeholders such as {n} match. Run with: npm run check:i18n
import en from '../src/i18n/en.js';
import hi from '../src/i18n/hi.js';
import or from '../src/i18n/or.js';

const langs = { hi, or };
const placeholders = (v) => (JSON.stringify(v).match(/\{\w+\}|\[\[|\]\]/g) || []).sort().join(',');
let problems = 0;

for (const [code, dict] of Object.entries(langs)) {
  for (const key of Object.keys(en)) {
    if (!(key in dict)) { console.log(`[${code}] missing: ${key}`); problems++; continue; }
    if (Array.isArray(en[key]) !== Array.isArray(dict[key])) { console.log(`[${code}] type differs: ${key}`); problems++; continue; }
    if (Array.isArray(en[key]) && en[key].length !== dict[key].length) { console.log(`[${code}] line count differs: ${key} (${en[key].length} vs ${dict[key].length})`); problems++; }
    if (Array.isArray(en[key])) {
      en[key].forEach((line, i) => {
        if (line.slice(0, 2) !== dict[key][i]?.slice(0, 2)) { console.log(`[${code}] line type differs: ${key}[${i}]`); problems++; }
      });
    }
    if (placeholders(en[key]) !== placeholders(dict[key])) { console.log(`[${code}] placeholders differ: ${key}`); problems++; }
    if (typeof dict[key] === 'string' && dict[key].trim() === '') { console.log(`[${code}] empty: ${key}`); problems++; }
  }
  for (const key of Object.keys(dict)) {
    if (!(key in en)) { console.log(`[${code}] extra key not in en: ${key}`); problems++; }
  }
}
console.log(problems ? `\n${problems} problem(s)` : `OK: ${Object.keys(en).length} keys in en, hi, or`);
process.exit(problems ? 1 : 0);
