import { Link } from 'react-router-dom'

export function KbsPrimePrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-red-600 uppercase">Privacy Policy</p>
          <h1 className="text-3xl font-bold">
            LITXTECH LLC – MYKBS Application
          </h1>
          <p className="text-sm text-gray-500">Last Updated: March 2026</p>
          <p>
            MYKBS is a hospitality compliance and identity verification application developed and operated by LITXTECH LLC.
            This Privacy Policy explains what information we collect, how it is used, and how it is protected.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p className="text-gray-700">
            MYKBS is a hospitality compliance and identity verification application developed and operated by LITXTECH LLC.
            The application is designed to help accommodation providers manage legally required guest identity registrations and transmit necessary information to official systems where required by law.
            LITXTECH LLC respects the privacy of users and is committed to protecting personal data in accordance with applicable laws and platform policies.
            This Privacy Policy explains what information we collect, how it is used, and how it is protected.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          <p className="text-gray-700">MYKBS may process the following categories of information:</p>
          <div>
            <h3 className="font-semibold">Identity Information</h3>
            <p className="text-gray-700 mb-2">When accommodation providers register guests as required by local regulations, the following information may be processed:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Full name</li>
              <li>National ID or passport number</li>
              <li>Date of birth</li>
              <li>Nationality</li>
              <li>Passport or ID document data (including MRZ data when scanned)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Contact Information</h3>
            <p className="text-gray-700">If provided by the accommodation provider:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Phone number</li>
              <li>Email address</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Business Information</h3>
            <p className="text-gray-700">For registered accommodation businesses:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Business name</li>
              <li>Branch information</li>
              <li>KBS registration codes or facility identifiers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Device Information</h3>
            <p className="text-gray-700 mb-2">To ensure system security and stability, limited technical data may be collected:</p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Device model</li>
              <li>Operating system version</li>
              <li>Application version</li>
              <li>Error logs</li>
            </ul>
            <p className="text-gray-700 mt-2">This information is used solely for system reliability and security.</p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. How We Use the Information</h2>
          <p className="text-gray-700">Information collected through MYKBS is used for the following purposes:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Recording guest identity information required by hospitality regulations</li>
            <li>Submitting legally required notifications to official systems when applicable</li>
            <li>Managing accommodation branch records</li>
            <li>Ensuring system security and preventing misuse</li>
            <li>Improving application stability and performance</li>
          </ul>
          <p className="font-semibold text-gray-800">LITXTECH LLC does not sell or rent personal data to third parties.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Legal Basis for Processing</h2>
          <p className="text-gray-700">
            Personal data processed within MYKBS may be required to comply with local hospitality and identity reporting regulations applicable to accommodation providers.
            The application functions as a technical platform that enables businesses to fulfill their legal reporting obligations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Data Storage and Security</h2>
          <p className="text-gray-700">
            LITXTECH LLC implements industry-standard technical and organizational measures to protect data against unauthorized access, alteration, disclosure, or destruction.
            These measures include:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Encrypted communication (HTTPS)</li>
            <li>Secure infrastructure</li>
            <li>Access control systems</li>
            <li>Logging and monitoring</li>
          </ul>
          <p className="text-gray-700">Only authorized systems and services may access stored data.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Data Sharing</h2>
          <p className="text-gray-700">Personal data may be shared only in the following situations:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>With official government systems when legally required by hospitality regulations</li>
            <li>With service providers that support infrastructure, hosting, or security operations under strict confidentiality obligations</li>
          </ul>
          <p className="text-gray-700">No personal data is shared for advertising or marketing purposes.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Data Retention</h2>
          <p className="text-gray-700">
            Personal data is retained only for as long as necessary to fulfill legal obligations and operational requirements of the hospitality reporting system.
            Retention periods may vary depending on applicable legal requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. User Rights</h2>
          <p className="text-gray-700">Depending on applicable laws, individuals may have the right to:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Request access to their personal data</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion where legally permitted</li>
            <li>Request information about how their data is processed</li>
          </ul>
          <p className="text-gray-700">Requests may be submitted using the contact information below.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Children&apos;s Privacy</h2>
          <p className="text-gray-700">
            MYKBS is designed for use by registered accommodation businesses and authorized staff members.
            The application is not intended for use by children.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. Changes to This Policy</h2>
          <p className="text-gray-700">
            LITXTECH LLC may update this Privacy Policy from time to time to reflect operational or legal changes.
            Updated versions will be published within the application or associated websites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">11. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions regarding this Privacy Policy, you may contact:
          </p>
          <p className="text-gray-700">
            <strong>LITXTECH LLC</strong><br />
            Email: <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a>
          </p>
        </section>

        <div className="pt-6 border-t border-gray-200 flex gap-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">← Back to Home</Link>
          <Link to="/kbs-prime-terms" className="text-blue-600 hover:text-blue-800 font-medium">KBS Prime Terms</Link>
        </div>
      </div>
    </div>
  )
}
