import { Link } from 'react-router-dom'
import { Check, Zap, Rocket, Crown, Star } from 'lucide-react'

export function Packages() {
      const packages = [
        {
          name: "LITE",
          price: "$1,199",
          period: "/project",
          description: "Perfect for startups and small businesses",
          features: [
            "1-page responsive website",
            "Mobile-optimized design",
            "Basic SEO setup",
            "3-day delivery",
            "1 revision included",
            "Hosting setup"
          ],
          popular: false,
          stripeLink: "https://buy.stripe.com/test_lite_package",
          icon: <Zap className="w-8 h-8" />
        },
        {
          name: "PRO",
          price: "$2,359",
          period: "/project",
          description: "Ideal for growing businesses with automation needs",
          features: [
            "3-page responsive website",
            "Custom dashboard",
            "API integrations",
            "User authentication",
            "Database setup",
            "5-day delivery",
            "3 revisions included",
            "Priority support"
          ],
          popular: true,
          stripeLink: "https://buy.stripe.com/test_pro_package",
          icon: <Rocket className="w-8 h-8" />
        },
        {
          name: "ULTRA",
          price: "$4,980",
          period: "/project",
          description: "Complete system with advanced features",
          features: [
            "Unlimited pages",
            "Admin panel",
            "Payment integration (Stripe)",
            "Email automation",
            "User management",
            "Advanced analytics",
            "7-day delivery",
            "Unlimited revisions",
            "Dedicated support",
            "Source code included"
          ],
          popular: false,
          stripeLink: "https://buy.stripe.com/test_ultra_package",
          icon: <Crown className="w-8 h-8" />
        }
      ]

  return (
    <div className="min-h-screen relative">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      <div className="particles"></div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Software Packages
            </span>
          </h1>
              <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto mb-8">
                Choose the perfect package for your business needs. All packages include modern tech stack and professional design.
              </p>
          <div className="flex items-center justify-center space-x-2 text-yellow-400">
            <Star className="w-5 h-5" />
            <span className="text-lg font-semibold">Most Popular: PRO Package</span>
            <Star className="w-5 h-5" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div 
              key={pkg.name} 
              className={`glass-card p-8 tilt-card group relative ${
                pkg.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold neon-purple">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                  pkg.name === 'LITE' ? 'bg-gradient-to-r from-blue-400 to-cyan-400' :
                  pkg.name === 'PRO' ? 'bg-gradient-to-r from-purple-400 to-pink-400' :
                  'bg-gradient-to-r from-yellow-400 to-orange-400'
                } group-hover:scale-110 transition-transform duration-300`}>
                  {pkg.icon}
                </div>
                <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{pkg.name}</h2>
                    <p className="text-gray-700 dark:text-gray-200 mb-4">{pkg.description}</p>
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                  {pkg.price}
                  <span className="text-lg text-gray-400">{pkg.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                        <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a 
                href={pkg.stripeLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 ${
                  pkg.popular 
                    ? 'glow-button neon-purple' 
                    : 'glass-card text-white hover:bg-white/10'
                }`}
              >
                {pkg.popular ? 'Get Started Now' : 'Choose Plan'}
              </a>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 glass-card p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">What's Included in Every Package?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Modern Tech Stack</h4>
                    <p className="text-gray-200 text-sm">React, TypeScript, Supabase, Tailwind CSS</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Fast Delivery</h4>
                    <p className="text-gray-200 text-sm">Quick turnaround times with quality assurance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Crown className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">Professional Support</h4>
                    <p className="text-gray-200 text-sm">Dedicated support and maintenance included</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">Need Something Custom?</h3>
              <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
                We also offer custom software solutions tailored to your specific business needs.
              </p>
          <Link 
            to="/contact" 
            className="glow-button text-lg px-8 py-4 neon-blue"
          >
            Get a Custom Quote
          </Link>
        </div>
      </div>
    </div>
  )
}
