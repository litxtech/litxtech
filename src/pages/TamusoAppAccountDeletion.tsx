import { Link } from 'react-router-dom'
import { Mail, Smartphone, Clock, Shield, Trash2, Database } from 'lucide-react'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

export function TamusoAppAccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Account Deletion / Hesap Silme | LitxTech"
        description="How to delete your Tamuso account (in-app or email). Data deleted, retention timeline — Google Play account deletion URL."
        path="/tamuso/hesap-silme"
      />
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Tamuso · Account Deletion</p>
          <h1 className="text-4xl font-bold">Hesabınızı silme / Delete your account</h1>
          <p className="text-lg text-gray-600">
            Bu sayfa Google Play Account Deletion ve Apple incelemesi için herkese açık bilgilendirme URL’sidir. Hesap silme ücretsizdir;
            uygulamaya giriş yapamıyorsanız e-posta ile talep edebilirsiniz.
          </p>
          <p className="rounded-lg border border-amber-100 bg-amber-50/70 p-4 font-mono text-sm text-gray-800">
            https://www.litxtech.com/tamuso/hesap-silme
          </p>
        </header>

        <section className="space-y-6 border border-gray-200 bg-zinc-50 p-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8 shrink-0 text-amber-700" />
            <h2 className="text-2xl font-semibold">1) Uygulama içinden silme (önerilen)</h2>
          </div>
          <ol className="list-decimal space-y-3 pl-6 text-gray-700">
            <li>Tamuso uygulamasını açın ve hesabınıza giriş yapın.</li>
            <li>
              <strong>Ayarlar → Hesap → Hesabımı sil</strong> (Settings → Account → Delete account) yolunu izleyin.
            </li>
            <li>Uyarıları okuyun, onaylayın. Gerekirse e-posta / oturum doğrulaması yapın.</li>
          </ol>
          <p className="text-sm text-gray-500">Menü etiketleri sürüme göre değişebilir; güncel yol uygulama içinde gösterilir.</p>
        </section>

        <section className="space-y-6 border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 shrink-0 text-amber-700" />
            <h2 className="text-2xl font-semibold">2) E-posta ile talep (uygulamaya erişilemiyorsa)</h2>
          </div>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              To:{' '}
              <a href="mailto:support@litxtech.com?subject=Tamuso%20Account%20Deletion" className="text-amber-700 underline">
                support@litxtech.com
              </a>
            </li>
            <li>
              Subject: <strong>Tamuso Account Deletion</strong> / <strong>Tamuso Hesap Silme</strong>
            </li>
            <li>Body: registered email, username (if any), short request</li>
          </ul>
          <p className="text-sm text-gray-500">We may ask for extra verification before processing.</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Trash2 className="h-6 w-6 text-amber-700" />
              <h3 className="text-xl font-semibold">Silinen veriler</h3>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              <li>Profil ve hesap kimlik bilgileri</li>
              <li>Profil fotoğrafı / biyografi</li>
              <li>Uygulama içi tercihler ve oturum verileri</li>
              <li>Oda katılım geçmişi (işletme kayıtları hariç)</li>
            </ul>
          </div>
          <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-amber-700" />
              <h3 className="text-xl font-semibold">Saklanabilecekler</h3>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              <li>Yasal zorunluluk kayıtları</li>
              <li>Güvenlik / dolandırıcılık inceleme kayıtları</li>
              <li>Muhasebe / mağaza işlem kayıtları (varsa)</li>
              <li>Anonimleştirilmiş analitik</li>
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-amber-700" />
              <h3 className="text-xl font-semibold">Süre / Timeline</h3>
            </div>
            <p className="text-gray-700">
              Uygulama içi silme genellikle hemen başlar. Verilerin sistemlerden kaldırılması veya anonimleştirilmesi hedefi:{' '}
              <strong>30 gün</strong> içinde (yedekler ve yasal saklama hariç). E-posta talepleri doğrulama sonrası işlenir.
            </p>
          </div>
          <div className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-amber-700" />
              <h3 className="text-xl font-semibold">Ücret</h3>
            </div>
            <p className="text-gray-700">
              Hesap ve veri silme talebi için ek ücret alınmaz. Mağaza abonelik iptali ayrıca App Store / Google Play abonelik ayarlarından
              yapılmalıdır.
            </p>
          </div>
        </section>

        <section className="flex items-start gap-3 border border-amber-100 bg-amber-50/80 p-5">
          <Shield className="mt-0.5 h-6 w-6 shrink-0 text-amber-700" />
          <p className="text-sm text-gray-700">
            Privacy details:{' '}
            <Link to="/tamuso/gizlilik" className="font-semibold text-amber-700 underline">
              Privacy Policy
            </Link>
            . Child safety:{' '}
            <Link to="/tamuso/child-safety" className="font-semibold text-amber-700 underline">
              Child Safety Standards
            </Link>
            .
          </p>
        </section>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-8">
          <Link to="/tamuso" className="font-medium hover:underline" style={{ color: accent }}>
            ← Tamuso
          </Link>
          <Link to="/tamuso/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Support
          </Link>
          <Link to="/tamuso/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Privacy
          </Link>
          <Link to="/tamuso/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Terms
          </Link>
        </nav>
      </div>
    </div>
  )
}
