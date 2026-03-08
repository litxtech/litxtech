export function ChildSafetyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-red-600 uppercase">Child Safety Policy</p>
          <h1 className="text-3xl font-bold">
            MyTrabzon – LitxTech LLC (USA) | LitxTech LTD (UK) | Toprak Travel Tourism (TR)
          </h1>
          <p className="text-sm text-gray-500">Last Updated: November 17, 2025</p>
          <p>
            This policy explains how we protect minors who may interact with or attempt to access the MyTrabzon mobile application (“App”). Our approach complies with COPPA (USA), UK GDPR rules for children, EU GDPR digital consent requirements, and Türkiye’s KVKK obligations.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Minimum Age Requirement</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>The App is not intended for children under 13 years of age.</li>
            <li>Users must be 13+ to create an account; certain EU/UK regions may require 16+.</li>
            <li>We do not knowingly collect data from users below these thresholds. Accounts identified as underage are removed.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Age Verification</h2>
          <p>Accounts are created through email + password, Google Sign-In, or Apple Sign-In, which assist with regional age compliance. Suspicious or incomplete registrations may be restricted or reviewed.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. No Data Collection From Children</h2>
          <p>We do not intentionally collect names, email addresses, profile photos, locations, messages, posts, or any other personal data from users under 13. If such data is collected without valid consent, it is deleted immediately and the account is closed.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Parental Rights</h2>
          <p>Parents or legal guardians may request deletion of a minor’s account, inquire about stored data, or notify us of unauthorized account creation by emailing <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a>. Additional information may be required to verify identity.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Prohibited Content & Protection Measures</h2>
          <p>The community feed and event system prohibit sexual content, nudity, violence, threats, bullying, hate speech, drug promotion, and any guidance that encourages dangerous behavior. Moderation tools allow us to hide or block suspicious accounts, remove harmful content, and review reports promptly.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Reporting Harmful Behavior</h2>
          <p>Users can report abusive behavior, harmful events, fake profiles, underage accounts, or dangerous content. Reports may lead to content removal, temporary suspension, permanent account bans, or escalation to authorities if required by law.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Data Storage Location</h2>
          <p>All profiles, messages, events, and media are stored in Supabase data centers located in the United States and operated by LitxTech LLC. Security controls include TLS/SSL encryption, Row Level Security, granular access control, admin review, and a 30-day deletion workflow.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. International Transfers</h2>
          <p>Data (if ever collected inadvertently) may be processed in Turkey, the United States, or the United Kingdom. All transfers follow applicable privacy laws and Standard Contractual Clauses (SCCs).</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Account & Data Deletion</h2>
          <p>Parents, guardians, or users can request account deletion, removal of personal data, and removal of user-generated content. Unless law requires otherwise, data is permanently deleted within 30 days.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Policy Updates</h2>
          <p>This policy may be updated periodically. The latest version is always available at <a href="https://litxtech.com/child-safety" className="text-blue-600 underline">https://litxtech.com/child-safety</a>, and material changes will be announced via in-app notice or email.</p>
        </section>
      </div>
    </div>
  )
}

