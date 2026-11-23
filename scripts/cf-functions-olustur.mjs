/**
 * Vercel `api/` ağacından Cloudflare Pages `functions/` ağacını üretir.
 *
 * Hiçbir handler dosyası elle düzenlenmez:
 *   - `api/` bir bütün olarak kopyalanır,
 *   - catch-all dosyaları `_handler.js`e, tek dosyalık rotalar `_<ad>.js`e çekilir,
 *   - üzerlerine Pages sözleşmesini (`onRequest`) sağlayan ince sarmalayıcılar yazılır.
 * Böylece `api/` değişmeye devam ederken taşıma tek komutla yenilenir.
 *
 * Kullanım: node scripts/cf-functions-olustur.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const kok = process.cwd();
const apiKok = path.join(kok, 'api');
const fnKok = path.join(kok, 'functions');
const sablonKok = path.join(kok, 'scripts', 'cf-pages');

if (!fs.existsSync(apiKok)) {
  console.error('api/ bulunamadı:', apiKok);
  process.exit(1);
}

/** `_` ile başlayan klasörler Pages tarafından yönlendirilmez (modüller). */
const OZEL_KLASOR = new Set(['_lib', '_handlers']);

// 1) temiz üretim
fs.rmSync(fnKok, { recursive: true, force: true });
fs.cpSync(apiKok, path.join(fnKok, 'api'), { recursive: true });

// 2) catch-all dosyalarını `_handler.js`e çevir
const catchAll = [
  ['api/public/[slug].js', 'api/public/_handler.js'],
  ['api/admin/[...slug].js', 'api/admin/_handler.js'],
];
for (const [kaynak, hedef] of catchAll) {
  const tam = path.join(fnKok, kaynak);
  if (!fs.existsSync(tam)) {
    console.warn(`ATLANDI (yok): ${kaynak}`);
    continue;
  }
  fs.renameSync(tam, path.join(fnKok, hedef));
}

// 3) şablonları üzerine yaz (adapter, middleware, catch-all sarmalayıcıları)
fs.cpSync(sablonKok, fnKok, { recursive: true });

// 4) kalan tek dosyalık rotaları sarmala (robots, sitemap, stripe-*, admin/session)
function gez(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const tam = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (OZEL_KLASOR.has(e.name)) continue;
      gez(tam);
      continue;
    }
    if (!e.name.endsWith('.js')) continue;
    if (e.name.startsWith('_')) continue;
    if (e.name === '[[path]].js') continue;

    const kaynak = fs.readFileSync(tam, 'utf8');
    const defaultVar =
      /export\s+default\s+/.test(kaynak) || /export\s*\{\s*default\s*\}/.test(kaynak);
    if (!defaultVar) continue;
    if (/export\s+const\s+onRequest/.test(kaynak)) continue; // zaten Pages sözleşmesi

    const ad = e.name.replace(/\.js$/, '');
    const icAd = `_${ad}.js`;
    fs.renameSync(tam, path.join(dir, icAd));

    // adapt.js'in göreli yolu: functions/api → ./_lib, alt klasörler → ../_lib
    const derinlik = path.relative(path.join(fnKok, 'api'), dir).split(path.sep).filter(Boolean).length;
    const adaptYolu = derinlik === 0 ? './_lib/adapt.js' : `${'../'.repeat(derinlik)}_lib/adapt.js`;

    fs.writeFileSync(
      tam,
      [
        `import { runHandler } from '${adaptYolu}'`,
        `import handler from './${icAd}'`,
        '',
        'export const onRequest = (context) => runHandler(handler, context)',
        '',
      ].join('\n'),
      'utf8',
    );
  }
}
gez(path.join(fnKok, 'api'));

function say(dir) {
  if (!fs.existsSync(dir)) return 0;
  return fs.readdirSync(dir, { withFileTypes: true }).reduce((n, e) => {
    if (e.isDirectory()) return n + say(path.join(dir, e.name));
    return n + (e.name.endsWith('.js') ? 1 : 0);
  }, 0);
}

console.log(`functions/ üretildi — ${say(fnKok)} js dosyası`);
console.log('  functions/_middleware.js         → SEO + SPA + apex→www');
console.log('  functions/api/public/[[path]].js → /api/public/*');
console.log('  functions/api/admin/[[path]].js  → /api/admin/*');
console.log('  functions/api/<rota>.js          → tek dosyalık rotalar (sarmalı)');
