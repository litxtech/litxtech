export function RefundPolicy() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
        <header className="space-y-2 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-red-600 uppercase">Refund & Payment Policy</p>
          <h1 className="text-3xl font-bold">MyTrabzon – LitxTech LLC (USA) | LitxTech LTD (UK)</h1>
          <p className="text-sm text-gray-500">Last Updated: November 17, 2025</p>
          <p>This policy explains how payments, purchases, subscriptions, and refunds work inside the MyTrabzon mobile application (“App”).</p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Payment Processing</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Web payments are processed through Stripe.</li>
            <li>In-app purchases are handled by Apple (if enabled).</li>
            <li>We do not store full credit card details on our servers.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Subscriptions & Renewals</h2>
          <p>Subscriptions renew automatically unless canceled. Billing occurs through the Apple App Store for in-app purchases. You can cancel anytime via Apple ID → Subscriptions. We cannot directly manage App Store billing.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Refund Eligibility</h2>
          <p>Refunds are considered only for:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Duplicate payments</li>
            <li>Accidental purchases</li>
            <li>Verified technical issues that prevent service usage</li>
            <li>Situations required by law</li>
          </ul>
          <p>Apple in-app refunds must be requested via Apple Support. Stripe payment refund requests should be emailed to <a href="mailto:billing@litxtech.com" className="text-blue-600 underline">billing@litxtech.com</a> with proof of payment.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Non-Refundable Situations</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Services already delivered</li>
            <li>Used subscription periods</li>
            <li>Accounts suspended for policy violations</li>
            <li>Change-of-mind requests</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Chargebacks & Fraud Prevention</h2>
          <p>We may suspend accounts involved in fraudulent transactions, unauthorized payments, or chargeback abuse.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Service Availability</h2>
          <p>We do not guarantee uninterrupted service. Temporary outages or maintenance windows do not qualify for refunds.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Contact</h2>
          <p>For billing inquiries email <a href="mailto:billing@litxtech.com" className="text-blue-600 underline">billing@litxtech.com</a> or <a href="mailto:support@litxtech.com" className="text-blue-600 underline">support@litxtech.com</a>.</p>
        </section>
      </div>
    </div>
  )
}

