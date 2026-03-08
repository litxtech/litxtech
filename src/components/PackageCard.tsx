import { useState, useEffect } from 'react'
import { CheckCircle, CreditCard, Loader2, Wifi, WifiOff } from 'lucide-react'
import { createCheckoutSession, checkServerHealth } from '../lib/stripe'

interface Package {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  color: string
  popular?: boolean
  stripePriceId: string
}

interface CheckoutModalProps {
  package: Package
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ package: pkg, isOpen, onClose }: CheckoutModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    if (isOpen) {
      checkServerHealth().then(isOnline => {
        setServerStatus(isOnline ? 'online' : 'offline')
      })
    }
  }, [isOpen])

  const handleCheckout = async () => {
    setIsLoading(true)
    setError('')

    try {
      console.log('Starting checkout with:', {
        stripePriceId: pkg.stripePriceId,
        packageName: pkg.name,
        packagePrice: pkg.price
      })

      const result = await createCheckoutSession(
        pkg.stripePriceId,
        pkg.name,
        pkg.price
      )

      console.log('Checkout result:', result)

      if (result.url) {
        // Checkout'a yönlendir
        window.location.href = result.url
      } else {
        throw new Error('Checkout URL oluşturulamadı')
      }
    } catch (err: any) {
      console.error('❌ Checkout error:', err)
      let errorMessage = err.message || 'Ödeme işlemi başlatılamadı'
      
      // Daha kullanıcı dostu hata mesajları
      if (errorMessage.includes('Stripe yapılandırılmamış')) {
        errorMessage = 'Ödeme sistemi yapılandırılmamış. Lütfen yöneticiye başvurun.'
      } else if (errorMessage.includes('kullanılamıyor')) {
        errorMessage = 'Ödeme sistemi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin.'
      } else if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        errorMessage = 'İnternet bağlantınızı kontrol edin ve tekrar deneyin.'
      }
      
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Purchase</h2>
              <p className="text-gray-600">{pkg.name} Package</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Package Info */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-3">{pkg.description}</p>
            <div className="text-3xl font-bold text-blue-600">${pkg.price}</div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Package Features:</h4>
            <ul className="space-y-2">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="text-red-600 text-lg">❌</div>
              <div className="text-sm">
                <h4 className="font-semibold text-red-800 mb-1">Error:</h4>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Server Status */}
        <div className="mb-4">
          <div className={`flex items-center space-x-2 text-sm ${
            serverStatus === 'online' ? 'text-green-600' : 
            serverStatus === 'offline' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {serverStatus === 'online' ? (
              <>
                <Wifi className="w-4 h-4" />
                <span>Payment system active</span>
              </>
            ) : serverStatus === 'offline' ? (
              <>
                <WifiOff className="w-4 h-4" />
                <span>Payment system offline</span>
              </>
            ) : (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking connection...</span>
              </>
            )}
          </div>
        </div>

        {/* Non-Refund Policy Notice */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <div className="text-amber-600 text-lg">⚠️</div>
            <div className="text-sm">
              <h4 className="font-semibold text-amber-800 mb-2">Important Notice:</h4>
              <p className="text-amber-700 mb-2">
                By completing this payment, you acknowledge that LitxTech LLC will begin providing custom software and digital service development immediately after purchase.
              </p>
              <p className="text-amber-700 mb-2">
                Since this is a custom digital service, all sales are final and non-refundable once development has started.
              </p>
              <p className="text-amber-700 mb-2">
                Please review your selected package and details carefully before confirming your order.
              </p>
              <p className="text-amber-700">
                For questions or clarification before purchasing, you can reach us at{' '}
                <a href="mailto:support@litxtech.com" className="text-blue-600 hover:text-blue-800 underline">
                  support@litxtech.com
                </a>
              </p>
            </div>
          </div>
        </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            disabled={isLoading || serverStatus !== 'online'}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : serverStatus !== 'online' ? (
              <>
                <WifiOff className="w-4 h-4" />
                <span>Payment System Offline</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Buy Now ${pkg.price}</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Secure payment processed by Stripe
          </p>
        </div>
      </div>
    </div>
  )
}

export function PackageCard({ pkg }: { pkg: Package }) {
  const [showCheckout, setShowCheckout] = useState(false)

  return (
    <>
      <div className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 group ${pkg.popular ? 'ring-2 ring-blue-400/50' : ''}`}>
        {pkg.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
              En Popüler
            </span>
          </div>
        )}
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
          <p className="text-gray-300 mb-4">{pkg.description}</p>
          <div className={`text-4xl font-bold mb-2 ${pkg.color}`}>${pkg.price}</div>
          <p className="text-gray-400">Tek seferlik ödeme</p>
        </div>
        
        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={() => setShowCheckout(true)}
          className={`w-full ${pkg.popular ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Buy Now</span>
        </button>
      </div>

      <CheckoutModal
        package={pkg}
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
      />
    </>
  )
}
