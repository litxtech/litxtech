import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

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
    id: 'community',
    title: 'Topluluk ve şehir kanalları',
    description: 'Şehir seçimi, topluluk akışı, yerel içerik veya kanal bildirimleri ile ilgili sorunlar.',
    checklist: [
      'Şehriniz veya ilçeniz doğru görünmüyor mu?',
      'Topluluk akışında içerik eksik veya gecikmeli mi?',
      'Şehir kanalı bildirimleri gelmiyor mu?'
    ],
    contactHint: 'Kayıtlı e-posta, seçtiğiniz şehir/ilçe ve cihazınızı (iOS/Android sürümü) belirtin.'
  },
  {
    id: 'messaging',
    title: 'Mesajlaşma ve sohbet',
    description: 'Grup sohbetleri, birebir mesajlar, bağlantı veya bildirim sorunları.',
    checklist: [
      'Mesajlar iletilmiyor veya gecikmeli mi geliyor?',
      'Grup sohbetine katılamıyor veya ayrılamıyor musunuz?',
      'Bildirim veya izin ile ilgili bir durum mu var?'
    ],
    contactHint: 'Sohbet veya kanal adını, yaklaşık saati ve varsa hata mesajını ekleyin.'
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
    title: 'Abonelik, ödeme ve iptal',
    description: 'Vora Yıllık (249,99 TL) ve Premium Abonelik (1.999,99 TL) planları, yenileme, iade ve 24 saat iptal talepleri.',
    checklist: [
      'Abonelik ücreti beklenmedik şekilde tahsil edildi mi?',
      'Satın almadan sonraki 24 saat içinde iptal/iade mi istiyorsunuz?',
      'App Store veya Google Play aboneliğini iptal etmek mi istiyorsunuz?'
    ],
    contactHint: 'İşlem tarihi, plan adı, tutar ve Apple/Google işlem referansını ekleyin. Konu: Vora Abonelik.'
  },
  {
    id: 'moderation',
    title: 'Moderasyon ve raporlama',
    description: 'Uygunsuz içerik bildirimi, hesap kısıtlaması veya topluluk kuralları ihlalleri.',
    checklist: [
      'Bir kullanıcıyı veya içeriği raporlamak mı istiyorsunuz?',
      'Hesabınız haksız yere kısıtlandı mı?',
      'Acil güvenlik endişeniz mi var?'
    ],
    contactHint: 'Raporlarda mümkün olduğunca somut bilgi ve ekran görüntüsü paylaşın (kişisel verileri maskeleyin).'
  },
  {
    id: 'privacy',
    title: 'Gizlilik, güvenlik ve veri talepleri',
    description: 'Kişisel veri talepleri, KVKK hakları veya gizlilik politikası soruları.',
    checklist: [
      'KVKK kapsamında erişim veya silme talebiniz mi var?',
      'Gizlilik politikası hakkında soru mu var?',
      'Hesap silme süreciyle ilgili yardım mı gerekiyor?'
    ],
    contactHint: 'Talep türünü ve kayıtlı e-posta adresinizi açıkça belirtin.'
  }
]

export function VoraAppSupport() {
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>(categories[0])
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Vora Destek | LitxTech"
        description="Vora uygulaması için destek ve talep bilgileri."
        path="/vora/destek"
      />
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">Vora · Karadeniz · LitxTech</p>
          <h1 className="text-3xl font-bold">Destek</h1>
          <p className="text-gray-600">
            Önce uygulama içi <strong>Destek</strong> bölümünü kullanmanızı öneririz. Web üzerinden talep açmak için aşağıdan konuyu seçip
            formu doldurabilir veya doğrudan e-posta gönderebilirsiniz. Talepler makul sürede yanıtlanır.
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
                  ? 'border-teal-500 bg-teal-50 shadow-lg'
                  : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50'
              }`}
            >
              <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-600">Seçilen konu</p>
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
            <a href="mailto:support@litxtech.com?subject=Vora%20Destek" className="font-semibold text-teal-600 underline">
              support@litxtech.com
            </a>{' '}
            — konu satırına <span className="font-mono text-sm">Vora Destek</span> yazmanız yanıt süresini kısaltır.
          </p>
        </section>

        {isFormOpen && (
          <section className="space-y-4 rounded-2xl border-2 bg-white p-6 shadow-lg" style={{ borderColor: accent }}>
            <h4 className="flex items-center gap-2 text-xl font-semibold">
              <MessageSquare className="h-5 w-5 text-teal-600" />
              Destek formu
            </h4>
            <p className="text-sm text-gray-600">
              Konu: <span className="font-semibold text-teal-600">{selectedCategory.title}</span>
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Ad Soyad</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Örn. Ayşe Yılmaz"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">E-posta</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="hesabiniz@email.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Vora kayıt e-postası (varsa)</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Uygulamada kullandığınız e-posta"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Şehir / ilçe</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Örn. Trabzon, Ortahisar"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
                <a href="mailto:support@litxtech.com" className="text-teal-600 underline">
                  support@litxtech.com
                </a>{' '}
                adresine e-posta göndermeniz gerekir. Yanıt süresi genellikle 24–48 iş günü içindedir; acil güvenlik konularında konu satırına
                &quot;Vora Acil&quot; yazın.
              </p>
            </form>
          </section>
        )}

        <div className="flex flex-wrap justify-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <Link to="/vora" className="font-semibold hover:underline" style={{ color: accent }}>
            ← Vora tanıtım
          </Link>
          <Link to="/vora/gizlilik" className="font-semibold hover:underline" style={{ color: accent }}>
            Gizlilik Politikası
          </Link>
          <Link to="/vora/kullanim-sartlari" className="font-semibold hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/vora/hesap-silme" className="font-semibold hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
          <Link to="/vora/child-safety" className="font-semibold hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
          <Link to="/vora/abonelik" className="font-semibold hover:underline" style={{ color: accent }}>
            Abonelik
          </Link>
        </div>
      </div>
    </div>
  )
}
