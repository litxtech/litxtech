# LitxTech SEO — Google’da görünürlük

Kod tarafı (meta, sitemap, robots, JSON-LD, marka içeriği) bu repoda hazırdır. Google’ın sıralaması için ek olarak:

## 1. Google Search Console (zorunlu)

1. [Google Search Console](https://search.google.com/search-console) → mülk ekle: `https://www.litxtech.com`
2. HTML etiket doğrulaması → `content` değerini Vercel’e `VITE_GOOGLE_SITE_VERIFICATION` olarak ekle, yeniden deploy et.
3. **Sitemaps** → `https://www.litxtech.com/sitemap.xml` gönder.
4. Ana URL için **URL Inspection** → “İndekslemeyi iste”.

## 2. Domain tutarlılığı

- Tercih: `https://www.litxtech.com` (canonical bu).
- `litxtech.com` → `www` 301 yönlendirmesi Vercel’de açık olmalı.
- `admin.litxtech.com` noindex (doğru).

## 3. Beklenti

Marka araması (`litxtech`, `litx`) genelde günler–haftalar içinde; rekabetçi “yazılım” sorguları backlink ve içerik ister. Spam keyword doldurma yapılmaz; entity (Organization) + net marka metni kullanılır.
