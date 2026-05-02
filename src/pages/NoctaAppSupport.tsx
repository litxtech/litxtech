import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#6366f1'

type SupportCategory = {
  id: string
  title: string
  description: string
  checklist: string[]
  contactHint: string
}

const categories: SupportCategory[] = [
  {
    id: 'profile',
    title: 'Profil, keşfet ve eşleşme',
    description: 'Profil düzenleme, fotoğraf, keşfet akışı, eşleşme veya bildirim sorunları.',
    checklist: [
      'Profiliniz veya fotoğraflarınız beklendiği gibi görünmüyor mu?',
      'Eşleşme veya bildirim gelmiyor mu?',
      'Konum veya tercih ayarları kaydedilmiyor mu?'
    ],
    contactHint: 'Kayıtlı e-posta veya kullanıcı adınızı ve cihazınızı (iOS/Android sürümü) belirtin.'
  },
  {
    id: 'messaging',
    title: 'Mesajlaşma ve aramalar',
    description: 'Mesaj gönderme, sesli/görüntülü arama, bağlantı veya ses kalitesi ile ilgili sorunlar.',
    checklist: [
      'Mesajlar iletilmiyor veya gecikmeli mi geliyor?',
      'Arama başlamıyor veya aniden kesiliyor mu?',
      'Bildirim veya izin (mikrofon/kamera) ile ilgili bir durum mu var?'
    ],
    contactHint: 'Karşı tarafın kullanıcı adı (varsa), yaklaşık saat ve hata mesajını ekleyin.'
  },
  {
    id: 'account',
    title: 'Hesap ve giriş',
    description: 'Kayıt, giriş, şifre sıfırlama veya hesap güvenliği.',
    checklist: [
      'Doğrulama kodu veya e-posta gelmiyor mu?',
      'Hesaba giriş yapamıyor veya çıkış sonrası sorun mu yaşıyorsunuz?',
      'Şüpheli aktivite mi fark ettiniz?'
    ],
    contactHint: 'Kayıtlı e-posta adresinizi yazın; güvenlik için şifrenizi paylaşmayın.'
  },
  {
    id: 'payment',
    title: 'Ödeme ve cüzdan',
    description: 'Bakiye, paket satın alma veya fatura ile ilgili talepler.',
    checklist: [
      'Ödeme tamamlandı ama bakiye yansımadı mı?',
      'App Store / Google Play üzerinden yapılan işlemle ilgili sorun mu var?',
      'İade veya iptal talebiniz mi bulunuyor?'
    ],
    contactHint: 'İşlem tarihi, tutar ve mümkünse işlem referansını ekleyin.'
  },
  {
    id: 'privacy',
    title: 'Gizlilik, güvenlik ve raporlama',
    description: 'Kişisel veri talepleri, topluluk kuralları ihlali bildirimi veya güvenlik endişeleri.',
    checklist: [
      'KVKK kapsamında erişim veya silme talebiniz mi var?',
      'Başka bir kullanıcıyı veya içeriği raporlamak mı istiyorsunuz?',
      'Gizlilik politikası hakkında soru mu var?'
    ],
    contactHint: 'Raporlarda mümkün olduğunca somut bilgi ve ekran görüntüsü paylaşın (kişisel verileri maskeleyin).'
  }
]

export function NoctaAppSupport() {
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>(categories[0])
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Nocta Destek | LitxTech"
        description="Nocta uygulaması için destek ve talep bilgileri."
        path="/nocta/destek"
      />
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Nocta · LitxTech</p>
          <h1 className="text-3xl font-bold">Destek</h1>
          <p className="text-gray-600">
            Önce uygulama içi <strong>Destek</strong> bölümünü kullanmanızı öneririz. Web üzerinden talep açmak için aşağıdan konuyu seçip formu
            doldurabilir veya doğrudan e-posta gönderebilirsiniz. Talepler makul sürede yanıtlanır.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setSelectedCategory(category)
                setIsFormOpen(false)
              }}
              className={`rounded-2xl border p-5 text-left transition-all ${
                selectedCategory.id === category.id
                  ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
              }`}
            >
              <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div>
            <p className="text-sm font-semibold uppercase text-indigo-600">Seçilen konu</p>
            <h3 className="mt-1 text-2xl font-bold">{selectedCategory.title}</h3>
            <p className="mt-2 text-gray-600">{selectedCategory.description}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-800">Kontrol listesi</p>
            <ul className="list-disc space-y-1 pl-6 text-gray-700">
              {selectedCategory.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500">{selectedCategory.contactHint}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
          >
            <Send className="h-4 w-4" /> Destek talebi formu
          </button>
          <p className="text-sm text-gray-600">
            E-posta:{' '}
            <a href="mailto:support@litxtech.com?subject=Nocta%20Destek" className="font-semibold text-indigo-600 underline">
              support@litxtech.com
            </a>{' '}
            — konu satırına <span className="font-mono text-sm">Nocta Destek</span> yazmanız yanıt süresini kısaltır.
          </p>
        </section>

        {isFormOpen && (
          <section className="space-y-4 rounded-2xl border-2 bg-white p-6 shadow-lg" style={{ borderColor: accent }}>
            <h4 className="flex items-center gap-2 text-xl font-semibold">
              <MessageSquare className="h-5 w-5 text-indigo-600" />
              Destek formu
            </h4>
            <p className="text-sm text-gray-600">
              Konu: <span className="font-semibold text-indigo-600">{selectedCategory.title}</span>
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Ad Soyad</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Örn. Ayşe Yılmaz"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">E-posta</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="hesabiniz@email.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Nocta kayıt e-postası (varsa)</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Uygulamada kullandığınız e-posta"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Cihaz (iOS/Android ve sürüm), adımlar ve varsa hata mesajı."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accent }}
                >
                  Gönder (önizleme)
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Kapat
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Bu form şu an yalnızca arayüz önizlemesidir; gönderim için{' '}
                <a href="mailto:support@litxtech.com" className="text-indigo-600 underline">
                  support@litxtech.com
                </a>{' '}
                adresine e-posta göndermeniz gerekir. Yanıt süresi genellikle 24–48 iş günü içindedir; acil güvenlik konularında konu satırına
                &quot;Nocta Acil&quot; yazın.
              </p>
            </form>
          </section>
        )}

        <div className="flex flex-wrap justify-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <Link to="/nocta" className="font-semibold hover:underline" style={{ color: accent }}>
            ← Nocta tanıtım
          </Link>
          <Link to="/nocta/gizlilik" className="font-semibold hover:underline" style={{ color: accent }}>
            Gizlilik Politikası
          </Link>
          <Link to="/nocta/kullanim-sartlari" className="font-semibold hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/nocta/hesap-silme" className="font-semibold hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
        </div>
      </div>
    </div>
  )
}
