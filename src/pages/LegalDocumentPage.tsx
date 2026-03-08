export function LegalDocumentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Legal Documents</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
              <p className="text-gray-700 mb-4">
                By using our service, you agree to be bound by these terms and conditions.
              </p>
              <p className="text-gray-700">
                Last updated: January 1, 2024
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                We respect your privacy and are committed to protecting your personal data.
              </p>
              <p className="text-gray-700">
                This policy explains how we collect, use, and protect your information.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
              <p className="text-gray-700 mb-4">
                We use cookies to enhance your experience on our website.
              </p>
              <p className="text-gray-700">
                You can control cookie settings through your browser preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
