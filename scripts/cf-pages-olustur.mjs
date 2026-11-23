/**
 * vercel.json → Cloudflare Pages dönüştürücü (litxtech.com)
 *
 * `dist/` içine `_headers` ve `_redirects` yazar. Host koşullu kurallar
 * (`has`/`missing`) Pages formatında ifade edilemediği için atlanır; onlar
 * `functions/_middleware.js` içinde ele alınır (bkz. docs/CLOUDFLARE-GECIS.md).
 *
 * Kullanım: node scripts/cf-pages-olustur.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const kok = process.cwd();
const vercelYolu = path.join(kok, 'vercel.json');
const distYolu = path.join(kok, 'dist');

if (!fs.existsSync(vercelYolu)) {
  console.error('vercel.json bulunamadı:', vercelYolu);
  process.exit(1);
}
if (!fs.existsSync(distYolu)) {
  console.error('dist/ bulunamadı. Önce `npm run build` çalıştır.');
  process.exit(1);
}

const vercel = JSON.parse(fs.readFileSync(vercelYolu, 'utf8'));

function kosullu(kural) {
  return (kural.has?.length ?? 0) > 0 || (kural.missing?.length ?? 0) > 0;
}

function yolCevir(kaynak) {
  return kaynak
    .replace(/\/\(\.\*\)$/, '/*')
    .replace(/\/\(\(([^)]+)\)\)/, '/*')
    .replace(/:([A-Za-z0-9_]+)\*/g, '*')
    .replace(/:([A-Za-z0-9_]+)/g, ':$1');
}

/**
 * Bu dosyalar Vercel'de "iç eşleme" (rewrite) ile karşılanıyor; Pages'te
 * fonksiyon yolu zaten aynı olduğu için kural gerekmiyor. Atlamazsak
 * `_redirects` statik dosyalardan önce çalışıp asset'leri ezer.
 */
const REWRITE_ATLA = [
  /^\/robots\.txt$/, // yine de açıkça eklenir (aşağıda)
  /^\/sitemap\.xml$/,
];

// ---------------------------------------------------------------- _headers
const basliklar = [];
const atlananBaslik = [];
for (const kural of vercel.headers ?? []) {
  if (kosullu(kural)) {
    atlananBaslik.push(kural.source);
    continue;
  }
  basliklar.push(yolCevir(kural.source));
  for (const { key, value } of kural.headers ?? []) basliklar.push(`  ${key}: ${value}`);
  basliklar.push('');
}

// -------------------------------------------------------------- _redirects
const satirlar = [];
const atlananYonlendirme = [];

// 1) Host koşullu redirect'ler → middleware
for (const kural of vercel.redirects ?? []) {
  if (kosullu(kural)) {
    atlananYonlendirme.push(`(host) ${kural.source}`);
    continue;
  }
  satirlar.push(`${yolCevir(kural.source)} ${kural.destination} ${kural.permanent ? 301 : 302}`);
}

// 2) SEO yolları: Pages `_redirects` statik → Function rewrite'ı yapamadığı
//    için `functions/_middleware.js` içinde karşılanıyor.

// 3) /api rewrite'ları atlanır: catch-all handler'lar yolu zaten okuyor
//    (api/public/[slug].js → resolveSlug, pathname fallback).
for (const kural of vercel.rewrites ?? []) {
  if (kural.source.startsWith('/api/')) {
    atlananYonlendirme.push(`(api) ${kural.source}`);
    continue;
  }
  // SPA catch-all: middleware hallediyor, _redirects'e yazılmaz (asset'leri ezer)
  if (/^\/\(\(/.test(kural.source)) {
    atlananYonlendirme.push(`(spa) ${kural.source}`);
    continue;
  }
  if (REWRITE_ATLA.some((re) => re.test(kural.source))) continue;
  satirlar.push(`${yolCevir(kural.source)} ${kural.destination} 200`);
}

const dinamik = satirlar.filter((s) => s.includes(':')).length;
if (dinamik > 100) console.warn(`UYARI: ${dinamik} dinamik kural, Pages sınırı 100.`);

fs.writeFileSync(path.join(distYolu, '_headers'), `${basliklar.join('\n').trimEnd()}\n`, 'utf8');
fs.writeFileSync(path.join(distYolu, '_redirects'), `${satirlar.join('\n')}\n`, 'utf8');

/**
 * _routes.json: statik varlıkları Function çağrısından muaf tutar (ücretsiz
 * statik istek kotası). `/robots.txt` ve `/sitemap.xml` HARİÇ — onlar
 * `_redirects` ile fonksiyona gidiyor.
 */
const rotalar = {
  version: 1,
  include: ['/*'],
  exclude: ['/assets/*', '/favicon.svg', '/og-litxtech.jpg', '/site.webmanifest'],
};
fs.writeFileSync(path.join(distYolu, '_routes.json'), `${JSON.stringify(rotalar, null, 2)}\n`, 'utf8');

console.log(`_headers   : ${basliklar.filter((s) => s && !s.startsWith(' ')).length} blok`);
console.log(`_redirects : ${satirlar.length} satır (${dinamik} dinamik)`);
if (atlananBaslik.length) {
  console.log(`middleware : host koşullu header → ${atlananBaslik.join(', ')}`);
}
if (atlananYonlendirme.length) {
  console.log(`atlanan    :`);
  for (const s of atlananYonlendirme) console.log(`  - ${s}`);
}
