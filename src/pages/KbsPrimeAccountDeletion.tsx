import { Shield, Mail, Smartphone, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

const accent = '#0d9488'

export function KbsPrimeAccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: accent }}>MYKBS / KBS Prime Help</p>
          <h1 className="text-4xl font-bold">Delete your MYKBS account</h1>
          <p className="text-lg text-gray-600">
            This guide explains how to permanently remove your MYKBS (KBS Prime) account, what happens to your data, and how to contact support if you no longer have access to the app.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">Delete directly from the app</h2>
          </div>
          <ol className="list-decimal space-y-3 pl-6 text-gray-700">
            <li>Open MYKBS on your device (iOS or Android).</li>
            <li>Go to <strong>Settings → Account → Delete my account</strong> (or equivalent menu).</li>
            <li>Confirm the warning and authenticate if prompted.</li>
            <li>Your account will be scheduled for deletion and you will receive confirmation.</li>
          </ol>
          <p className="text-sm text-gray-500">
            If you signed in with a business or email account, use the same credentials when confirming the deletion request.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">Request deletion via email</h2>
          </div>
          <p className="text-gray-600">
            If you no longer have the app installed or cannot log in, email us from the address linked to your MYKBS account:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>To: <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a></li>
            <li>Subject: <strong>“MYKBS Account Deletion”</strong> or <strong>“KBS Prime Account Deletion”</strong></li>
            <li>Include: your business or account name, and the reason you are requesting deletion (optional).</li>
          </ul>
          <p className="text-sm text-gray-500">
            For security, we may ask for additional verification before processing the request.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">What is deleted?</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Account and profile information</li>
              <li>Business and branch records linked to your account</li>
              <li>Guest registration data you entered (subject to legal retention where required)</li>
              <li>Settings and preferences</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">What may be retained temporarily?</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Data required for legal or regulatory compliance (e.g. hospitality reporting)</li>
              <li>Security and audit logs (for a limited period)</li>
              <li>Backups (purged in line with our retention policy)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">Timeline & confirmation</h2>
          </div>
          <p className="text-gray-700">
            Deletions triggered in the app are normally processed within a short time. Email requests are handled within 30 days after we confirm your identity. Once removal is complete, we send a confirmation email. The process cannot be undone.
          </p>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8" style={{ color: accent }} />
            <h2 className="text-2xl font-semibold">Need help?</h2>
          </div>
          <p className="text-gray-700 mt-2">
            MYKBS is operated by LITXTECH LLC. If you have questions about privacy or need to open a support ticket, use the links below.
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>Support: <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a></p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link to="/kbs-prime-privacy" className="text-blue-600 underline">Privacy Policy</Link>
            <Link to="/kbs-prime-terms" className="text-blue-600 underline">Terms</Link>
            <Link to="/support/kbs-prime" className="text-blue-600 underline">Support</Link>
            <Link to="/kbs-prime" className="text-blue-600 underline">KBS Prime</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
