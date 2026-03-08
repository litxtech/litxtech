import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function openMyTrabzonDeepLink(path: string, hash?: string) {
  if (typeof window === 'undefined') return false
  
  // Mobil cihaz kontrolü
  const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
  
  // Eğer zaten mytrabzon:// veya litxtech:// ile açılmışsa, direkt deep link kullan
  const currentUrl = window.location.href
  const isAlreadyDeepLink = currentUrl.startsWith('mytrabzon://') || currentUrl.startsWith('litxtech://')
  
  // Mobil cihaz veya zaten deep link içindeyse
  if (!isMobile && !isAlreadyDeepLink) return false

  const normalizedPath = path.replace(/^\/+/, '').replace(/\/+$/, '')
  const hashSuffix = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : ''
  const deepLink = `mytrabzon://${normalizedPath}${hashSuffix}`

  console.log('🔗 Opening deep link:', deepLink)

  try {
    // Deep link'i aç
    window.location.href = deepLink
    
    // Eğer deep link açılamazsa (uygulama yüklü değilse), bir süre sonra web'e geri dön
    setTimeout(() => {
      // Eğer hala aynı sayfadaysak, deep link çalışmadı demektir
      if (window.location.href === currentUrl || window.location.href.includes('mytrabzon://')) {
        console.warn('⚠️ Deep link açılamadı, uygulama yüklü olmayabilir')
      }
    }, 1000)
    
    return true
  } catch (error) {
    console.warn('❌ Deep link failed:', error)
    return false
  }
}
