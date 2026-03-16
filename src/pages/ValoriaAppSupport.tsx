import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'

const accent = '#0d9488'

type SupportCategory = {
  id: string
  title: string
  description: string
  checklist: string[]
  contactHint: string
}

const categories: SupportCategory[] = [
  {
    id: 'reservation',
    title: 'Rezervasyon ve check-in',
    description: 'Rezervasyon, check-in/check-out, oda değişikliği veya tarih değişikliği ile ilgili sorunlar.',
    checklist: [
      'Rezervasyonunuz onaylandı mı?',
      'QR kod veya uygulama ile check-in yapamıyor musunuz?',
      'Fatura veya ödeme ile ilgili sorun mu var?'
    ],
    contactHint: 'Rezervasyon numaranızı ve kısa açıklama ekleyin.'
  },
  {
    id: 'account',
    title: 'Hesap ve giriş',
    description: 'Hesap oluşturma, telefon doğrulama, şifre veya giriş sorunları.',
    checklist: [
      'SMS doğrulama kodu gelmiyor mu?',
      'Hesaba giriş yapamıyor musunuz?',
      'Telefon veya e-posta değiştirmek mi istiyorsunuz?'
    ],
    contactHint: 'Kayıtlı telefon veya e-posta adresinizi belirtin.'
  },
  {
    id: 'digital-key',
    title: 'Dijital anahtar ve kapı',
    description: 'Telefonda dijital anahtar, kapı açılmıyor veya oda erişim sorunları.',
    checklist: [
      'Dijital anahtar uygulamada görünmüyor mu?',
      'Kapı açılmıyor veya hata veriyor mu?',
      'Check-out sonrası anahtar hâlâ çalışıyor mu?'
    ],
    contactHint: 'Oda numaranızı ve tam olarak ne olduğunu yazın.'
  },
  {
    id: 'privacy',
    title: 'Gizlilik, hesap silme ve veri',
    description: 'Veri kullanımı, hesap silme talebi veya kişisel veri erişim talepleri.',
    checklist: [
      'Hesap silmek mi istiyorsunuz?',
      'Verilerinizin bir kopyasını mı istiyorsunuz?',
      'Gizlilik sözleşmesi veya veri işleme hakkında soru mu var?'
    ],
    contactHint: 'Hesap silme için Hesap Silme sayfasını da kullanabilirsiniz.'
  }
]

export function ValoriaAppSupport() {
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>(categories[0])
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: accent }}>Valoria App / Valoria Hotel</p>
          <h1 className="text-3xl font-bold">Destek ve talep açma</h1>
          <p className="text-gray-600">
            Sorununuzla en iyi eşleşen kategoriyi seçin. &quot;Destek talebi aç&quot; butonuna tıklayarak formu doldurup talebinizi gönderin. En kısa sürede size dönüş yapacağız.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category)
                setIsFormOpen(false)
              }}
              className={`text-left rounded-2xl border p-5 transition-all ${
                selectedCategory.id === category.id
                  ? 'border-[#0d9488] bg-[#ccfbf1]/50 shadow-lg'
                  : 'border-gray-200 hover:border-[#0d9488]/50 hover:bg-gray-50'
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>

        <section className="rounded-2xl border border-gray-200 p-6 space-y-4 bg-gray-50">
          <div>
            <p className="text-sm font-semibold uppercase" style={{ color: accent }}>Seçilen konu</p>
            <h3 className="text-2xl font-bold mt-1">{selectedCategory.title}</h3>
            <p className="text-gray-600 mt-2">{selectedCategory.description}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-800">Kontrol listesi</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {selectedCategory.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500">{selectedCategory.contactHint}</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl text-white font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accent }}
          >
            <Send className="h-4 w-4" /> Destek talebi aç
          </button>
        </section>

        {isFormOpen && (
          <section className="rounded-2xl border-2 p-6 space-y-4 bg-white shadow-lg" style={{ borderColor: accent }}>
            <h4 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" style={{ color: accent }} />
              Destek formu
            </h4>
            <p className="text-sm text-gray-600">
              Konu: <span className="font-semibold" style={{ color: accent }}>{selectedCategory.title}</span>
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="Örn. Ahmet Yılmaz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="sizin@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rezervasyon no (varsa)</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="Örn. RES-12345"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sorununuzu açıklayın</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="Lütfen cihaz (iOS/Android), ne yaptığınız ve varsa hata mesajını yazın."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl text-white font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: accent }}
                >
                  Gönder
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 hover:bg-gray-100 transition-colors"
                >
                  Formu kapat
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Talepler support@valoriahotel.com adresine iletilir. 24–48 saat içinde yanıt vermeyi hedefliyoruz.
              </p>
            </form>
          </section>
        )}

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-wrap gap-4 justify-center">
          <Link to="/valoria-app" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            ← Valoria App Tanıtım
          </Link>
          <Link to="/valoria-app-privacy" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            Gizlilik Sözleşmesi
          </Link>
          <Link to="/valoria-app-terms" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/valoria-app/delete-account" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
        </div>
      </div>
    </div>
  )
}
