export function CommunityPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-red-600 uppercase">Community Policy</p>
          <h1 className="text-3xl font-bold">
            MyTrabzon – LitxTech LLC (USA) | LitxTech LTD (UK) | Toprak Travel Tourism (TR)
          </h1>
          <p className="text-sm text-gray-500">Last Updated: November 17, 2025</p>
          <p>
            This Community Policy describes the rules all users must follow when using the MyTrabzon mobile application (“App”). Our goal is to maintain a safe, respectful, and enjoyable environment for everyone. By using the App, you agree to comply with this policy.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Respectful Behavior Is Mandatory</h2>
          <p>Users must interact with each other respectfully, honestly, and without aggression. Harassment, insults, or malicious conduct are not tolerated.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Prohibited Conduct</h2>
          <div>
            <h3 className="font-semibold">A. Hate and Discrimination</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Racism, religious or linguistic discrimination</li>
              <li>Sexism, homophobia, or hate symbols/content</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">B. Harassment and Bullying</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Profanity, insults, threats</li>
              <li>Defamation, blackmail, manipulation, personal attacks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">C. Sexual and Adult Content</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Pornographic media, sexual messages, nudity</li>
              <li>Content targeting or exploiting minors</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">D. Violence</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Threats of physical harm</li>
              <li>Graphic violence or gore</li>
              <li>Weapon, explosive, or dangerous substance promotion</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">E. Fraud and Abuse</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Fake profiles, impersonation, misleading events</li>
              <li>Spam messaging, link spam, or platform manipulation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">F. Copyright Infringement</h3>
            <p>Do not share third-party photos, videos, logos, or characters without proper authorization.</p>
          </div>
          <div>
            <h3 className="font-semibold">G. Illegal Content</h3>
            <p>Posts involving drugs, gambling, criminal activity, or scams are strictly forbidden.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. User-Generated Content Responsibility</h2>
          <p>Photos, posts, comments, event descriptions, and profile data are the responsibility of the user who creates them. Content that violates this policy may be removed and the associated account may be restricted.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Profile Rules</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Profile photos must be clear, appropriate, and non-deceptive.</li>
            <li>Fake identities, misleading names, or fraudulent bios are prohibited.</li>
            <li>Private Mode hides you from public feeds but remains visible to admins for safety review.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Event (“Olay Var”) Rules</h2>
          <p>Events must include accurate locations, appropriate categories, lawful content, and non-spam descriptions. Dangerous, misleading, or harmful events will be removed.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Moderation & Enforcement</h2>
          <p>LitxTech may remove content, temporarily suspend accounts, restrict messaging, permanently ban accounts, or notify authorities when required. Admins can grant or revoke verification badges, review hidden users, and remove spam content.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Reporting System</h2>
          <p>Users can report harassment, hate speech, spam, dangerous events, fake profiles, sexual content, or fraud. The security team reviews each report and applies the necessary action.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Security & Data Protection</h2>
          <p>All user data is stored in Supabase (USA) with TLS/SSL encryption, Row Level Security, and strict access controls. Account deletion requests are honored within 30 days. The App is closed to users under 13.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Legal Responsibilities</h2>
          <p>This policy operates under Turkish law (community and tourism services), LitxTech LLC’s obligations in the United States, and LitxTech LTD’s GDPR compliance requirements in the United Kingdom.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Updates</h2>
          <p>This policy may be updated periodically. The most current version is always available at <a href="https://litxtech.com/community" className="text-blue-600 underline">https://litxtech.com/community</a>.</p>
        </section>
      </div>
    </div>
  )
}

