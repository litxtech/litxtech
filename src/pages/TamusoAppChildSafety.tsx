import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

export function TamusoAppChildSafety() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Çocuk Koruma Politikası | LitxTech"
        description="Tamuso çocuk koruma politikası: sıfır tolerans, yaş sınırı, sesli oda güvenliği, denetim ve yaptırımlar."
        path="/tamuso/child-safety"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Child Safety / Çocuk Koruma</p>
          <h1 className="text-3xl font-bold">Tamuso — Çocuk Koruma Politikası</h1>
          <p className="text-sm text-gray-500">Last updated: September 15, 2026</p>
          <p className="text-gray-700">
            Tamuso is a live voice-room platform for adults. We prioritize user safety, privacy, and legal compliance. By using Tamuso, you
            accept the rules below. This page is published for App Store / Google Play child safety standards transparency.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Age Restriction</h2>
          <p className="text-gray-700">
            Tamuso is only for users aged 18 and over. Accounts found to belong to minors are permanently closed. Users must provide accurate
            information at registration.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. Zero Tolerance</h2>
          <p className="text-gray-700">Tamuso has zero tolerance for:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Child sexual exploitation and abuse (CSEA), including CSAM</li>
            <li>Grooming or attempts to contact minors</li>
            <li>Sexual content involving minors or depicting minors</li>
            <li>Harassment, threats, bullying, or hate speech targeting children</li>
            <li>Requesting photos, videos, or personal data from minors</li>
            <li>Impersonation or fake accounts used to target children</li>
          </ul>
          <p className="font-medium text-gray-800">
            Confirmed violations result in immediate permanent ban and may be reported to law enforcement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Voice Rooms &amp; UGC</h2>
          <p className="text-gray-700">
            Live voice rooms are user-generated. We use automated and human moderation where appropriate. Room hosts may mute or remove
            participants. Platform staff may close rooms and suspend accounts to protect safety.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Reporting &amp; Blocking</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Users can report abusive content or behavior in-app.</li>
            <li>Reports are reviewed as quickly as possible; priority for child-safety reports.</li>
            <li>Users can block other users to cut off contact.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. Enforcement</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Content / room removal</li>
            <li>Temporary restriction</li>
            <li>Permanent account ban</li>
            <li>Device / IP based blocks where needed</li>
            <li>Referral to competent authorities</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Contact</h2>
          <p className="text-gray-700">
            Child-safety and abuse reports:{' '}
            <a href="mailto:support@litxtech.com?subject=Tamuso%20Child%20Safety" className="font-medium text-amber-700 underline">
              support@litxtech.com
            </a>{' '}
            — subject line: <strong>Tamuso Child Safety</strong>
          </p>
        </section>

        <section className="border border-amber-200 bg-amber-50/80 p-5 text-gray-700">
          <p>
            Tamuso reserves the right to take all measures necessary to protect children and platform integrity, including cooperating with
            authorities when legally required.
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Tamuso</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/tamuso" className="font-medium hover:underline" style={{ color: accent }}>
            ← Tamuso
          </Link>
          <Link to="/tamuso/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Gizlilik (TR)
          </Link>
          <Link to="/tamuso/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Şartlar (TR)
          </Link>
          <Link to="/tamuso/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Destek
          </Link>
        </nav>
      </div>
    </div>
  )
}
