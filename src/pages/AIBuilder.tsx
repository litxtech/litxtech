export function AIBuilder() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">AI Builder</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">LitxTech AI Builder</h2>
            <p className="text-gray-700 mb-6">
              Create powerful applications using our advanced AI-powered builder. 
              Simply describe your vision and watch our AI bring it to life.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your application
              </label>
              <textarea 
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="I want to build a todo app with user authentication and real-time updates..."
              />
            </div>
            <div className="flex gap-4">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Generate Code
              </button>
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
                Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
