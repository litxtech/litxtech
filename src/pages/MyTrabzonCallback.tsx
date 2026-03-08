import { useEffect, useState } from 'react'

export function MyTrabzonCallback() {
  const [showButton, setShowButton] = useState(false)
  const [message, setMessage] = useState('Uygulamaya yönlendiriliyorsunuz...')
  const [subMessage, setSubMessage] = useState('Eğer otomatik yönlendirme çalışmazsa, aşağıdaki butona tıklayın.')

  useEffect(() => {
    // URL'den parametreleri al
    const urlParams = new URLSearchParams(window.location.search)
    const accessToken = urlParams.get('access_token')
    const refreshToken = urlParams.get('refresh_token')
    const code = urlParams.get('code')
    const redirectTo = urlParams.get('redirect_to')
    const error = urlParams.get('error')
    const errorDescription = urlParams.get('error_description')

    // Hata varsa göster
    if (error) {
      setMessage('Hata: ' + (errorDescription || error))
      setSubMessage('Lütfen uygulamayı açıp tekrar deneyin.')
      setShowButton(true)
      return
    }

    // Deep link URL'ini oluştur
    let deepLinkUrl = 'mytrabzon://auth/callback'
    const params: string[] = []

    if (accessToken) params.push('access_token=' + encodeURIComponent(accessToken))
    if (refreshToken) params.push('refresh_token=' + encodeURIComponent(refreshToken))
    if (code) params.push('code=' + encodeURIComponent(code))
    if (redirectTo) params.push('redirect_to=' + encodeURIComponent(redirectTo))

    if (params.length > 0) {
      deepLinkUrl += '?' + params.join('&')
    }

    // Mobil cihaz kontrolü
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      // iOS için
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // Universal Link denemesi
        window.location.href = deepLinkUrl

        // Eğer 2 saniye içinde yönlendirme olmazsa, butonu göster
        setTimeout(() => {
          setShowButton(true)
          setMessage('Uygulamayı açmak için butona tıklayın')
        }, 2000)
      }
      // Android için
      else if (/Android/i.test(navigator.userAgent)) {
        // Intent URL denemesi
        const intentUrl =
          'intent://auth/callback#' +
          (params.length > 0 ? params.join('&') : '') +
          '#Intent;scheme=mytrabzon;package=com.litxtech.mytrabzon;end'

        // Önce intent URL'i dene
        window.location.href = intentUrl

        // Eğer çalışmazsa normal deep link'e dön
        setTimeout(() => {
          window.location.href = deepLinkUrl
        }, 500)

        // Eğer hala çalışmazsa butonu göster
        setTimeout(() => {
          setShowButton(true)
          setMessage('Uygulamayı açmak için butona tıklayın')
        }, 2000)
      }
    } else {
      // Desktop'ta direkt butonu göster
      setShowButton(true)
      setMessage('Mobil cihazınızda uygulamayı açın')
      setSubMessage('Bu sayfa sadece mobil cihazlarda çalışır.')
    }

    // Deep link URL'ini global olarak sakla (buton için)
    ;(window as any).deepLinkUrl = deepLinkUrl
  }, [])

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const deepLinkUrl = (window as any).deepLinkUrl || 'mytrabzon://auth/callback'
    window.location.href = deepLinkUrl
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 to-red-800">
      <div className="container text-center px-8">
        <div className="spinner mb-4"></div>
        <div className="message text-lg mb-2">{message}</div>
        <div className="submessage text-sm opacity-80">{subMessage}</div>
        {showButton && (
          <a
            href="#"
            onClick={handleButtonClick}
            className="button inline-block mt-6 px-6 py-3 bg-white text-red-600 rounded-lg font-semibold no-underline transition-transform hover:scale-105"
          >
            Uygulamayı Aç
          </a>
        )}
      </div>

      <style>{`
        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

