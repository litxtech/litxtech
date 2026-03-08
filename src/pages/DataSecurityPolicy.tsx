export function DataSecurityPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-red-600 uppercase">Security Policy</p>
          <h1 className="text-3xl font-bold">
            MyTrabzon – LitxTech LLC (USA) | LitxTech LTD (UK) | Toprak Travel Tourism (TR)
            </h1>
          <p className="text-sm text-gray-500">Last Updated: November 17, 2025</p>
          <p>
            This Security Policy describes the technical and organizational measures used to protect the personal data processed through the MyTrabzon mobile application (“App”). We prioritize user safety, secure data handling, and compliance with international security standards.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Data Storage & Location</h2>
          <p>All user data—including profiles, events, messages, media, and authentication tokens—is stored on Supabase data centers located in the United States and operated by LitxTech LLC.</p>
          <p>Supabase provides secure PostgreSQL, Row Level Security (RLS), JWT-based authentication, object storage for media, and Edge Functions for server logic.</p>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Data Encryption</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>TLS/SSL encryption for all data in transit</li>
            <li>AES-based encryption at rest where applicable</li>
            <li>Passwords are hashed and salted—never stored in plain text</li>
              </ul>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Access Control</h2>
          <p>Only authorized personnel can access user data and only for technical support, moderation, security investigations, or legal requirements. Access is governed by RBAC, a secure admin console, and logged administrative actions.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Row Level Security (RLS)</h2>
          <p>Supabase RLS policies enforce that users can only view or modify their own data. Event/feed content is filtered through authenticated policies, and unauthorized requests are automatically denied.</p>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Application Security</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>OAuth 2.0 login via Google and Apple Sign-In</li>
            <li>Secure email authentication for passwordless flows</li>
            <li>Token validation and rotation</li>
            <li>Suspicious activity monitoring</li>
            <li>Automated spam detection for events and messages</li>
              </ul>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Media & Storage Safety</h2>
          <p>Uploaded media resides in private Supabase buckets with limited read/write permissions. Signed URLs and expiring access tokens are used; public buckets are never exposed.</p>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Incident Response</h2>
          <p>If a security incident occurs we investigate, contain, and notify affected users when required by law. We cooperate with authorities and apply corrective measures to prevent recurrence.</p>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Keep passwords secure and unique</li>
            <li>Do not share login credentials</li>
            <li>Report suspicious activity to the support team</li>
            <li>Avoid uploading malicious or harmful files</li>
              </ul>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Compliance</h2>
          <p>This policy aligns with UK GDPR, EU GDPR, US privacy regulations, Türkiye KVKK, and App Store/Google Play security requirements.</p>
            </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Contact</h2>
          <p>For security inquiries email <a href="mailto:security@litxtech.com" className="text-blue-600 underline">security@litxtech.com</a> or <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a>.</p>
        </section>
      </div>
    </div>
  )
}
