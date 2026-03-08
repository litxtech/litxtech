import { useState } from 'react'
import { Heart, Sparkles, CheckCircle, Loader2, Users } from 'lucide-react'

const SUPPORT_PACKAGES = [
  { amount: 89, label: '89 ₺', description: 'Basic Support Package', icon: Heart },
  { amount: 139, label: '139 ₺', description: 'Standard Support Package', icon: Users },
  { amount: 339, label: '339 ₺', description: 'Premium Support Package', icon: Sparkles },
]

export function DonationPage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [donorName, setDonorName] = useState('')

  const handleDonate = async (amount: number) => {
    if (!amount || amount < 1) {
      setError('Please enter a valid amount')
      return
    }

    try {
      setLoading(true)
      setError('')

      const response = await fetch('https://www.litxtech.com/api/donation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          donorName: donorName || 'Anonymous',
          type: 'mytrabzon-support',
          currency: 'TRY'
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Could not start donation')
      }

      const data = await response.json()

      if (data.url) {
        // Stripe Checkout'a yönlendir
        window.location.href = data.url
      } else {
        throw new Error('Could not create payment page')
      }
    } catch (err: any) {
      console.error('Donation error:', err)
      setError(err.message || 'An error occurred during the donation')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amount = selectedAmount || parseFloat(customAmount)
    if (amount) {
      handleDonate(amount)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600 rounded-full mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            MyTrabzon – Support & Donation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            MyTrabzon is a mobile app that brings university students together: events, community organizations,
            social gatherings, and city life.
          </p>
        </div>

        {/* Description Box */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Where Do Donations Go?
          </h2>
          <div className="space-y-3 text-gray-200">
            <p className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Breakfast events for university students</span>
            </p>
            <p className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Social gatherings and community activity expenses</span>
            </p>
            <p className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>Culture, travel and nature tour organization support</span>
            </p>
            <p className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>MyTrabzon app development, security and infrastructure</span>
            </p>
          </div>
          <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-200 text-sm">
              <strong>Important:</strong> Donations are not mandatory, not required to unlock any app feature,
              and do not give users any special advantage. Donations are entirely voluntary.
              This is not a commercial sale, product/service sale, or membership model.
            </p>
          </div>
        </div>

        {/* Donation Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Donor Name (Optional) */}
            <div>
              <label htmlFor="donorName" className="block text-sm font-medium text-gray-300 mb-2">
                Your name (optional)
              </label>
              <input
                id="donorName"
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Your name (can stay anonymous)"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Support Packages */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Choose a support package
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUPPORT_PACKAGES.map((pkg) => {
                  const Icon = pkg.icon
                  return (
                    <button
                      key={pkg.amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(pkg.amount)
                        setCustomAmount('')
                      }}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                        selectedAmount === pkg.amount
                          ? 'border-purple-500 bg-purple-500/20 scale-105'
                          : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-center">
                        <Icon className={`w-8 h-8 mx-auto mb-3 ${
                          selectedAmount === pkg.amount ? 'text-purple-400' : 'text-gray-400'
                        }`} />
                        <div className="text-3xl font-bold text-white mb-2">
                          {pkg.label}
                        </div>
                        <div className="text-sm text-gray-300">
                          {pkg.description}
                        </div>
                        {selectedAmount === pkg.amount && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="w-6 h-6 text-purple-400" />
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label htmlFor="customAmount" className="block text-sm font-medium text-gray-300 mb-2">
                Or enter a custom amount (₺)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  ₺
                </span>
                <input
                  id="customAmount"
                  type="number"
                  min="1"
                  step="1"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (!selectedAmount && !customAmount)}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6" />
                  Support
                </>
              )}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
            <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Secure payment</h3>
            <p className="text-gray-400 text-sm">
              Secure payment via Stripe
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
            <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Supporter badge</h3>
            <p className="text-gray-400 text-sm">
              Special "Supporter" badge for donors
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Community support</h3>
            <p className="text-gray-400 text-sm">
              Contribute to the student community
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
