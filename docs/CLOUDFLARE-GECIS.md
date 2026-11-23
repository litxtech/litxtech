# litxtech.com — Vercel → Cloudflare Pages Geçiş Runbook'u

> **Durum (23 Kasım 2026):** Pages projesi `litxtechweb` yayında →
> <https://litxtechweb.pages.dev>. Site **gerçek Supabase projesine**
> (`cobzwohfekgzbvxbwrll`) bağlı; CMS okuma, lead yazma ve admin guard çalışıyor.
> **Kalan tek blokaj:** `litxtech.com` registrar'ında nameserver'lar hâlâ
> Hostinger'da (`p3/p4.hosting.com.tr`) → zone `pending`, alan adı DNS'te çözmüyor.
> Bkz. **10. bölüm**.
>
> `litxtech.com` zone ID: `017fe8de62bc10cb93c81ea1ad233fa1`, hesap
> **vora videolar sunucu**, NS **laylah.ns.cloudflare.com** +
> **will.ns.cloudflare.com** (status: pending).

Bu proje **Vora (vinext/SSR)** ve **Tamuso (saf statik SPA)** ile aynı sınıfta değil.
Vite SPA + ~40 Vercel fonksiyonu + Edge Middleware + Stripe + Supabase Auth var.
Aşağıdaki taşıma **hazır ve yerel olarak doğrulandı**; eksik olan yalnızca deploy ve DNS.

---

## 1. Ne taşınıyor

| Vercel'de | Ne yapıyor | Cloudflare Pages karşılığı | Durum |
|---|---|---|---|
| `dist/` (Vite) | Statik SPA | Aynı `dist/` | ✅ |
| `vercel.json` `headers` | Güvenlik/CSP başlıkları | `dist/_headers` (üretiliyor) | ✅ |
| `vercel.json` `redirects` | 7 yönlendirme | `dist/_redirects` | ✅ |
| `vercel.json` host kuralı | apex → www | `functions/_middleware.js` | ✅ |
| `vercel.json` `rewrites` (`/api/...`) | Sorgu eşleme | Gereksiz — handler'lar yolu zaten okuyor | ✅ |
| `middleware.js` (Edge) | SEO head enjeksiyonu + SPA fallback | `functions/_middleware.js` | ✅ |
| `api/public/[slug].js` | 20 public handler | `functions/api/public/[[path]].js` | ✅ |
| `api/admin/[...slug].js` | 12 admin handler | `functions/api/admin/[[path]].js` | ✅ |
| `api/robots.js`, `sitemap.js` | SEO | `functions/api/*.js` | ✅ |
| `api/stripe-*.js`, `donation.js` | Ödeme | `functions/api/*.js` | ✅ |
| `functions/_lib/adapt.js` | **Yeni** — Vercel imzası ↔ Pages köprüsü | | ✅ |

**Anahtar tasarım kararı:** ~40 handler dosyası **hiç değiştirilmedi**.
`api/_lib/adapt.js` tek bir yerde `(req, res)` sözleşmesini (hem `res.statusCode/res.end`
hem Express tarzı `res.status().json()`) Pages `Response` modeline çeviriyor.
Böylece `api/` gelişmeye devam ederken taşıma tek komutla yenilenir.

---

## 2. Üretim komutları

```bash
npm run cf:prepare   # dist/_headers, _redirects, _routes.json + functions/ üret
npm run cf:build     # build + yukarıdakiler
npm run cf:dev       # http://127.0.0.1:8799  (8788 muta agenti için ayrıldı)
npm run cf:deploy    # dist/ (statik) + functions/ (fonksiyonlar) → Pages
```

> **Port 8799 neden?** Tamuso agenti aynı makinede `wrangler pages dev` çalıştırıyor ve
> 8788'i kullanıyor. Aynı portu ikinci kez bağlamak sessizce başarısız olup eski
> worker'ı ayakta bırakıyor; bu yüzden litxtech için 8799 sabitlendi.

`functions/` **commit edilmeli**: Pages, fonksiyonları repo kökündeki `functions/`
klasöründen okur (build çıktısının içinden değil).

Üretici scriptler:

- `scripts/cf-pages-olustur.mjs` — `vercel.json` → `_headers` / `_redirects` / `_routes.json`
- `scripts/cf-functions-olustur.mjs` — `api/` → `functions/api/` + sarmalayıcılar
- `scripts/cf-pages/` — elle yazılmış şablonlar (adapter + middleware + `[[path]]` sarmalayıcıları)

---

## 3. Yerel doğrulama (yapıldı)

`wrangler pages dev` üzerinde ölçülen sonuçlar:

| Yol | Beklenen | Sonuç |
|---|---|---|
| `/` | 200 + enjekte edilmiş SEO head | ✅ 200, JSON-LD + canonical |
| `/tamuso/gizlilik` | 200 + kendi title/canonical | ✅ `<title>Tamuso Gizlilik Politikası</title>` |
| `/solutions/hotels` | 301 | ✅ |
| `/admin` | 302 → `/login?admin=1` | ✅ |
| `/robots.txt` | 200 `text/plain` | ✅ 405 b |
| `/sitemap.xml` | 200 `application/xml` | ✅ 14.5 KB, 83 URL |
| `/api/public/seo?path=/cozumler` | 200 JSON | ✅ |
| `/api/public/company` | 200 JSON | ✅ |
| `/api/admin/dashboard` | **401** (token yok) | ✅ |
| `/api/donation` | 200 JSON | ✅ |
| `/api/stripe-prices` | gerçek anahtar ister | yerelde 500 (beklenen) |
| `/assets/*.js` | 200 `application/javascript` | ✅ 99 KB |
| `Host: litxtech.com` | 301 → `https://www.litxtech.com/...` | ✅ |
| `Host: admin.litxtech.com` | dokunmadan geçiş | ✅ |

> `/robots.txt` ve `/sitemap.xml` **`_redirects` ile değil**, middleware içinde
> doğrudan handler çağrılarak karşılanıyor. Sebep: Pages `_redirects` statik yolu
> bir Function'a rewrite edemiyor (denendi, `index.html` dönüyordu).

---

## 4. Deploy adımları

### 4.1 Proje oluştur

> Birden fazla Cloudflare hesabı bağlı olduğu için `CLOUDFLARE_ACCOUNT_ID`
> verilmeden wrangler hesap seçemiyor. `litxtech.com` zone'unun hesabı:
> `acf99dc4d05885166e2c3300aff7b2ef` (vora videolar sunucu).

```bash
$env:CLOUDFLARE_ACCOUNT_ID="acf99dc4d05885166e2c3300aff7b2ef"
npx wrangler@4 pages project create litxtechweb --production-branch main
```

> ✅ Bu adım yapıldı (23 Kasım 2026).

### 4.2 Ortam değişkenleri (zorunlu)

Vercel'deki değerlerin **birebir** girilmesi gerekir. Eksik olan değişken tüm siteyi
düşürmez (Stripe tembel başlatmaya alındı) ama ilgili uç nokta 500 verir.

| Değişken | Etki alanı |
|---|---|
| `SUPABASE_URL` | Tüm public + admin API, SEO kataloğu |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin paneli, yazma işlemleri |
| `SUPABASE_ANON_KEY` | İstemci tarafı |
| `STRIPE_SECRET_KEY` | `/api/stripe-checkout`, `/api/donation`, `/api/stripe-prices` |
| `STRIPE_WEBHOOK_SECRET` | `/api/stripe-webhook-donation` |
| `NEXT_PUBLIC_SITE_URL` | Canonical/Stripe dönüş adresleri (`https://www.litxtech.com`) |
| `RESEND_API_KEY`, `SMTP_*` | Form bildirimleri (`api/_lib/notify.js`) |

Dashboard: Workers & Pages → `litxtechweb` → Settings → Variables and Secrets.
Yerel test için `.dev.vars` (git'e girmez).

### 4.3 İlk deploy

```bash
$env:CLOUDFLARE_ACCOUNT_ID="acf99dc4d05885166e2c3300aff7b2ef"
npx wrangler@4 pages deploy dist --project-name litxtechweb --branch main
# → https://litxtechweb.pages.dev
```

> ✅ İlk deploy yapıldı (23 Kasım 2026). Projede `nodejs_compat` açık.

`https://litxtechweb.pages.dev` üzerinde **tüm akışı** doğrula (aşağıdaki madde 6).

### 4.4 Custom domain

Cloudflare **Workers & Pages → litxtechweb → Custom domains** üzerinden eklenir
(Pages projesi zone'a bağlı olduğu için DNS kaydı otomatik oluşur):

1. `www.litxtech.com`
2. `litxtech.com` (apex; middleware zaten www'ya yönlendiriyor)
3. `admin.litxtech.com` — **şu an DNS'te kaydı yok**, kullanılmıyorsa eklemeyin

---

## 5. ⚠️ DNS: bu domainde **e-posta var**

Vora ve Tamuso'dan en kritik fark bu:

```
litxtech.com MX  → mx1.hostinger.com (5), mx2.hostinger.com (10)
litxtech.com TXT → v=spf1 include:_spf.mail.hostinger.com ~all
litxtech.com TXT → google-site-verification=...
```

Nameserver'lar şu an `p3.hosting.com.tr`, `p4.hosting.com.tr` (Hostinger).

**Kural:** Cloudflare'a geçerken MX ve SPF kayıtlarının **birebir** taşındığını
gözle doğrulamadan nameserver değiştirme. Aksi halde `@litxtech.com` e-postaları
sessizce düşer — bounce bile gelmez.

Cloudflare zone eklerken bu kayıtları tarar ve içe aktarır; yine de:

1. Zone ekle → **DNS → Records** → `MX` 2 satır + `TXT` SPF satırı var mı bak.
2. Yoksa elle ekle (MX öncelikleri 5 ve 10).
3. E-posta servis sağlayıcısı Hostinger ise **DKIM/SPF/DMARC** kayıtlarını da kontrol et.
4. Sonra nameserver'ları değiştir.
5. Geçişten sonra gerçek bir adrese test maili at.

`_dmarc` ve `default._domainkey` kayıtlarını geçiş öncesi `dig` ile kaydet:

```bash
nslookup -type=txt litxtech.com 1.1.1.1
nslookup -type=txt _dmarc.litxtech.com 1.1.1.1
nslookup -type=mx litxtech.com 1.1.1.1
```

> Vora'da bu risk yoktu (MX yoktu), o yüzden oradaki "NS değiştir, bitti" akışı
> burada **geçerli değil**.

---

## 6. Deploy sonrası kontrol listesi

- [ ] `https://litxtechweb.pages.dev/` → ana sayfa + doğru `<title>`
- [ ] `/tamuso/gizlilik`, `/safdas/child-safety` → kendi canonical'ı
- [ ] `/robots.txt` → `text/plain`, `/admin` disallow satırı var
- [ ] `/sitemap.xml` → `application/xml`, 83 URL
- [ ] `/solutions/hotels` → 301 `/cozumler/otel-yonetim-sistemi`
- [ ] `/admin` → 302 `/login?admin=1`
- [ ] Admin paneli ile giriş (Supabase cookie akışı)
- [ ] Bir form gönderimi (`/api/public/contact` / `leads`) → Supabase'e kayıt
- [ ] Stripe test ödemesi → `/success`
- [ ] `GET /api/public/seo/health` → `checklist` içinde `https`, `sitemap`, `favicon` OK
- [ ] www + apex + (varsa) admin alt alanı SSL sertifikası `Active`

### Stripe webhook

Stripe Dashboard → Developers → Webhooks → uç nokta URL'sini kontrol et:

- Domain aynı kaldığı için (`www.litxtech.com`) **değişiklik gerekmez**.
- Ama önce `pages.dev` üzerinde test edeceksen ayrı bir test uç noktası ekle;
  canlı uç noktayı `pages.dev`'e çevirme.

---

## 7. Geri alma

Vercel projesi (`litxtechweb`, `prj_3hC0aI84l47LtaJxGf9Mlq5qIUqO`) silinmedi;
DNS kayıtlarını Vercel IP'sine geri çevirmek yeterli. Ama Vercel takımı
`DEPLOYMENT_DISABLED` (HTTP 402) durumunda olduğu için **geri dönüş gerçek bir
seçenek değil** — bu taşıma tek yönlü kabul edilmeli.

---

## 8. Bilinen sınırlar

| Konu | Not |
|---|---|
| `process.env` | Pages binding'leri `functions/api/_lib/adapt.js` içinde `process.env`'e kopyalanıyor. Modül yüklenirken env okuyan kod **çalışmaz** — bu yüzden Stripe/Supabase istemcileri tembel başlatmaya alındı. |
| `_redirects` → Function | Desteklenmiyor. Fonksiyona giden yollar middleware'de karşılanır. |
| `_redirects` boyutu | 2.000 statik / 100 dinamik kural sınırı. Şu an 7 kural. |
| Host koşullu kurallar | Pages'te yok; middleware'e taşındı. |
| `admin.litxtech.com` | `vercel.json`'da kural var ama DNS'te kayıt yok — ölü konfigürasyon. |
| `functions/` senkronu | `api/` değişince `npm run cf:prepare` çalıştırılmalı, yoksa Pages eski handler'ı çalıştırır. |
| Git remote | `origin` değil `kbs` → `litxtech/litxtechkbs.git`, branch `main`. Deploy öncesi push unutulmamalı. |

---

## 9. Sıralama önerisi

1. **Tamuso** (en basit: saf statik) — `docs/CLOUDFLARE-GECIS.md` orada ayrı.
2. **litxtech.com** (bu doküman) — MX riski yüzünden sona bırakılabilir.
3. **Vora** — tamamlandı.

litxtech.com'un tamamlanması için gereken tek şey: Pages projesi + 7 ortam
değişkeni + DNS (MX doğrulamasıyla).

---

## 10. Canlıya alma durumu — 23 Kasım 2026 (güncel)

### Tamamlananlar

| Adım | Sonuç |
|---|---|
| Pages projesi | `litxtechweb` (hesap `acf99dc4d05885166e2c3300aff7b2ef`) |
| Üretim URL | <https://litxtechweb.pages.dev> |
| Build + deploy | ✅ `dist/` + 58 fonksiyon dosyası |
| `nodejs_compat` | ✅ proje ayarında açık |
| Sitemap | ✅ 200, `application/xml`, **83 URL** |
| SEO enjeksiyonu | ✅ title + canonical + JSON-LD |
| Supabase | ✅ **geldi** — `cobzwohfekgzbvxbwrll`, `ACTIVE_HEALTHY`, us-east-2 |
| Boş proje temizliği | ✅ `vnxraswzpnubdfjvrlet` silindi, hesapta tek proje kaldı |
| CMS okuma | ✅ services 6, projects 3, cases 2, faqs 7 — canlı DB'den |
| Lead yazma | ✅ `POST /api/public/leads` → 201, kayıt DB'ye düştü (test kaydı silindi) |
| Admin guard | ✅ `/api/admin/dashboard` → 401 |
| Ortam değişkenleri | ✅ 13 değişken + `nodejs_compat` (`npm run cf:env`) |
| Özel alan adları | `litxtech.com` + `www.litxtech.com` Pages'e bağlı, **pending** |
| MX / SPF / doğrulama TXT | ✅ pending zone'da korunuyor |

### Uygulanan veritabanı migration'ları

`npm run db:apply <dosya>` ile Management API üzerinden çalıştırıldı:

| Dosya | Ne yaptı |
|---|---|
| `20261123_grant_public_read.sql` | `cms_*`, `feed_posts`, `seo_metadata`, `site_ctas` vb. tablolara `anon` SELECT + RLS politikası; service_role tam yetki |
| `20261123_create_legacy_admin_tables.sql` | Kodun kullandığı ama projede olmayan `site_settings`, `blog_posts`, `package_management`, `customer_orders`, `system_logs` + `admin_dashboard_stats` görünümü |
| `20261123_validate_admin_session.sql` | Canlı şemaya (`admin_id` / `token` / `revoked`) uygun RPC — yoktu, her admin isteği hataya düşüyordu |
| `supabase-donation-badge-setup.sql` | `donations` + `user_badges` (Stripe bağış webhook'u için) |

> Not: `cms_pages` üzerinde `include_in_sitemap` / `lastmod` yok; sitemap `updated_at`
> ve `status` alanlarını kullanıyor, bu yüzden eksik kolon sorun değil.
> `cms_projects` başlık alanı `title` değil **`name`**, `homepage_sections` ise
> `is_enabled` değil **`active`** kullanıyor — kod bu şemaya uygun yazılmış.

### Kalan tek blokaj — Nameserver değişmedi

Zone `017fe8de62bc10cb93c81ea1ad233fa1` hâlâ **pending** ve `litxtech.com` DNS'te
hiç çözülmüyor (SERVFAIL). Alan adı hâlâ Hostinger NS'lerini kullanıyor:
`p3.hosting.com.tr`, `p4.hosting.com.tr`.

Registrar panelinde NS olarak **yalnızca** şunlar girilmeli:

```
laylah.ns.cloudflare.com
will.ns.cloudflare.com
```

`carmelo/olga` **tamuso.com**'un NS'leridir; bu zone'a yazılırsa alan adı çözülemez.

NS değişip zone **active** olduğunda Pages özel alan adları otomatik
tamamlanır; olmazsa Cloudflare DNS'te `@` ve `www` A kayıtlarını silip yerine:

| Tür | Ad | İçerik | Proxy |
|---|---|---|---|
| CNAME | `www` | `litxtechweb.pages.dev` | Proxied |
| CNAME | `@` | `litxtechweb.pages.dev` | Proxied (apex flattening) |

> Pages → Custom domains ekranı, zone aktif olduğunda bu kayıtları otomatik
> oluşturmayı teklif eder. Otomatik oluşmazsa yukarıdaki iki CNAME elle girilir.
> **MX/SPF/TXT kayıtlarına dokunulmaz.**

### Bilinen eksik — Stripe ve e-posta secret'ları

| Değişken | Durum |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ girildi (`sb_secret_…`) |
| `ADMIN_SESSION_SECRET` | ✅ lokal + Pages aynı değer |
| `STRIPE_SECRET_KEY` | ⚠️ Vercel'den taşındı, canlı ödeme testi yapılmadı |
| `STRIPE_WEBHOOK_SECRET` | ❌ Stripe → Webhooks → uç nokta imza secret'ı |
| `RESEND_API_KEY` / `SMTP_*` | ❌ form bildirimleri (opsiyonel, form yine DB'ye kaydediliyor) |

Secret'lar değiştiğinde yeniden deploy gerekir:

```bash
$env:CLOUDFLARE_ACCOUNT_ID="acf99dc4d05885166e2c3300aff7b2ef"
npm run cf:env      # değişkenleri Pages'e yazar
npm run cf:deploy   # yeni değerlerle yayınlar
```

Alan adı canlıya alındıktan sonra `npm run cf:durum` ile zone/domain durumu
tek komutla kontrol edilebilir.
