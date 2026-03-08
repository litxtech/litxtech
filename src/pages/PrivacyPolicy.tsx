export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-red-600 uppercase">Privacy Policy</p>
          <h1 className="text-3xl font-bold">
            MyTrabzon – LitxTech LLC (USA) | LitxTech LTD (UK) | Toprak Travel Tourism (TR)
          </h1>
          <p className="text-sm text-gray-500">Last Updated: November 17, 2025</p>
          <p>
            This Privacy Policy explains how MyTrabzon collects, uses, stores, and protects personal data across the mobile application and every LitxTech-operated
            digital service. By using the App, you agree to this policy.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Data We Collect</h2>
          <div>
            <h3 className="font-semibold">A. Information you provide</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Name, surname, and email address</li>
              <li>Profile photo, biography, district/city preference</li>
              <li>Posts, photos, videos, comments</li>
              <li>Events you create or join</li>
              <li>Support requests and feedback messages</li>
              <li>AI prompts you submit (optional features)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">B. Information collected automatically</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Device model, OS version, IP address</li>
              <li>Usage analytics (taps, screens, session length)</li>
              <li>Expo push notification tokens</li>
              <li>Crash and performance logs</li>
              <li>OAuth session metadata (Google / Apple sign-in)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">C. Third-party data</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Google / Apple profile basics (if you authorize them)</li>
              <li>Stripe payment confirmations (never full card numbers)</li>
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Data Storage & Location</h2>
          <p>
            All user data is hosted on Supabase infrastructure located in the United States and operated by LitxTech LLC. Supabase provides secure PostgreSQL, Row Level Security, JWT authentication, object
            storage for media, and Edge Functions for custom logic.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. How We Use Data</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Authenticate users and manage profiles</li>
            <li>Power the community feed, events, and notifications</li>
            <li>Prevent spam, fake accounts, and policy abuse</li>
            <li>Improve performance, stability, and analytics</li>
            <li>Generate optional AI responses and features</li>
            <li>Comply with legal requirements and enforce terms</li>
          </ul>
          <p className="font-semibold text-gray-800">We do not sell personal data for advertising.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Data Sharing</h2>
          <div>
            <h3 className="font-semibold">Service Providers</h3>
            <p className="text-gray-700">
              Supabase (database, auth, storage), Vercel (hosting), Expo/EAS (push delivery), Stripe (payments), and optional AI vendors process data on our behalf.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Group companies</h3>
            <p className="text-gray-700">LitxTech LLC (USA), LitxTech LTD (UK), and Toprak Travel Tourism (Turkey) jointly operate the platform.</p>
          </div>
          <div>
            <h3 className="font-semibold">Legal obligations</h3>
            <p className="text-gray-700">We may disclose data when required by law, court order, or government request.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Retention</h2>
          <p>
            User accounts can be deleted any time from the profile settings. Once deleted, personal data is erased or anonymized within 30 days unless a longer retention window is required for tax,
            fraud-prevention, or regulatory reasons.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Security</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>TLS/SSL encryption for all traffic</li>
            <li>Supabase Row Level Security isolates user data</li>
            <li>Hashed + salted passwords, RBAC-based admin access</li>
            <li>Moderation dashboards, spam filters, verification badges</li>
          </ul>
          <p className="text-gray-700">No system is 100% secure, so users should protect their passwords and devices.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Your Rights (GDPR, UK GDPR, KVKK)</h2>
          <p>You may request access, deletion, correction, portability, objection to processing, or withdrawal of consent.</p>
          <p>
            Contact <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a>. We may ask for additional verification.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Children’s Privacy</h2>
          <p>MyTrabzon is not intended for users under 13. If we learn that a child’s data was collected, we delete it and disable the account.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. International Transfers</h2>
          <p>Data may be processed in Turkey, the United States, and the United Kingdom. All transfers rely on Standard Contractual Clauses or equivalent safeguards.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Updates</h2>
          <p>
            This policy may be updated periodically. The latest version is always published at{' '}
            <a href="https://litxtech.com/privacy" className="text-blue-600 underline">https://litxtech.com/privacy</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">11. Contact</h2>
          <p>For questions about privacy or data rights write to <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a>.</p>
        </section>
      </div>
    </div>
  )
}

