# Stripe Integration Setup Guide for www.litxtech.com

This guide will help you properly configure the Stripe payment system for your LitxTech project on the production domain.

---

## 1. Stripe Account and API Keys

1. **Create or Login to Stripe Account:**
   * If you don't have a Stripe account, register at [Stripe.com](https://dashboard.stripe.com/register)
   * If you have an existing account, login at [Stripe Dashboard](https://dashboard.stripe.com/login)

2. **Enable Live Mode:**
   * Switch to "Live mode" in the top-left corner of the Dashboard
   * This will process real payments (not test payments)

3. **Get Your API Keys:**
   * Go to `Developers` -> `API keys` in the left menu
   * You'll need two keys:
     * **Publishable key:** `pk_live_...` (starts with pk_live). This is used in frontend
     * **Secret key:** `sk_live_...` (starts with sk_live). This is used in backend and **NEVER** shared publicly
   * Click "Reveal live key" to see the secret key

---

## 2. Create Products and Prices

You need to create products and prices for all 18 packages in your system.

1. **Create Products:**
   * Go to `Products` -> `Add product` in the left menu
   * Create separate products for each package:

### Web & SaaS Development Packages:
- **STARTER Package** - $990 (one-time)
- **PROFESSIONAL Package** - $2490 (one-time) 
- **ENTERPRISE Package** - $4990 (one-time)

### AI Integration Packages:
- **AI LITE Package** - $1490 (one-time)
- **AI PRO Package** - $3490 (one-time)
- **AI ENTERPRISE Package** - $8990 (one-time)

### Hospitality & Booking Packages:
- **SMART HOTEL Package** - $2990 (one-time)
- **RESTAURANT PRO Package** - $1790 (one-time)
- **TRAVEL & AGENCY HUB Package** - $3790 (one-time)

### Corporate & Enterprise Packages:
- **CORPORATE SITE Package** - $1590 (one-time)
- **ERP / CRM SUITE Package** - $5490 (one-time)
- **ECOMMERCE ULTRA Package** - $3990 (one-time)

### Marketing & Branding Packages:
- **BRAND LAUNCH KIT Package** - $1290 (one-time)
- **SALES AUTOMATION PRO Package** - $2990 (one-time)
- **FULL DIGITAL SUITE Package** - $5990 (one-time)

### Custom Solutions Packages:
- **CUSTOM SOFTWARE DEVELOPMENT Package** - $9990 (one-time)
- **ANNUAL MAINTENANCE PLAN Package** - $1200 (one-time)
- **UI/UX DESIGN SUITE Package** - $1590 (one-time)

2. **Get Price IDs:**
   * After creating each product, copy the `Price ID` from the product details page
   * These IDs will be used as environment variables

---

## 3. Environment Variables Configuration

Add these variables to your Vercel project settings:

### Stripe API Keys:
```
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
```

### Stripe Price IDs (Replace with actual IDs from Stripe Dashboard):
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

### Site Configuration:
```
NEXT_PUBLIC_SITE_URL=https://www.litxtech.com
VITE_API_URL=https://www.litxtech.com
```

---

## 4. Vercel Deployment

1. **Deploy to Vercel:**
   * The project will automatically deploy via GitHub Actions
   * The serverless function `/api/stripe-checkout` will be available at `https://www.litxtech.com/api/stripe-checkout`

2. **Test the Integration:**
   * Visit `https://www.litxtech.com`
   * Click on any package
   * Click "Buy Now"
   * You should be redirected to Stripe Checkout

---

## 5. Testing

1. **Test with Real Cards:**
   * Use real credit cards for testing
   * Stripe will process real payments in live mode
   * Check Stripe Dashboard for successful payments

2. **Monitor Transactions:**
   * Go to `Payments` in Stripe Dashboard
   * You'll see all successful transactions
   * Failed payments will also be visible

---

## 6. Webhook Configuration (Optional)

For advanced features like order fulfillment:

1. **Create Webhook Endpoint:**
   * Go to `Developers` -> `Webhooks` in Stripe Dashboard
   * Click `Add endpoint`
   * **Endpoint URL:** `https://www.litxtech.com/api/stripe-webhook`
   * **Events to send:** `checkout.session.completed`
   * Copy the `Signing secret` for environment variables

2. **Add Webhook Secret:**
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

---

## 7. Success!

Once configured, your Stripe integration will:
- ✅ Process real payments on www.litxtech.com
- ✅ Redirect to success/cancel pages
- ✅ Collect customer information
- ✅ Generate invoices automatically
- ✅ Handle failed payments gracefully

**Your payment system is now live and ready for customers!** 🚀
