import { Shield, Mail, Smartphone, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export function MyTrabzonAccountDeletion() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="mx-auto max-w-4xl px-6 py-16 space-y-12">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914]">MyTrabzon Help Center</p>
          <h1 className="text-4xl font-bold">Delete your MyTrabzon account</h1>
          <p className="text-lg text-gray-600">
            This guide explains every method to permanently remove your MyTrabzon profile, what happens to your data, and how to
            reach the support team if you no longer have access to the app.
          </p>
        </header>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Smartphone className="h-8 w-8 text-[#E50914]" />
            <h2 className="text-2xl font-semibold">Delete directly from the app</h2>
          </div>
          <ol className="list-decimal space-y-3 pl-6 text-gray-700">
            <li>Open MyTrabzon on iOS.</li>
            <li>Go to <strong>Profile → Settings → Delete My Account</strong>.</li>
            <li>Confirm the warning dialog and authenticate with your sign-in provider (email, Google, or Apple).</li>
            <li>Your account is immediately scheduled for deletion and you receive an in-app confirmation.</li>
          </ol>
          <p className="text-sm text-gray-500">
            If you signed in with Google or Apple, use the same provider when confirming the deletion request.
          </p>
        </section>

        <section className="space-y-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Mail className="h-8 w-8 text-[#E50914]" />
            <h2 className="text-2xl font-semibold">Request deletion via email</h2>
          </div>
          <p className="text-gray-600">
            If you no longer have the app installed or cannot log in, email us from the address linked to your MyTrabzon account:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>To: <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a></li>
            <li>Subject: <strong>“MyTrabzon Account Deletion”</strong></li>
            <li>Include: your display name, registered district, and the reason you are requesting deletion (optional).</li>
          </ul>
          <p className="text-sm text-gray-500">
            For security, our team may ask for additional verification or a confirmation reply before processing the request.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">What is deleted immediately?</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Profile information (name, bio, avatar, district)</li>
              <li>Posts, media, comments, likes</li>
              <li>Events you created (“Olay Var!”) and related media</li>
              <li>Private settings, bookmarks, and preferences</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold">What may be retained temporarily?</h3>
            <ul className="list-disc space-y-2 pl-6 text-gray-700">
              <li>Payment or donation records required for financial compliance (up to 365 days)</li>
              <li>Security logs used to detect fraud or abuse (up to 90 days)</li>
              <li>Backup archives hosted on Supabase (purged automatically within 30 days)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-[#E50914]" />
            <h2 className="text-2xl font-semibold">Timeline & confirmation</h2>
          </div>
          <p className="text-gray-700">
            Account deletions triggered in the app are normally finalized within 15 minutes. Email requests are handled within 30 days after we confirm your identity. Once
            removal is complete, we send a confirmation email. The process cannot be undone.
          </p>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#E50914]" />
            <h2 className="text-2xl font-semibold">Need help?</h2>
          </div>
          <p className="text-gray-700">
            MyTrabzon is operated by Toprak Travel Tourism (TR), LitxTech LLC (USA), and LitxTech LTD (UK). All personal data is stored on Supabase data centers in the United States with TLS encryption and Row Level Security. If you have questions about privacy or need to
            reverse a mistaken request before it is processed, contact our security desk.
          </p>
          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>Email: <a href="mailto:security@litxtech.com" className="text-blue-600 underline">security@litxtech.com</a></p>
            <p>Support: <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a></p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
            <Link to="/privacy-policy" className="text-blue-600 underline">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-blue-600 underline">Terms of Service</Link>
            <Link to="/community-policy" className="text-blue-600 underline">Community Policy</Link>
          </div>
        </section>
      </div>
    </div>
  )
}

