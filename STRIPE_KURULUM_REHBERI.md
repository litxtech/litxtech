# STRIPE KURULUM REHBERİ - www.litxtech.com

## 🚀 HEMEN ÇALIŞIR HALDE STRIPE ENTEGRASYONU

### 1. STRIPE HESABI KURULUMU

#### A) Stripe Hesabı Oluştur:
1. **https://dashboard.stripe.com/register** adresine git
2. **Email, şifre** gir ve hesap oluştur
3. **Telefon numarası** doğrulaması yap
4. **İşletme bilgileri** gir:
   - **İşletme adı:** LitxTech LLC
   - **Adres:** 15442 Ventura Blvd, Suite 201-1834, Sherman Oaks, CA 91403
   - **Telefon:** +1 307 271 5151
   - **Website:** www.litxtech.com

#### B) Live Mode'a Geç:
1. Dashboard'da **"Activate your account"** butonuna tıkla
2. **Bank account** bilgilerini gir
3. **Tax ID** (EIN) bilgilerini gir
4. **Live mode** aktif olana kadar bekle

### 2. STRIPE API ANAHTARLARI

#### A) API Keys Al:
1. **Developers** → **API keys** menüsüne git
2. **Live mode** aktif olduğundan emin ol
3. **Publishable key** kopyala: `pk_live_...`
4. **Secret key** kopyala: `sk_live_...` (Reveal live key)

### 3. ÜRÜNLER OLUŞTUR (18 ADET)

#### A) Her Paket İçin Ürün Oluştur:

**Web & SaaS Development:**
1. **STARTER Package** - $990
   - Name: STARTER Package
   - Description: Perfect for individuals and small businesses
   - Price: $990 (one-time)

2. **PROFESSIONAL Package** - $2490
   - Name: PROFESSIONAL Package
   - Description: Best for growing startups needing automation
   - Price: $2490 (one-time)

3. **ENTERPRISE Package** - $4990
   - Name: ENTERPRISE Package
   - Description: For SaaS products and scalable business platforms
   - Price: $4990 (one-time)

**AI Integration:**
4. **AI LITE Package** - $1490
   - Name: AI LITE Package
   - Description: Entry-level AI integration for websites or apps
   - Price: $1490 (one-time)

5. **AI PRO Package** - $3490
   - Name: AI PRO Package
   - Description: Advanced automation & data-driven AI
   - Price: $3490 (one-time)

6. **AI ENTERPRISE Package** - $8990
   - Name: AI ENTERPRISE Package
   - Description: For large-scale AI-driven businesses
   - Price: $8990 (one-time)

**Hospitality & Booking:**
7. **SMART HOTEL Package** - $2990
   - Name: SMART HOTEL Package
   - Description: For hotels, villas, and B&Bs
   - Price: $2990 (one-time)

8. **RESTAURANT PRO Package** - $1790
   - Name: RESTAURANT PRO Package
   - Description: For restaurants, cafés, and bars
   - Price: $1790 (one-time)

9. **TRAVEL & AGENCY HUB Package** - $3790
   - Name: TRAVEL & AGENCY HUB Package
   - Description: For tourism agencies and transfer services
   - Price: $3790 (one-time)

**Corporate & Enterprise:**
10. **CORPORATE SITE Package** - $1590
    - Name: CORPORATE SITE Package
    - Description: For professional companies needing authority online
    - Price: $1590 (one-time)

11. **ERP / CRM SUITE Package** - $5490
    - Name: ERP / CRM SUITE Package
    - Description: Internal management software
    - Price: $5490 (one-time)

12. **ECOMMERCE ULTRA Package** - $3990
    - Name: ECOMMERCE ULTRA Package
    - Description: For online stores & product platforms
    - Price: $3990 (one-time)

**Marketing & Branding:**
13. **BRAND LAUNCH KIT Package** - $1290
    - Name: BRAND LAUNCH KIT Package
    - Description: For new businesses
    - Price: $1290 (one-time)

14. **SALES AUTOMATION PRO Package** - $2990
    - Name: SALES AUTOMATION PRO Package
    - Description: Boost conversions with smart tools
    - Price: $2990 (one-time)

15. **FULL DIGITAL SUITE Package** - $5990
    - Name: FULL DIGITAL SUITE Package
    - Description: For marketing agencies or corporate teams
    - Price: $5990 (one-time)

**Custom Solutions:**
16. **CUSTOM SOFTWARE DEVELOPMENT Package** - $9990
    - Name: CUSTOM SOFTWARE DEVELOPMENT Package
    - Description: Tailored solutions for corporations & startups
    - Price: $9990 (one-time)

17. **ANNUAL MAINTENANCE PLAN Package** - $1200
    - Name: ANNUAL MAINTENANCE PLAN Package
    - Description: Yearly maintenance and support
    - Price: $1200 (one-time)

18. **UI/UX DESIGN SUITE Package** - $1590
    - Name: UI/UX DESIGN SUITE Package
    - Description: Full design system and components
    - Price: $1590 (one-time)

#### B) Price ID'leri Kopyala:
Her ürün oluşturduktan sonra **Price ID**'yi kopyala (price_xxxxx formatında)

### 4. VERCEL ENVIRONMENT VARIABLES

#### A) Vercel Dashboard'a Git:
1. **https://vercel.com/dashboard** adresine git
2. **replit-project** projesini seç
3. **Settings** → **Environment Variables** sekmesine git

#### B) Environment Variables Ekle:

**Stripe API Keys:**
```
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
```

**Stripe Price IDs (18 adet):**
```
STRIPE_STARTER_PRICE_ID=price_starter_990
STRIPE_PROFESSIONAL_PRICE_ID=price_professional_2490
STRIPE_ENTERPRISE_PRICE_ID=price_enterprise_4990
STRIPE_AI_LITE_PRICE_ID=price_ai_lite_1490
STRIPE_AI_PRO_PRICE_ID=price_ai_pro_3490
STRIPE_AI_ENTERPRISE_PRICE_ID=price_ai_enterprise_8990
STRIPE_SMART_HOTEL_PRICE_ID=price_smart_hotel_2990
STRIPE_RESTAURANT_PRO_PRICE_ID=price_restaurant_pro_1790
STRIPE_TRAVEL_AGENCY_HUB_PRICE_ID=price_travel_agency_hub_3790
STRIPE_CORPORATE_SITE_PRICE_ID=price_corporate_site_1590
STRIPE_ERP_CRM_SUITE_PRICE_ID=price_erp_crm_suite_5490
STRIPE_ECOMMERCE_ULTRA_PRICE_ID=price_ecommerce_ultra_3990
STRIPE_BRAND_LAUNCH_KIT_PRICE_ID=price_brand_launch_kit_1290
STRIPE_SALES_AUTOMATION_PRO_PRICE_ID=price_sales_automation_pro_2990
STRIPE_FULL_DIGITAL_SUITE_PRICE_ID=price_full_digital_suite_5990
STRIPE_CUSTOM_SOFTWARE_PRICE_ID=price_custom_software_9990
STRIPE_ANNUAL_MAINTENANCE_PRICE_ID=price_annual_maintenance_1200
STRIPE_UI_UX_DESIGN_PRICE_ID=price_ui_ux_design_1590
```

**Site Configuration:**
```
NEXT_PUBLIC_SITE_URL=https://www.litxtech.com
```

### 5. DEPLOY VE TEST

#### A) Deploy:
1. Environment variables eklendikten sonra **automatic deploy** başlayacak
2. Deploy tamamlanana kadar bekle (2-3 dakika)

#### B) Test:
1. **https://www.litxtech.com** adresine git
2. Herhangi bir pakete tıkla
3. **"Buy Now"** butonuna bas
4. Stripe checkout sayfası açılacak
5. Test kartı ile ödeme yap:
   - **Card:** 4242 4242 4242 4242
   - **Expiry:** 12/34
   - **CVC:** 123
   - **Name:** Test User
6. **Success page**'e yönlendirileceksin

### 6. GERÇEK ÖDEMELER

#### A) Live Mode Test:
1. **Gerçek kart** ile küçük bir test ödemesi yap
2. Stripe Dashboard'da **Payments** sekmesinde ödemeyi gör
3. **Bank account**'a para transferi olacak

#### B) Monitoring:
1. **Stripe Dashboard** → **Payments** ile tüm ödemeleri takip et
2. **Analytics** ile satış raporlarını gör
3. **Customers** ile müşteri bilgilerini yönet

## ✅ SONUÇ

Bu adımları takip ettikten sonra:
- ✅ **18 paket** Stripe'da hazır
- ✅ **Gerçek ödemeler** çalışıyor
- ✅ **www.litxtech.com** domain'inde aktif
- ✅ **Otomatik fatura** oluşturma
- ✅ **Müşteri bilgileri** toplama
- ✅ **Success/Cancel** sayfaları

**Sistem tamamen hazır ve çalışır durumda!** 🚀💳
