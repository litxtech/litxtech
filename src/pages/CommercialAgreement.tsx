import { FileText, Shield, Users, DollarSign, Clock, Globe, Phone, Mail } from 'lucide-react'

export function CommercialAgreement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Commercial Agreement</h1>
          </div>
          <p className="text-gray-300">Last Updated: August 8, 2025</p>
          <p className="text-gray-400 text-sm mt-2">LitxTech LLC's software, AI infrastructure, and web hosting platform</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8">
          
          {/* Introduction */}
          <section className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-3">Introduction</h2>
              <p className="text-blue-800">This LitxTech Commercial Agreement ("Agreement") governs the use of LitxTech LLC's software, AI infrastructure, and web hosting platform (the "Platform") designed for commercial deployment of applications, APIs, and AI services.</p>
              <p className="text-blue-700 mt-2">By registering for, accessing, or purchasing the Platform, the Customer ("Customer") agrees to these terms.</p>
            </div>
          </section>

          {/* Section A */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-4">A</span>
              Access and Accounts
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  1. Access
                </h3>
                <p className="text-green-700">Subject to this Agreement, LitxTech grants the Customer a limited, non-exclusive, non-transferable right to access and use the Platform for internal business purposes.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  2. Duration
                </h3>
                <p className="text-blue-700">Access remains active during the paid subscription term and renews automatically unless canceled in accordance with this Agreement.</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  3. Responsibilities and Acceptable Use
                </h3>
                <div className="text-purple-700 space-y-2">
                  <p className="font-semibold">Customer is responsible for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>The security and use of all user accounts and API keys.</li>
                    <li>Ensuring credentials are not shared.</li>
                    <li>Complying with LitxTech's Acceptable Use Policy.</li>
                  </ul>
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 mt-3">
                    <p className="font-semibold text-red-800">Prohibited uses include:</p>
                    <ul className="list-disc list-inside space-y-1 text-red-700 mt-1">
                      <li>Hosting malware or harmful content.</li>
                      <li>Reselling, sublicensing, or cloning the Platform.</li>
                      <li>Training third-party AI models using our API outputs.</li>
                      <li>Interfering with Platform integrity, reverse engineering, or data scraping.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section B */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg font-bold mr-4">B</span>
              Ownership and Rights
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">1. LitxTech Ownership</h3>
                <p className="text-blue-700">LitxTech retains all rights, title, and interest in and to the Platform, underlying software, and AI technologies. No ownership rights are transferred through this Agreement.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3">2. Customer Content</h3>
                <div className="text-green-700 space-y-2">
                  <p><strong>Ownership:</strong> Customer retains ownership of all code, data, and materials uploaded to or developed within the Platform.</p>
                  <p><strong>License to LitxTech:</strong> Customer grants LitxTech a limited right to process, store, and display Customer Content for the sole purpose of providing and maintaining the Services.</p>
                  <p><strong>Public Content:</strong> Any content made public through the Platform may be indexed or displayed for demonstration and analytics, subject to the MIT License where applicable.</p>
                  <div className="bg-green-100 border-l-4 border-green-400 p-3 mt-2">
                    <p className="font-semibold text-green-800">No Sale: LitxTech does not sell or monetize Customer Content.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section C */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-lg font-bold mr-4">C</span>
              AI Terms
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-3">1. Definitions</h3>
                <div className="text-purple-700 space-y-2">
                  <p><strong>AI Features:</strong> Components that generate, interpret, or assist in code, text, or automation using DeepSeek or LitxTech-trained models.</p>
                  <p><strong>Customer Content:</strong> Any data, prompts, or inputs provided by Customer.</p>
                  <p><strong>Output Content:</strong> AI-generated results returned to Customer.</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">2. Data Use</h3>
                <p className="text-blue-700">Unless explicitly authorized in writing, Customer Content and Output Content are not used to train LitxTech or partner AI models.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3">3. Ownership of Output Content</h3>
                <p className="text-green-700">Output Content is assigned to the Customer upon creation and use. The Customer is responsible for ensuring that Output Content does not infringe third-party rights.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-3">4. AI Limitation of Liability</h3>
                <p className="text-yellow-700">AI suggestions or code completions are provided "as is." LitxTech provides no warranty as to accuracy, reliability, or fitness for specific purpose.</p>
              </div>
            </div>
          </section>

          {/* Section D */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-lg font-bold mr-4">D</span>
              Confidentiality
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-3">
              <p>Both parties agree to treat non-public business, technical, or customer information as confidential.</p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-blue-800">This obligation continues for <strong>five (5) years</strong> after disclosure or until such information becomes public through no fault of the receiving party.</p>
              </div>
            </div>
          </section>

          {/* Section E */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-lg font-bold mr-4">E</span>
              Pricing, Fees, and Payment
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  1. Pricing
                </h3>
                <p className="text-green-700">Current pricing is available at <a href="https://www.litxtech.com/pricing" className="text-blue-600 hover:text-blue-800 underline">www.litxtech.com/pricing</a>.</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">2. Fees and Payment</h3>
                <div className="text-blue-700 space-y-2">
                  <p>All payments are processed via Stripe in USD.</p>
                  <p>Fees are non-refundable except where required by law or under LitxTech's Refund Policy.</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-3">3. Late Payments</h3>
                <p className="text-red-700">Overdue invoices may incur a <strong>1.5% monthly interest</strong> and service suspension after 10 days.</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-3">4. Taxes</h3>
                <p className="text-purple-700">Customer is responsible for all applicable local taxes or VAT.</p>
              </div>
            </div>
          </section>

          {/* Section F */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-lg font-bold mr-4">F</span>
              Term, Termination, and Data Migration
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-3">1. Term</h3>
                <p className="text-blue-700">This Agreement remains effective for the duration of the active subscription period.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-3">2. Cancellation</h3>
                <p className="text-green-700">Either party may cancel renewal with <strong>30 days'</strong> written notice.</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-3">3. Termination for Cause</h3>
                <p className="text-red-700">Either party may terminate immediately for material breach not cured within <strong>10 days</strong>.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-3">4. Data Migration</h3>
                <p className="text-yellow-700">Upon termination, Customer may export data for <strong>30 days</strong>. Afterward, data may be deleted permanently.</p>
              </div>
            </div>
          </section>

          {/* Section G */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-bold mr-4">G</span>
              Warranties and Disclaimers
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-3">
              <p>LitxTech provides the Platform "as is" and "as available."</p>
              <p>No warranty is made regarding uptime, merchantability, or fitness for a specific purpose.</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">LitxTech is not liable for third-party service failures (e.g., Supabase outages or Stripe downtime).</p>
              </div>
            </div>
          </section>

          {/* Section H */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-lg font-bold mr-4">H</span>
              Limitation of Liability
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-3">
              <p>LitxTech's total liability is limited to the fees paid by the Customer within the previous <strong>12 months</strong>.</p>
              <p>Neither party is liable for indirect, incidental, or consequential damages.</p>
            </div>
          </section>

          {/* Section I */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-lg font-bold mr-4">I</span>
              Support and Additional Services
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-3">
              <p>LitxTech provides:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Standard Support</h3>
                  <p className="text-green-700">Email-based assistance via <a href="mailto:support@litxtech.com" className="text-blue-600 hover:text-blue-800 underline">support@litxtech.com</a></p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Premium Support</h3>
                  <p className="text-blue-700">Optional service-level agreements for enterprise clients.</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-2">Beta Features</h3>
                  <p className="text-purple-700">Optional early-access tools provided "as is."</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section J */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-lg font-bold mr-4">J</span>
              Compliance
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-3">
              <p>Customer agrees to comply with U.S. export control laws and anti-bribery regulations.</p>
              <p>LitxTech does not operate in jurisdictions under trade embargoes.</p>
            </div>
          </section>

          {/* Section K */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-lg font-bold mr-4">K</span>
              Dispute Resolution
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-3">
              <p>This Agreement is governed by the laws of Wyoming, United States.</p>
              <p>Any disputes shall be resolved exclusively in the courts of Wyoming, USA.</p>
            </div>
          </section>

          {/* Section L */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-lg font-bold mr-4">L</span>
              Notices
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">All legal or contractual notices must be sent to:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <a href="mailto:support@litxtech.com" className="text-gray-700 hover:text-blue-600">support@litxtech.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <a href="tel:+13072715151" className="text-gray-700 hover:text-blue-600">+1 307 271 5151</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">LitxTech LLC — Wyoming, USA</span>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Sections */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-lg font-bold mr-4">M-Q</span>
              Additional Terms
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">M. Entire Agreement</h3>
                <p className="text-blue-700">This Agreement, along with the Terms of Service, Privacy Policy, and Refund Policy, constitutes the full agreement between the parties.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">N. Force Majeure</h3>
                <p className="text-green-700">Neither party will be liable for delays or failures due to events beyond reasonable control, including natural disasters, cyberattacks, or third-party service failures.</p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-semibold text-purple-800 mb-2">O. Independent Contractors</h3>
                <p className="text-purple-700">The parties are independent entities. Nothing herein creates an employment, partnership, or agency relationship.</p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">P. Publicity</h3>
                <p className="text-yellow-700">Customer grants LitxTech a limited right to list their company name and logo in promotional materials unless requested otherwise in writing.</p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Q. Modifications</h3>
                <p className="text-red-700">LitxTech may modify these terms by posting an updated version at <a href="https://www.litxtech.com/commercial-agreement" className="text-blue-600 hover:text-blue-800 underline">www.litxtech.com/commercial-agreement</a>. Continued use after updates constitutes acceptance.</p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-lg font-bold mr-4">Contact</span>
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">LitxTech LLC</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <a href="tel:+13072715151" className="text-gray-700 hover:text-blue-600">+1 307 271 5151</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-purple-600" />
                  <a href="mailto:support@litxtech.com" className="text-gray-700 hover:text-blue-600">support@litxtech.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-indigo-600" />
                  <a href="https://www.litxtech.com" className="text-gray-700 hover:text-blue-600">www.litxtech.com</a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
