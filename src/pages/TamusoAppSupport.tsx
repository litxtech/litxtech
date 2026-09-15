import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

type SupportCategory = {
  id: string
  title: string
  description: string
  checklist: string[]
  contactHint: string
}

const categories: SupportCategory[] = [
  {
    id: 'rooms',
    title: 'Sesli odalar',
    description: 'Oda oluşturma, katılma, konuşmacı sırası veya ses kalitesi sorunları.',
    checklist: [
      'Odaya bağlanamıyor veya ses gelmiyor mu?',
      'Mikrofon / kulaklık izni ile ilgili bir durum mu var?',
      'Konuşmacı sırasına giremiyor musunuz?'
    ],
    contactHint: 'Cihaz (iOS/Android sürümü), oda adı (varsa) ve yaklaşık saati belirtin.'
  },
  {
    id: 'account',
    title: 'Hesap ve giriş',
    description: 'Kayıt, giriş, şifre sıfırlama veya hesap güvenliği.',
    checklist: [
      'Doğrulama kodu veya e-posta gelmiyor mu?',
      'Hesaba giriş yapamıyor musunuz?',
      'Şüpheli aktivite mi fark ettiniz?'
    ],
    contactHint: 'Kayıtlı e-posta adresinizi yazın; şifrenizi paylaşmayın.'
  },
  {
    id: 'moderation',
    title: 'Güvenlik ve raporlama',
    description: 'Taciz bildirimi, engelleme, çocuk güvenliği veya topluluk ihlali.',
    checklist: [
      'Bir kullanıcıyı veya odayı raporlamak mı istiyorsunuz?',
      'Çocuk güvenliği ile ilgili acil bir durum mu var?',
      'Engelleme çalışmıyor mu?'
    ],
    contactHint: 'Mümkünse kullanıcı adı, oda ve ekran görüntüsü ekleyin (kişisel verileri maskeleyin).'
  },
  {
    id: 'privacy',
    title: 'Gizlilik ve hesap silme',
    description: 'KVKK talepleri, veri erişimi veya hesap silme.',
    checklist: [
      'Hesap silme talebiniz mi var?',
      'Verilerinize erişim veya silme hakkı mı kullanıyorsunuz?',
      'Gizlilik politikası hakkında soru mu var?'
    ],
    contactHint: 'Kayıtlı e-posta ve talebinizin türünü net yazın.'
  },
  {
    id: 'payment',
    title: 'Ödeme (varsa)',
    description: 'Uygulama içi satın alma, abonelik veya fatura soruları.',
    checklist: [
      'Ödeme yansımadı mı?',
      'App Store / Google Play işlemiyle ilgili sorun mu var?',
      'İade veya iptal talebiniz mi bulunuyor?'
    ],
    contactHint: 'İşlem tarihi, tutar ve mümkünse işlem referansını ekleyin.'
  }
]

export function TamusoAppSupport() {
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>(categories[0])
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Destek | LitxTech"
        description="Tamuso sesli oda uygulaması için destek ve talep bilgileri."
        path="/tamuso/destek"
      />
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Tamuso · LitxTech</p>
          <h1 className="text-3xl font-bold">Destek</h1>
          <p className="text-gray-600">
            Önce uygulama içi <strong>Destek</strong> bölümünü kullanmanızı öneririz. Web üzerinden konuyu seçip formu doldurabilir veya doğrudan
            e-posta gönderebilirsiniz.
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
              className={`border p-5 text-left transition-all ${
                selectedCategory.id === category.id
                  ? 'border-amber-500 bg-amber-50 shadow-md'
                  : 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
              }`}
            >
              <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>

        <section className="space-y-4 border border-gray-200 bg-zinc-50 p-6">
          <div>
            <p className="text-sm font-semibold uppercase text-amber-700">Seçilen konu</p>
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
            <a href="mailto:support@litxtech.com?subject=Tamuso%20Destek" className="font-semibold text-amber-700 underline">
              support@litxtech.com
            </a>{' '}
            — konu satırına <span className="font-mono text-sm">Tamuso Destek</span> yazın.
          </p>
        </section>

        {isFormOpen && (
          <section className="space-y-4 border-2 bg-white p-6 shadow-lg" style={{ borderColor: accent }}>
            <h4 className="flex items-center gap-2 text-xl font-semibold">
              <MessageSquare className="h-5 w-5 text-amber-700" />
              Destek formu
            </h4>
            <p className="text-sm text-gray-600">
              Konu: <span className="font-semibold text-amber-700">{selectedCategory.title}</span>
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Ad Soyad</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Örn. Ayşe Yılmaz"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">E-posta</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="hesabiniz@email.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Tamuso kayıt e-postası (varsa)</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Uygulamada kullandığınız e-posta"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea
                  rows={5}
                  className="w-full border border-gray-300 px-4 py-2 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  placeholder="Cihaz, adımlar ve varsa hata mesajı."
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
                  className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Kapat
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Bu form arayüz önizlemesidir; gönderim için{' '}
                <a href="mailto:support@litxtech.com" className="text-amber-700 underline">
                  support@litxtech.com
                </a>{' '}
                kullanın. Acil çocuk güvenliği için konu satırına &quot;Tamuso Child Safety&quot; yazın.
              </p>
            </form>
          </section>
        )}

        <div className="flex flex-wrap justify-center gap-4 border border-gray-200 bg-zinc-50 p-6">
          <Link to="/tamuso" className="font-semibold hover:underline" style={{ color: accent }}>
            ← Tamuso tanıtım
          </Link>
          <Link to="/tamuso/gizlilik" className="font-semibold hover:underline" style={{ color: accent }}>
            Gizlilik
          </Link>
          <Link to="/tamuso/kullanim-sartlari" className="font-semibold hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/tamuso/hesap-silme" className="font-semibold hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
          <Link to="/tamuso/child-safety" className="font-semibold hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
        </div>
      </div>
    </div>
  )
}
