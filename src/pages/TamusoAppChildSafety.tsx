import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#d97706'

/**
 * Apple App Store "Child Safety Standards" URL field + Google Play CSAE / UGC expectations.
 * Primary language: English (store review). Short TR summary at the end.
 */
export function TamusoAppChildSafety() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'Sora, system-ui, sans-serif' }}>
      <SeoHead
        title="Tamuso Child Safety Standards Policy | LitxTech"
        description="Tamuso Child Safety Standards: zero tolerance for CSAE/CSAM, 18+, reporting, blocking, moderation, law enforcement cooperation."
        path="/tamuso/child-safety"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">Child Safety Standards</p>
          <h1 className="text-3xl font-bold">Tamuso — Child Safety Standards Policy</h1>
          <p className="text-sm text-gray-500">Last updated: September 15, 2026</p>
          <p className="text-gray-700">
            This page is the public Child Safety Standards / CSAE policy for <strong>Tamuso</strong>, a live voice-room app operated by{' '}
            <strong>LitxTech LLC</strong>. It is intended for Apple App Store and Google Play review and for users seeking transparency about
            how we prevent and respond to child sexual exploitation and abuse.
          </p>
          <p className="rounded-lg border border-amber-100 bg-amber-50/70 p-4 text-sm text-gray-800">
            Store URL (permanent): <span className="font-mono">https://www.litxtech.com/tamuso/child-safety</span>
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Scope of the Service</h2>
          <p className="text-gray-700">
            Tamuso allows adults to create and join live voice rooms (user-generated content). We do not offer a product directed at children.
            Users are responsible for their own speech and behavior in rooms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. Age Requirement (18+)</h2>
          <p className="text-gray-700">
            Tamuso is <strong>only for users 18 years of age or older</strong>. We do not knowingly collect personal data from minors. Accounts
            reasonably believed to belong to minors are permanently closed and related data is deleted or anonymized. False age declarations
            are grounds for immediate ban.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Zero Tolerance for CSAE / CSAM</h2>
          <p className="text-gray-700">Tamuso has <strong>zero tolerance</strong> for child sexual exploitation and abuse, including but not limited to:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Child sexual abuse material (CSAM) in any form</li>
            <li>Grooming or attempting to solicit minors</li>
            <li>Sexual content involving or depicting minors (including fictional / AI-generated depictions)</li>
            <li>Requesting images, videos, or personal information from minors</li>
            <li>Using Tamuso to arrange contact with minors for sexual purposes</li>
            <li>Impersonation or fake accounts used to target children</li>
          </ul>
          <p className="font-medium text-gray-900">
            Confirmed violations result in immediate permanent ban. We may preserve evidence as required by law and report to competent
            authorities / hotlines (including where applicable NCMEC or equivalent).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Standards of Conduct</h2>
          <p className="text-gray-700">In addition to CSAE rules, the following are prohibited and may lead to removal or ban:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Harassment, threats, bullying, hate speech</li>
            <li>Non-consensual sexual content or unwanted sexual advances in rooms</li>
            <li>Spam, scams, phishing, or sharing malicious links</li>
            <li>Doxxing or sharing others’ personal data without consent</li>
            <li>Illegal activity or encouragement of illegal activity</li>
          </ul>
          <p className="text-gray-700">
            Full community rules: <Link to="/tamuso/kullanim-sartlari" className="text-amber-700 underline">Terms of Use</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. How to Report</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>
              <strong>In-app Report:</strong> Use the Report control on a user, room, or content (where available) and select the appropriate
              reason. Child-safety reports are prioritized.
            </li>
            <li>
              <strong>In-app Block:</strong> Users can block others to stop further contact / interaction.
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@litxtech.com?subject=Tamuso%20Child%20Safety" className="font-medium text-amber-700 underline">
                support@litxtech.com
              </a>{' '}
              with subject <strong>Tamuso Child Safety</strong>. Include username, room name/time (if known), and description. Do not send
              illegal imagery; describe it and follow guidance from law enforcement / hotlines.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. How We Respond</h2>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>We review child-safety reports with highest priority, aiming to begin review within <strong>24 hours</strong>.</li>
            <li>We may remove content/rooms, restrict or permanently ban accounts, and apply device/IP blocks.</li>
            <li>We use a mix of automated signals and human review where appropriate.</li>
            <li>Room hosts may mute or remove participants; platform staff may override and close rooms.</li>
            <li>Where legally required or appropriate, we cooperate with law enforcement and designated reporting channels.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Legal Compliance</h2>
          <p className="text-gray-700">
            LitxTech LLC complies with applicable laws regarding child protection, CSAM, and mandatory reporting obligations in jurisdictions
            where we operate. We may disclose information to authorities when required by law or to protect the safety of a child.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Contact for Child Safety Concerns</h2>
          <p className="text-gray-700">
            LitxTech LLC — Tamuso Child Safety
            <br />
            Email:{' '}
            <a href="mailto:support@litxtech.com?subject=Tamuso%20Child%20Safety" className="font-medium text-amber-700 underline">
              support@litxtech.com
            </a>
            <br />
            Support page:{' '}
            <Link to="/tamuso/destek" className="font-medium text-amber-700 underline">
              https://www.litxtech.com/tamuso/destek
            </Link>
          </p>
        </section>

        <section className="border border-gray-200 bg-zinc-50 p-5 space-y-3">
          <h2 className="text-lg font-semibold text-gray-900">Türkçe özet</h2>
          <p className="text-sm text-gray-700">
            Tamuso yalnızca 18+ kullanıcılar içindir. Çocuk istismarı, CSAM ve grooming’e sıfır tolerans uygulanır; ihlalde hesap kalıcı
            kapatılır ve gerekirse yasal mercilere bildirim yapılır. Uygulama içi Bildir / Engelle araçlarını kullanın veya{' '}
            <strong>Tamuso Child Safety</strong> konusuyla support@litxtech.com adresine yazın. Bildirimler öncelikli incelenir (hedef: 24
            saat içinde inceleme başlangıcı).
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech LLC — Tamuso</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/tamuso" className="font-medium hover:underline" style={{ color: accent }}>
            ← Tamuso
          </Link>
          <Link to="/tamuso/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Privacy
          </Link>
          <Link to="/tamuso/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Terms
          </Link>
          <Link to="/tamuso/hesap-silme" className="font-medium hover:underline" style={{ color: accent }}>
            Account Deletion
          </Link>
        </nav>
      </div>
    </div>
  )
}
