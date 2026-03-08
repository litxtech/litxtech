import { Link } from 'react-router-dom'
import { XCircle, ArrowLeft, RefreshCw, Home } from 'lucide-react'

export function CancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="glass p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-center border border-white/20">
        {/* Cancel Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-white" />
        </div>

        {/* Cancel Message */}
        <h1 className="text-4xl font-bold text-white mb-4">
          Ödeme İptal Edildi
        </h1>
        
        <p className="text-xl text-gray-300 mb-6">
          Ödeme işlemi iptal edildi. 
          <br />
          Hiçbir ücret alınmadı.
        </p>

        {/* Info Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Neden iptal ettiniz?</h3>
          <div className="space-y-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Fiyat hakkında sorularınız mı var?</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Paket özelliklerini daha detaylı görmek mi istiyorsunuz?</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300">Özel bir teklif mi almak istiyorsunuz?</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 mb-8">
          <h4 className="text-white font-semibold mb-2">Size Nasıl Yardımcı Olabiliriz?</h4>
          <p className="text-gray-300 text-sm mb-3">
            Satış ekibimiz size özel çözümler sunabilir.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a 
              href="mailto:support@litxtech.com"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              support@litxtech.com
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
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <Link
            to="/packages"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Paketleri Tekrar İncele</span>
          </Link>
          
          <Link
            to="/contact"
            className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>İletişime Geç</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
