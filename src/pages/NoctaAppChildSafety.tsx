import { Link } from 'react-router-dom'
import { SeoHead } from '../components/marketing/SeoHead'

const accent = '#6366f1'

export function NoctaAppChildSafety() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SeoHead
        title="Nocta App – Child Safety Standards Policy | LitxTech"
        description="Nocta App child safety standards: zero tolerance for CSAM, reporting, enforcement, and cooperation with authorities."
        path="/nocta/child-safety"
      />
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-12">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Child Safety Standards</p>
          <h1 className="text-3xl font-bold">Nocta App – Child Safety Standards Policy</h1>
          <p className="text-sm text-gray-500">Last updated: May 2026</p>
          <p className="text-gray-700">
            Nocta App is committed to maintaining a safe, respectful, and lawful environment for all users. Protecting minors from abuse,
            exploitation, and harmful content is a core priority of our platform. We enforce strict policies, use moderation tools, and cooperate
            with relevant authorities to prevent and respond to any violations involving children.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">1. Zero-Tolerance Policy</h2>
          <p className="text-gray-700">
            Nocta App has a zero-tolerance policy for any form of child sexual abuse and exploitation. The following are strictly prohibited:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Creation, upload, sharing, or storage of child sexual abuse material (CSAM)</li>
            <li>Any sexual content involving minors</li>
            <li>Grooming behavior or attempts to establish inappropriate relationships with minors</li>
            <li>Soliciting or requesting sexual content from minors</li>
            <li>Sexualization of minors in any form</li>
            <li>Encouraging, promoting, or facilitating exploitation of minors</li>
            <li>Any activity that endangers the safety or wellbeing of a minor</li>
          </ul>
          <p className="font-medium text-gray-800">Any user found engaging in such activities will face immediate and permanent action.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">2. Detection and Prevention Measures</h2>
          <p className="text-gray-700">Nocta App actively works to prevent abuse and protect minors through:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>User reporting systems for harmful or suspicious behavior</li>
            <li>Automated and manual content moderation</li>
            <li>Account monitoring for policy violations</li>
            <li>Restricting and removing abusive or suspicious accounts</li>
            <li>Continuous improvement of safety tools and detection mechanisms</li>
          </ul>
          <p className="text-gray-700">We regularly review and enhance our systems to identify risks and prevent misuse of the platform.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">3. Reporting and Enforcement</h2>
          <p className="text-gray-700">
            Users can report inappropriate content or behavior directly within Nocta App. All reports are taken seriously and reviewed promptly.
            Depending on the severity of the violation, Nocta App may:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Remove offending content</li>
            <li>Issue warnings to users</li>
            <li>Temporarily suspend accounts</li>
            <li>Permanently ban users</li>
            <li>Restrict access to platform features</li>
          </ul>
          <p className="text-gray-700">We do not tolerate repeat violations or attempts to bypass enforcement.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">4. Cooperation with Authorities</h2>
          <p className="text-gray-700">
            Nocta App complies with applicable laws and regulations related to child protection. If we identify or are notified of content
            involving child sexual abuse or exploitation, we will:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Take immediate action to remove the content</li>
            <li>Preserve relevant information as required by law</li>
            <li>Report incidents to appropriate law enforcement or child protection agencies</li>
            <li>Fully cooperate with investigations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">5. User Responsibility</h2>
          <p className="text-gray-700">All users of Nocta App are expected to:</p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Follow community guidelines and applicable laws</li>
            <li>Avoid engaging in harmful or inappropriate behavior</li>
            <li>Respect the safety and privacy of others, especially minors</li>
            <li>Report suspicious or unsafe activity immediately</li>
          </ul>
          <p className="text-gray-700">Failure to comply with these responsibilities may result in enforcement actions.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">6. Protection of Minors</h2>
          <p className="text-gray-700">
            Nocta App is not designed to facilitate inappropriate interaction with minors. Additional safeguards may include:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-gray-700">
            <li>Monitoring for suspicious communication patterns</li>
            <li>Limiting harmful interactions</li>
            <li>Preventing the spread of unsafe content</li>
            <li>Enhancing reporting accessibility for all users</li>
          </ul>
          <p className="text-gray-700">We are committed to continuously improving protections for younger users.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">7. Contact Information</h2>
          <p className="text-gray-700">
            If you have concerns about child safety, need to report an issue, or require assistance, please contact us:
          </p>
          <p className="text-gray-700">
            Email:{' '}
            <a href="mailto:support@litxtech.com?subject=Nocta%20Child%20Safety" className="font-medium text-indigo-600 underline">
              support@litxtech.com
            </a>
          </p>
          <p className="text-gray-700">We aim to respond to all safety-related inquiries promptly and responsibly.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">8. Policy Updates</h2>
          <p className="text-gray-700">
            Nocta App may update this Child Safety Standards Policy as needed to reflect improvements, legal requirements, or platform changes.
            Users are encouraged to review this page periodically.
          </p>
        </section>

        <section className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-700">
          <p>
            Nocta App remains committed to creating a secure platform where users can connect safely, with strong protections in place to
            prevent harm, abuse, and exploitation—especially for minors.
          </p>
        </section>

        <p className="border-t border-gray-200 pt-6 text-sm text-gray-500">© {new Date().getFullYear()} LitxTech — Nocta App</p>

        <nav className="flex flex-wrap gap-4 border-t border-gray-200 pt-6">
          <Link to="/nocta" className="font-medium hover:underline" style={{ color: accent }}>
            ← Nocta overview
          </Link>
          <Link to="/nocta/gizlilik" className="font-medium hover:underline" style={{ color: accent }}>
            Privacy Policy (TR)
          </Link>
          <Link to="/nocta/kullanim-sartlari" className="font-medium hover:underline" style={{ color: accent }}>
            Terms of Use (TR)
          </Link>
          <Link to="/nocta/destek" className="font-medium hover:underline" style={{ color: accent }}>
            Support
          </Link>
        </nav>
      </div>
    </div>
  )
}
