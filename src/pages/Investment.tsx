export function Investment() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Investment</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Investment Opportunities</h2>
            <p className="text-gray-700 mb-6">
              Join LitxTech in revolutionizing the technology landscape. 
              We're seeking strategic partners and investors for our next growth phase.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Why Invest?</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Growing market demand for web development tools</li>
                <li>• Experienced team with proven track record</li>
                <li>• Scalable technology platform</li>
                <li>• Strong user base and community</li>
                <li>• Multiple revenue streams</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Investment Tiers</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Seed Round</h4>
                  <p className="text-gray-600">$500K - $2M</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Series A</h4>
                  <p className="text-gray-600">$2M - $10M</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold">Strategic</h4>
                  <p className="text-gray-600">Custom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
