import { Users, Server, CreditCard, Brain, BarChart3, MessageSquare, Shield, Briefcase, Database, Globe, Phone, Mail, CheckCircle } from 'lucide-react'

export function Subprocessors() {
  const subprocessors = [
    {
      id: 'infrastructure',
      title: 'Infrastructure & Cloud Hosting',
      icon: Server,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      items: [
        { name: 'Vercel Inc.', location: 'USA', service: 'Cloud hosting and deployment of web applications' },
        { name: 'Supabase, Inc.', location: 'USA', service: 'Managed PostgreSQL database, authentication, and storage' },
        { name: 'Cloudflare, Inc.', location: 'USA', service: 'CDN, DDoS protection, and network edge services' },
        { name: 'Microsoft Azure', location: 'USA', service: 'Backup infrastructure and compute capacity' },
        { name: 'AWS (Amazon Web Services)', location: 'USA', service: 'Redundant hosting and secure storage for select services' },
        { name: 'Neon Database Inc.', location: 'USA', service: 'Serverless PostgreSQL database infrastructure' }
      ]
    },
    {
      id: 'payments',
      title: 'Payments and Billing',
      icon: CreditCard,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      items: [
        { name: 'Stripe, Inc.', location: 'USA', service: 'Secure payment processing and billing' },
        { name: 'Verifi Inc. (Visa Group)', location: 'USA', service: 'Payment dispute management and verification' },
        { name: 'Orb Technologies', location: 'USA', service: 'Subscription metering and invoicing' },
        { name: 'Paddle.com', location: 'UK', service: 'VAT and EU billing compliance' }
      ]
    },
    {
      id: 'ai',
      title: 'Artificial Intelligence & Automation',
      icon: Brain,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      items: [
        { name: 'DeepSeek AI', location: 'USA', service: 'AI reasoning and code generation' },
        { name: 'OpenAI, Inc.', location: 'USA', service: 'AI text and image generation (ChatGPT, GPT-4, DALL·E)' },
        { name: 'Anthropic PBC', location: 'USA', service: 'AI model inference and safety filtering' },
        { name: 'Hugging Face, Inc.', location: 'USA', service: 'Hosting and optimization of open AI models' },
        { name: 'LangChain Inc.', location: 'USA', service: 'Workflow orchestration for AI pipelines' }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Monitoring',
      icon: BarChart3,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      items: [
        { name: 'Plausible Analytics', location: 'EU', service: 'Privacy-friendly website analytics (no cookies)' },
        { name: 'PostHog', location: 'USA', service: 'Product analytics and user interaction tracking' },
        { name: 'Sentry.io', location: 'USA', service: 'Application error tracking and crash reporting' },
        { name: 'Datadog, Inc.', location: 'USA', service: 'System monitoring and performance metrics' },
        { name: 'Google Analytics', location: 'USA', service: 'Web traffic analysis (cookie-based, anonymized IPs)' }
      ]
    },
    {
      id: 'communication',
      title: 'Communication & Customer Support',
      icon: MessageSquare,
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      items: [
        { name: 'Twilio, Inc.', location: 'USA', service: 'SMS verification and notifications' },
        { name: 'Mailgun Technologies, Inc.', location: 'USA', service: 'Transactional email delivery' },
        { name: 'Zendesk, Inc.', location: 'USA', service: 'Customer support ticketing and chat' },
        { name: 'Intercom, Inc.', location: 'USA', service: 'Customer success and in-app messaging' },
        { name: 'Zoom Video Communications, Inc.', location: 'USA', service: 'Meetings and client communication' },
        { name: 'HubSpot, Inc.', location: 'USA', service: 'CRM and email automation' }
      ]
    },
    {
      id: 'security',
      title: 'Security, Identity, and Authentication',
      icon: Shield,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      items: [
        { name: 'Stytch', location: 'USA', service: 'Authentication and identity management' },
        { name: 'Auth0 (Okta, Inc.)', location: 'USA', service: 'OAuth-based secure login for enterprise clients' },
        { name: "Let's Encrypt (ISRG)", location: 'USA', service: 'SSL/TLS certificate management' },
        { name: 'Cloudflare Access', location: 'USA', service: 'Secure admin access and zero-trust controls' }
      ]
    },
    {
      id: 'collaboration',
      title: 'Collaboration & Productivity',
      icon: Briefcase,
      color: 'text-indigo-500',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      items: [
        { name: 'Notion Labs, Inc.', location: 'USA', service: 'Internal documentation and team collaboration' },
        { name: 'Slack Technologies, LLC', location: 'USA', service: 'Team communication and support coordination' },
        { name: 'Zapier, Inc.', location: 'USA', service: 'Workflow and automation management' },
        { name: 'Google Workspace', location: 'USA', service: 'Internal email and productivity tools' },
        { name: 'Figma, Inc.', location: 'USA', service: 'UI/UX design collaboration' }
      ]
    },
    {
      id: 'compliance',
      title: 'Data Backup and Compliance',
      icon: Database,
      color: 'text-teal-500',
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-200',
      items: [
        { name: 'Acronis International GmbH', location: 'Switzerland', service: 'Encrypted backups and recovery' },
        { name: 'Vanta Inc.', location: 'USA', service: 'Security compliance monitoring' },
        { name: 'OneTrust LLC', location: 'USA', service: 'GDPR/CCPA compliance management' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Subprocessors</h1>
          </div>
          <p className="text-gray-300">Last Updated: September 2025</p>
          <p className="text-gray-400 text-sm mt-2">Third-party vendors who support the delivery, storage, and improvement of LitxTech's software, AI, and cloud infrastructure</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8">
          
          {/* Introduction */}
          <section className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-blue-900 mb-3">Introduction</h2>
              <p className="text-blue-800">This page lists the subprocessors that LitxTech LLC ("LitxTech," "we," "our") uses to process customer data in connection with our Services.</p>
              <p className="text-blue-700 mt-2">Each subprocessor is required to comply with LitxTech's security and privacy standards and applicable data protection laws (including GDPR, CCPA, and Wyoming privacy law).</p>
            </div>
          </section>

          {/* Stats */}
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Total Subprocessors</p>
                    <p className="text-2xl font-bold text-blue-900">35</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">Categories</p>
                    <p className="text-2xl font-bold text-green-900">8</p>
                  </div>
                  <Server className="h-8 w-8 text-green-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Countries</p>
                    <p className="text-2xl font-bold text-purple-900">3</p>
                  </div>
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-yellow-600 font-medium">Next Review</p>
                    <p className="text-sm font-bold text-yellow-900">Sep 2026</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-yellow-500" />
                </div>
              </div>
            </div>
          </section>

          {/* Subprocessors by Category */}
          <section className="space-y-8">
            {subprocessors.map((category) => {
              const Icon = category.icon
              return (
                <div key={category.id} className={`${category.bgColor} ${category.borderColor} border rounded-lg p-6`}>
                  <div className="flex items-center space-x-3 mb-6">
                    <Icon className={`h-8 w-8 ${category.color}`} />
                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                    <span className="bg-white text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                      {category.items.length} services
                    </span>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-white/50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white/30 divide-y divide-gray-200">
                        {category.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="hover:bg-white/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex items-center space-x-2">
                                <Globe className="h-4 w-4 text-gray-400" />
                                <span>{item.location}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                              {item.service}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
          </section>

          {/* Subprocessor Changes */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-lg font-bold mr-4">9</span>
              Subprocessor Changes
            </h2>
            <div className="prose max-w-none text-gray-700 space-y-3">
              <p>LitxTech reviews all subprocessors annually and updates this list as necessary.</p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <p className="text-yellow-800">Customers will be notified of any material changes at least <strong>30 days</strong> prior to the addition of a new subprocessor.</p>
              </div>
              <p>To receive notifications, contact: <a href="mailto:support@litxtech.com" className="text-blue-600 hover:text-blue-800 underline">support@litxtech.com</a></p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-lg font-bold mr-4">10</span>
              Contact Information
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">LitxTech LLC</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-green-600" />
                  <span className="text-gray-700">📍 Wyoming, United States</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <a href="tel:+13072715151" className="text-gray-700 hover:text-blue-600">+1 307 271 5151</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-indigo-600" />
                  <a href="mailto:support@litxtech.com" className="text-gray-700 hover:text-blue-600">support@litxtech.com</a>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-cyan-600" />
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
