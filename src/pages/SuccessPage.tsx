import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Home, Mail, Coffee, Heart } from 'lucide-react'

export function SuccessPage() {
  const [sessionId, setSessionId] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('session_id')
    const donationType = urlParams.get('type')
    if (id) {
      setSessionId(id)
    }
    if (donationType) {
      setType(donationType)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center border border-white/20">
        {/* Success Icon */}
        <div className={`w-20 h-20 bg-gradient-to-r rounded-full flex items-center justify-center mx-auto mb-6 ${
          type === 'donation' 
            ? 'from-pink-500 to-purple-600' 
            : 'from-green-500 to-green-600'
        }`}>
          {type === 'donation' ? (
            <Heart className="w-10 h-10 text-white" />
          ) : (
            <CheckCircle className="w-10 h-10 text-white" />
          )}
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          {type === 'donation' ? 'Thank You for Your Donation! ❤️' : 'Payment Successful! 🎉'}
        </h1>
        
        <p className="text-xl text-gray-300 mb-6">
          {type === 'donation' ? (
            <>
              Your donation was completed successfully.
              <br />
              You bought students a coffee! ☕
            </>
          ) : (
            <>
              Your purchase was completed successfully.
              <br />
              We will start working on your project.
            </>
          )}
        </p>

        {/* Session Info */}
        {sessionId && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-6">
            <p className="text-gray-300 text-sm">
              <strong>Transaction ID:</strong> {sessionId}
            </p>
            <p className="text-gray-400 text-xs mt-2">
              You can use this ID in support requests.
            </p>
          </div>
        )}

        {/* Next Steps */}
        {type !== 'donation' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Next steps:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <span className="text-gray-300">A confirmation message will be sent to your email</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <span className="text-gray-300">We will contact you for project details</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                <span className="text-gray-300">Development will begin</span>
              </div>
            </div>
          </div>
        )}

        {type === 'donation' && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Coffee className="w-8 h-8 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Your Donation Reaches Students</h3>
            </div>
            <p className="text-gray-300 text-center">
              Donations go directly to students and brighten their day.
              <br />
              Thank you for your support! 🙏
            </p>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-8">
          <h4 className="text-white font-semibold mb-2">Have questions?</h4>
          <p className="text-gray-300 text-sm mb-3">
            Our support team is ready to help 24/7.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a 
              href="mailto:support@litxtech.com"
              className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>support@litxtech.com</span>
            </a>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300">+1 307 271 5151</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <Link
            to="/contact"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowRight className="w-4 h-4" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
