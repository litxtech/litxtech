// Stripe checkout integration with fallback
// Try production first, fallback to localhost

// Dynamic API URL based on environment
const getApiBaseUrl = () => {
  // Production URL
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  // Vercel deployment URL
  if (window.location.hostname.includes('vercel.app')) {
    return `https://${window.location.hostname}`
  }
  // Default production URL
  if (window.location.hostname === 'www.litxtech.com' || window.location.hostname === 'litxtech.com') {
    return 'https://www.litxtech.com'
  }
  // Fallback to localhost
  return 'http://localhost:3001'
}

const API_BASE_URL = getApiBaseUrl()
const LOCALHOST_URL = 'http://localhost:3001'

export async function createCheckoutSession(priceId: string, packageName: string, packagePrice: number) {
  try {
    // Map Product ID to package ID
    let packageId = 'starter-website'
    
    // Map Product IDs to package IDs
    if (priceId === 'prod_TJx1tMK4kjAKYw') packageId = 'starter-website'
    if (priceId === 'prod_TJx2DQI2ya2TRE') packageId = 'professional-website-suite'
    if (priceId === 'prod_TJx3685vaECdcB') packageId = 'enterprise-saas-platform'
    if (priceId === 'prod_TJx4FeOKSgVjsY') packageId = 'ai-lite'
    if (priceId === 'prod_TJx7xGb2pBFQsA') packageId = 'ai-pro'
    if (priceId === 'prod_TJx85dkj0qblrw') packageId = 'ai-enterprise'
    if (priceId === 'prod_TJx8NFA5ektMlM') packageId = 'smart-hotel-suite'
    if (priceId === 'prod_TJx9mc9WGeeTS5') packageId = 'restaurant-pro'
    if (priceId === 'prod_TJxAosCL7gRfYQ') packageId = 'travel-agency-hub'
    if (priceId === 'prod_TJxAg8uJVRzthM') packageId = 'erp-crm-suite'
    if (priceId === 'prod_TJxBIgZuYnIadp') packageId = 'ecommerce-ultra'
    if (priceId === 'prod_TJcc3OTPPk4Uf9') packageId = 'custom-enterprise-solutions'
    if (priceId === 'prod_TJcac84nb1EnsO') packageId = 'ui-ux-design-suite'
    if (priceId === 'prod_TJxpyXo2HM4hkT') packageId = 'annual-maintenance-plan'
    if (priceId === 'prod_TJxoeD8wdnwC9c') packageId = 'custom-software-development'
    if (priceId === 'prod_TJcbY7ejfso2Yq') packageId = 'digital-suite'

    console.log('Mapped Product ID to package ID:', { priceId, packageId })

    // Try production API first
    try {
      const response = await fetch(`${API_BASE_URL}/api/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          packageName,
          packagePrice: packagePrice, // Frontend'den gelen fiyat (sadece referans için)
        }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('✅ Checkout response:', data)
        return data
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('❌ API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        
        // Daha açıklayıcı hata mesajları
        if (errorData.error === 'Stripe is not configured') {
          throw new Error('Stripe yapılandırılmamış. Lütfen yöneticiye başvurun.')
        }
        if (errorData.error === 'Invalid package ID') {
          throw new Error('Geçersiz paket seçildi. Lütfen tekrar deneyin.')
        }
        
        throw new Error(errorData.error || errorData.message || 'API isteği başarısız oldu')
      }
    } catch (error: any) {
      console.error('❌ Production API failed:', error)
      // Eğer network hatası değilse, direkt fırlat (localhost'a düşmesin)
      if (error.message && !error.message.includes('fetch')) {
        throw error
      }
      console.log('Trying localhost fallback...')
    }

    // Fallback to localhost (sadece development için)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      try {
        const localhostResponse = await fetch(`${LOCALHOST_URL}/api/stripe/checkout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            packageId,
            packageName,
            packagePrice,
          }),
        })

        const localhostData = await localhostResponse.json()

        if (!localhostResponse.ok) {
          throw new Error(localhostData.error || 'Checkout could not be created')
        }

        return localhostData
      } catch (localhostError: any) {
        console.error('❌ Localhost API also failed:', localhostError)
        throw new Error('Ödeme sistemi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.')
      }
    } else {
      // Production'da localhost'a düşme, direkt hata ver
      throw new Error('Ödeme sistemi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin veya destek ekibine başvurun.')
    }
  } catch (error: any) {
    console.error('❌ Checkout error:', error)
    // Hata mesajı zaten set edilmişse, onu kullan
    throw error
  }
}

// Health check function with fallback
export async function checkServerHealth() {
  try {
    // Try production API first
    const productionResponse = await fetch(`${API_BASE_URL}/api/stripe-checkout`, {
      method: 'GET',
    })
    if (productionResponse.ok) {
      return true
    }
  } catch (error) {
    console.log('Production API not available, trying localhost...')
  }

  try {
    // Fallback to localhost
    const localhostResponse = await fetch(`${LOCALHOST_URL}/api/health`, {
      method: 'GET',
    })
    return localhostResponse.ok
  } catch (error) {
    console.error('Both APIs failed:', error)
    return false
  }
}
