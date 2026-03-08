import { Trash2, Mail, Smartphone, Clock, CreditCard, Users, Shield, Phone, Globe } from 'lucide-react'

export function AccountDeletionPolicy() {
  return (
    <div className="min-h-screen relative">
      <div className="animated-bg"></div>
      <div className="bg-overlay"></div>
      <div className="particles"></div>

      <div className="max-w-4xl mx-auto px-4 py-20 relative z-10">
        <div className="glass-card p-8 mb-8">
          <div className="text-center mb-8">
            <Trash2 className="w-16 h-16 mx-auto mb-4 text-red-400" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              MyTrabzon – Account Deletion Policy
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200">
            
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-lg font-bold mr-4">1</span>
                How to Delete Your Account
              </h2>
              <p className="mb-4">You can permanently delete your MyTrabzon account in one of the following ways:</p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Smartphone className="w-6 h-6 mr-2 text-blue-400" />
                  In the app
                </h3>
                <p className="text-gray-700 dark:text-gray-300">Go to <strong>Profile → Settings → Delete My Account</strong></p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-green-400" />
                  By email
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Send a message to <a href="mailto:support@litxtech.com" className="text-blue-600 hover:text-blue-800 underline">support@litxtech.com</a> from your registered email address with the subject line <strong>"MyTrabzon Account Deletion"</strong>
                </p>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800 dark:text-yellow-200">
                  <Shield className="w-5 h-5 inline mr-2" />
                  Your identity may be verified for security purposes before deletion is completed.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg font-bold mr-4">2</span>
                Data Deletion and Retention
              </h2>
              <p className="mb-4">When you delete your account:</p>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Deleted immediately:</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Profile details</li>
                  <li>Favorites</li>
                  <li>Preferences</li>
                  <li>App usage data</li>
                </ul>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Temporarily retained:</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Financial or transactional records that are legally required for tax or compliance purposes may be kept for up to <strong>[X days/months]</strong>.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Backups:</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Data fragments in backup systems are automatically purged within <strong>[Y days]</strong>.
                </p>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
                <p className="text-red-800 dark:text-red-200 font-semibold">
                  All data deletion processes are irreversible.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-lg font-bold mr-4">3</span>
                Processing Time
              </h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Clock className="w-6 h-6 mr-2 text-blue-400" />
                  <p className="text-gray-700 dark:text-gray-300">
                    Account deletion requests are completed within <strong>[e.g., 30 days]</strong>.
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Once completed, you'll receive a confirmation email stating that your account and personal data have been deleted from our systems.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-lg font-bold mr-4">4</span>
                Subscriptions and Payments
              </h2>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <CreditCard className="w-6 h-6 mr-2 text-yellow-400" />
                  <p className="text-gray-700 dark:text-gray-300 font-semibold">
                    Important Notice
                  </p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Deleting your account does not automatically cancel active subscriptions made through Google Play or the App Store.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Please cancel your subscriptions directly through your store account to avoid further charges.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-lg font-bold mr-4">5</span>
                Third-Party Services
              </h2>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <Users className="w-6 h-6 mr-2 text-indigo-400" />
                  <p className="text-gray-700 dark:text-gray-300">
                    If your data has been shared with integrated third-party services (e.g., payment processors, analytics providers, authentication systems), we will forward your deletion request to those parties where applicable.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-lg font-bold mr-4">6</span>
                Contact
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">For any account deletion inquiries, please contact us at:</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold text-gray-900 dark:text-white">LITXTECH LLC</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <a href="mailto:support@litxtech.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">support@litxtech.com</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700 dark:text-gray-300">Phone (US): <a href="tel:+13072715151" className="hover:text-blue-600">+1 307 271 5151</a></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-indigo-600" />
                    <span className="text-gray-700 dark:text-gray-300">Phone (UK): <a href="tel:+442039266504" className="hover:text-blue-600">020 3926 6504</a></span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-cyan-600" />
                    <a href="https://www.litxtech.com" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">www.litxtech.com</a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
