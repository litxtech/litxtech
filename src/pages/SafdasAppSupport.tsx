import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#047857'

type SupportCategory = {
  id: string
  title: string
  description: string
  checklist: string[]
  contactHint: string
}

const categories: SupportCategory[] = [
  {
    id: 'prayer',
    title: 'Namaz vakitleri ve kıble',
    description: 'Vakit hesaplama, şehir seçimi, kıble pusulası veya hatırlatıcı sorunları.',
    checklist: [
      'Namaz vakti beklediğiniz saatten farklı mı?',
      'Şehir veya ülke seçimi kaydolmuyor mu?',
      'Kıble yönü sapıyor veya pusula kalibrasyon istiyor mu?'
    ],
    contactHint: 'Ülke, şehir, hesaplama yöntemi, cihaz saati ve iOS/Android sürümünü yazın.'
  },
  {
    id: 'quran',
    title: 'Kur’an, dua ve ibadet takibi',
    description: 'Meal, sesli tilavet, yer imi, zikir sayacı veya namaz takip kayıtları.',
    checklist: [
      'Bir meal, yazım veya ses kaydında hata mı fark ettiniz?',
      'İlerleme veya yer imleri kayboluyor mu?',
      'Hatırlatıcı istediğiniz vakitte gelmiyor mu?'
    ],
    contactHint: 'Sure, ayet veya özellik adını ve varsa ekran görüntüsünü belirtin. Hassas ibadet ayrıntılarını gereksiz paylaşmayın.'
  },
  {
    id: 'community',
    title: 'SAF Halkaları ve sosyal içerik',
    description: 'Gönderiler, yorumlar, takip, topluluklar ve görünürlük ayarları.',
    checklist: [
      'Gönderi veya yorum yayınlanmıyor mu?',
      'Topluluğa katılamıyor veya ayrılamıyor musunuz?',
      'Profil veya gönderi görünürlüğü yanlış mı?'
    ],
    contactHint: 'Kullanıcı adınızı, topluluk adını ve yaklaşık zamanı yazın.'
  },
  {
    id: 'messaging',
    title: 'Mesajlaşma ve canlı sesli odalar',
    description: 'Özel mesajlar, medya, oda katılımı veya mikrofon sorunları.',
    checklist: [
      'Mesaj iletilmiyor veya okunma durumu güncellenmiyor mu?',
      'Canlı odaya katılamıyor veya ses gelmiyor mu?',
      'Bir kullanıcıyı engellemek veya şikâyet etmek mi istiyorsunuz?'
    ],
    contactHint: 'Oda veya sohbet bilgisini ve cihaz mikrofon izninin açık olup olmadığını belirtin.'
  },
  {
    id: 'account',
    title: 'Hesap, giriş ve silme',
    description: 'Kayıt, giriş, şifre, kimlik sağlayıcı veya hesap silme.',
    checklist: [
      'Doğrulama kodu veya e-posta gelmiyor mu?',
      'Apple veya Google ile girişte sorun mu var?',
      'Hesabınızı silmek mi istiyorsunuz?'
    ],
    contactHint: 'Kayıtlı e-postanızı yazın. Şifrenizi paylaşmayın. Silme için konu: SAFDAŞ Hesap Silme Talebi.'
  },
  {
    id: 'safety',
    title: 'Güvenlik, çocuk koruma ve gizlilik',
    description: 'Şikâyet, engelleme, KVKK hakları veya çocuk güvenliği bildirimleri.',
    checklist: [
      'Uygunsuz içerik veya hesap mı bildirmek istiyorsunuz?',
      'Çocuk güvenliğini ilgilendiren bir olay mı var?',
      'Veri erişimi, düzeltme veya silme talebiniz mi var?'
    ],
    contactHint: 'Çocuk güvenliği için konu: SAFDAŞ – Çocuk Güvenliği Bildirimi. İstismar materyalini e-postaya eklemeyin.'
  }
]

export function SafdasAppSupport() {
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>(categories[0])
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="SAFDAŞ Destek | LitxTech"
        description="SAFDAŞ namaz vakitleri ve topluluk uygulaması için destek, hesap ve güvenlik talepleri."
        path="/safdas/destek"
      />
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">SAFDAŞ · LitxTech</p>
          <h1 className="text-3xl font-bold">Destek</h1>
          <p className="text-gray-600">
            Önce uygulama içi Destek bölümünü kullanmanızı öneririz. Web üzerinden konu seçip formu hazırlayabilir veya doğrudan e-posta
            gönderebilirsiniz. Geliştirici: LITXTECH LLC · Uygulama kimliği: com.litxtech.namazim.
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
                  ? 'border-emerald-600 bg-emerald-50 shadow-lg'
                  : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
              }`}
            >
              <h2 className="mb-2 text-lg font-semibold">{category.title}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>

        <section className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <div>
            <p className="text-sm font-semibold uppercase text-emerald-700">Seçilen konu</p>
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
            <a href="mailto:support@litxtech.com?subject=SAFDA%C5%9E%20Destek" className="font-semibold text-emerald-700 underline">
              support@litxtech.com
            </a>{' '}
            — konu satırına <span className="font-mono text-sm">SAFDAŞ Destek</span> yazmanız yanıt süresini kısaltır.
          </p>
        </section>

        {isFormOpen && (
          <section className="space-y-4 rounded-2xl border-2 bg-white p-6 shadow-lg" style={{ borderColor: accent }}>
            <h4 className="flex items-center gap-2 text-xl font-semibold">
              <MessageSquare className="h-5 w-5 text-emerald-700" />
              Destek formu
            </h4>
            <p className="text-sm text-gray-600">
              Konu: <span className="font-semibold text-emerald-700">{selectedCategory.title}</span>
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Ad Soyad</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Örn. Ayşe Yılmaz"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">E-posta</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="hesabiniz@email.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">SAFDAŞ kullanıcı adı</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Uygulamadaki kullanıcı adınız"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Açıklama</label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  placeholder="Cihaz (iOS/Android ve sürüm), şehir, adımlar ve varsa hata mesajı."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:support@litxtech.com?subject=${encodeURIComponent(`SAFDAŞ Destek — ${selectedCategory.title}`)}`}
                  className="rounded-xl px-5 py-2.5 font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: accent }}
                >
                  E-posta ile gönder
                </a>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                >
                  Kapat
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Form, e-posta uygulamanızı açar. Gönderim{' '}
                <a href="mailto:support@litxtech.com" className="text-emerald-700 underline">
                  support@litxtech.com
                </a>{' '}
                adresine yapılır. Acil çocuk güvenliği konularında konu satırına “SAFDAŞ – Çocuk Güvenliği Bildirimi” yazın. Türkiye’de acil
                fiziksel tehlike için 112’yi arayın.
              </p>
            </form>
          </section>
        )}

        <div className="flex flex-wrap justify-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <Link to="/safdas" className="font-semibold hover:underline" style={{ color: accent }}>
            ← SAFDAŞ tanıtım
          </Link>
          <Link to="/safdas/gizlilik" className="font-semibold hover:underline" style={{ color: accent }}>
            Gizlilik Politikası
          </Link>
          <Link to="/safdas/kullanim-sartlari" className="font-semibold hover:underline" style={{ color: accent }}>
            Kullanım Şartları
          </Link>
          <Link to="/safdas/hesap-silme" className="font-semibold hover:underline" style={{ color: accent }}>
            Hesap silme
          </Link>
          <Link to="/safdas/child-safety" className="font-semibold hover:underline" style={{ color: accent }}>
            Çocuk koruma
          </Link>
          <Link to="/safdas/abonelik" className="font-semibold hover:underline" style={{ color: accent }}>
            Abonelik
          </Link>
        </div>
      </div>
    </div>
  )
}
