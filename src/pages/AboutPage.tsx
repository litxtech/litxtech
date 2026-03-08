export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-lg text-gray-700 mb-6">
            LitxTech is a leading technology company specializing in modern web applications, 
            AI solutions, and digital transformation services. We're committed to delivering 
            innovative solutions that drive business growth and success.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our mission is to empower businesses with cutting-edge technology solutions 
            and make digital transformation accessible to organizations of all sizes.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Technology Stack</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>React 18 with TypeScript</li>
            <li>Supabase for backend services</li>
            <li>Tailwind CSS for styling</li>
            <li>Vite for fast development</li>
            <li>React Query for data fetching</li>
            <li>AI-powered development tools</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
