/**
 * Cloudflare Pages ↔ Vercel fonksiyon köprüsü.
 *
 * api/_handlers ve api/_lib altındaki ~40 dosya Vercel imzası kullanıyor:
 *   handler(req, res)  →  res.statusCode / res.setHeader / res.end
 * Tek dosyalık rotaların bir kısmı ise Express tarzı:
 *   res.status(400).json({...})  /  res.status(200).end()
 * Bu dosya her iki sözleşmeyi tek yerde Pages `Response` modeline çevirir;
 * handler'ların hiçbiri değiştirilmez.
 */

/** Pages binding'lerini `process.env`'e taşır (handler'lar process.env okuyor). */
export function syncEnv(bindingEnv) {
  const p = (globalThis.process ||= {});
  if (!p.env) p.env = {};
  for (const [k, v] of Object.entries(bindingEnv || {})) {
    if (typeof v === 'string') p.env[k] = v;
  }
  if (!p.env.NODE_ENV) p.env.NODE_ENV = 'production';
  // Vercel'e özgü değişkenler: eski kod bunlara bakıp prod varsayıyor.
  if (!p.env.VERCEL) p.env.VERCEL = '1';
}

function sorgu(url) {
  const out = {};
  for (const [k, v] of url.searchParams) {
    if (out[k] === undefined) out[k] = v;
    else if (Array.isArray(out[k])) out[k].push(v);
    else out[k] = [out[k], v];
  }
  return out;
}

function basliklar(request) {
  const out = {};
  for (const [k, v] of request.headers) out[k.toLowerCase()] = v;
  // Bazı handler'lar `req.headers.cookie` bekliyor; `cookie` başlığı aynen gelir.
  return out;
}

/** Vercel/Express `res` nesnesinin handler'ların kullandığı alt kümesi. */
function sahteYanit() {
  const parcalar = [];
  const headers = new Headers();

  const res = {
    statusCode: 200,
    headers,
    setHeader(ad, deger) {
      if (ad.toLowerCase() === 'set-cookie') {
        for (const tek of [].concat(deger)) headers.append('set-cookie', String(tek));
        return res;
      }
      headers.set(ad, Array.isArray(deger) ? deger.join(', ') : String(deger));
      return res;
    },
    getHeader(ad) {
      return headers.get(ad) ?? undefined;
    },
    removeHeader(ad) {
      headers.delete(ad);
    },
    // Express tarzı zincirleme
    status(kod) {
      res.statusCode = kod;
      return res;
    },
    end(govde) {
      if (govde != null) {
        parcalar.push(typeof govde === 'string' ? govde : new TextDecoder().decode(govde));
      }
      return res;
    },
    write(govde) {
      return res.end(govde);
    },
    send(govde) {
      if (govde != null && typeof govde === 'object' && !(govde instanceof Uint8Array)) {
        return res.json(govde);
      }
      return res.end(govde);
    },
    json(veri) {
      headers.set('Content-Type', 'application/json; charset=utf-8');
      return res.end(JSON.stringify(veri));
    },
    get govde() {
      return parcalar.join('');
    },
  };

  return res;
}

/**
 * @param {(req: any, res: any) => Promise<any>} handler
 * @param {{ request: Request, env: any }} context
 */
export async function runHandler(handler, context) {
  syncEnv(context.env);
  const { request } = context;
  const url = new URL(request.url);

  const req = {
    method: request.method,
    url: request.url,
    headers: basliklar(request),
    query: sorgu(url),
    body: undefined,
    rawBody: undefined,
    // readBody() bu alanı akış yerine doğrudan kullanır (Pages'te stream yok).
    __bodyText: '',
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    const ham = await request.text();
    req.rawBody = ham;
    req.__bodyText = ham;
    const tip = req.headers['content-type'] || '';
    if (tip.includes('application/json') && ham) {
      try {
        req.body = JSON.parse(ham);
      } catch {
        req.body = ham;
      }
    } else {
      req.body = ham;
    }
  }

  const res = sahteYanit();
  await handler(req, res);

  const bosGovde = res.statusCode === 204 || res.statusCode === 304;
  return new Response(bosGovde ? null : res.govde, {
    status: res.statusCode,
    headers: res.headers,
  });
}

/**
 * Catch-all rotalar için yol parametresini `req.query.slug`'a yazar.
 *
 * `api/public/[slug].js` ve `api/admin/[...slug].js` slug'ı sorguda bulamazsa
 * `url.pathname`'e düşüyor; Pages URL'yi yeniden yazmadığı için o yol zaten
 * doğru. Yine de her iki kaynağı da besliyoruz.
 */
export function slugAta(context, anahtar = 'path') {
  const params = context.params || {};
  const ham = params[anahtar];
  const deger = Array.isArray(ham) ? ham.join('/') : ham;
  if (!deger) return context;
  const url = new URL(context.request.url);
  if (!url.searchParams.has('slug')) url.searchParams.set('slug', deger);
  return { ...context, request: new Request(url.toString(), context.request) };
}

export async function handleCatchAll(handler, context) {
  return runHandler(handler, slugAta(context));
}
