import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Shield,
  FileCheck,
  Building2,
  Smartphone,
  Lock,
  Send,
  ChevronDown,
  CheckCircle2,
  ClipboardList,
  MessageSquare
} from 'lucide-react'

const accent = '#0d9488'

const features = [
  {
    icon: FileCheck,
    title: 'Guest identity registration',
    description: 'Record guest names, ID or passport data, nationality, and dates in line with local hospitality regulations.'
  },
  {
    icon: Send,
    title: 'Official reporting',
    description: 'Submit legally required notifications to official systems where applicable, from a single app.'
  },
  {
    icon: Building2,
    title: 'Multi-property & branches',
    description: 'Manage multiple accommodation branches and KBS registration codes in one place.'
  },
  {
    icon: Lock,
    title: 'Secure by design',
    description: 'HTTPS encryption, access controls, and logging. Data used only for compliance and security.'
  },
  {
    icon: ClipboardList,
    title: 'Compliance-ready',
    description: 'Built to help accommodation providers meet hospitality and identity reporting obligations.'
  },
  {
    icon: Shield,
    title: 'No ads, no selling data',
    description: 'We do not sell or rent personal data. MYKBS is a compliance tool, not an advertising platform.'
  }
]

const steps = [
  {
    step: 1,
    title: 'Download MYKBS',
    description: 'Available on the App Store and Google Play. Install on your device and sign in with your business account.'
  },
  {
    step: 2,
    title: 'Register your property',
    description: 'Add your accommodation details and KBS codes. Invite staff if you manage multiple branches.'
  },
  {
    step: 3,
    title: 'Register guests & report',
    description: 'Enter guest identity data as required by law and submit notifications to official systems when needed.'
  }
]

const faqs = [
  {
    question: 'Who is MYKBS for?',
    answer: 'MYKBS is designed for accommodation providers (hotels, hostels, vacation rentals, etc.) and their authorized staff who must register guests and comply with local hospitality and identity reporting regulations.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use encrypted communication (HTTPS), secure infrastructure, access controls, and logging. Personal data is only used for compliance and system security—never sold or used for advertising.'
  },
  {
    question: 'Which countries or regions are supported?',
    answer: 'MYKBS is built to support reporting requirements that vary by region. Contact us to confirm availability for your location.'
  },
  {
    question: 'How do I request account deletion or open a support ticket?',
    answer: 'You can request account deletion from the app or via email. To open a support ticket or ask a question, use our KBS Prime Support Center linked in the footer and Legal section below.'
  }
]

export function KbsPrimeLanding() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <div className="bg-[#030712] text-white">
      {/* Hero */}
      <section className="relative isolate overflow-hidden px-6 pt-16 pb-24 lg:px-12 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#052e2a] via-[#050b16] to-[#030712] opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(13,148,136,0.25),transparent)]" />
        <div className="relative z-10 mx-auto max-w-6xl flex flex-col items-center gap-14 lg:flex-row lg:gap-16">
          <div className="max-w-xl space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-gray-300">
              <Shield className="h-4 w-4" style={{ color: accent }} />
              <span>LITXTECH LLC</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              MYKBS – Compliance & identity verification for accommodation
            </h1>
            <p className="text-lg text-gray-300">
              Register guests, meet legal reporting obligations, and manage your properties from one secure app. Built for hotels, hostels, and vacation rentals.
            </p>
            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-2xl bg-black px-6 py-3 font-semibold text-white shadow-xl transition hover:scale-[1.02]"
              >
                <svg className="mr-2 h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center rounded-2xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
              >
                <svg className="mr-2 h-8 w-8" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>
          <motion.div
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <div className="rounded-[28px] border border-white/20 bg-[#0b1628] p-6 flex flex-col items-center justify-center min-h-[320px]">
              <div className="rounded-2xl bg-white/10 p-8">
                <Shield className="h-24 w-24 text-white/80" style={{ color: accent }} />
              </div>
              <p className="mt-4 text-sm text-gray-400">MYKBS App</p>
              <p className="text-xs text-gray-500">Guest registration & compliance</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is MYKBS */}
      <section id="about" className="bg-white px-6 py-20 text-gray-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>What is MYKBS?</p>
            <h2 className="text-3xl font-bold">Hospitality compliance & identity verification</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              MYKBS is a mobile application developed and operated by LITXTECH LLC. It helps accommodation providers manage legally required guest identity registrations and transmit necessary information to official systems where required by law.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Accommodation providers', desc: 'Hotels, hostels, vacation rentals, and any business that must register guests by law.' },
              { title: 'Authorized staff', desc: 'Multi-user support so your team can manage registrations across branches.' },
              { title: 'Regulatory compliance', desc: 'Built to support local hospitality and identity reporting obligations.' }
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-3 text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#050b16] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>Features</p>
            <h2 className="text-3xl font-bold mt-2">Everything you need for compliant guest management</h2>
            <p className="text-gray-400 mt-2">Secure, focused, and built for the hospitality industry.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <motion.div
                key={f.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <div className="rounded-xl bg-white/10 p-3 w-fit" style={{ color: accent }}>
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-300">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-6 py-20 text-gray-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>How it works</p>
            <h2 className="text-3xl font-bold mt-2">Three simple steps</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <motion.div
                key={s.step}
                className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white" style={{ backgroundColor: accent }}>
                  {s.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-gray-600">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal & Policies + Support */}
      <section className="bg-[#050b16] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur lg:p-10">
            <div className="flex flex-col gap-10 lg:flex-row">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-10 w-10" style={{ color: accent }} />
                  <h2 className="text-2xl font-bold">Legal & policies</h2>
                </div>
                <p className="text-gray-300">
                  MYKBS is operated by LITXTECH LLC. We process data only for compliance and security. Read our Privacy Policy and Terms, request account deletion, or open a support ticket below.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/kbs-prime-privacy"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <FileCheck className="h-4 w-4" /> Privacy Policy
                  </Link>
                  <Link
                    to="/kbs-prime-terms"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ClipboardList className="h-4 w-4" /> Terms
                  </Link>
                  <Link
                    to="/kbs-prime/delete-account"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <Smartphone className="h-4 w-4" /> Account deletion
                  </Link>
                  <Link
                    to="/support/kbs-prime"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <MessageSquare className="h-4 w-4" /> Open ticket
                  </Link>
                </div>
              </div>
              <div className="flex-1 rounded-2xl bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" style={{ color: accent }} />
                  Why it matters
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-300">
                  <li>• Encrypted communication (HTTPS)</li>
                  <li>• No sale or rental of personal data</li>
                  <li>• Data shared only for legal compliance or infrastructure</li>
                  <li>• Clear Privacy & Terms; account deletion and support available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#030712] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>FAQ</p>
            <h2 className="text-3xl font-bold mt-2">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq((prev) => (prev === faq.question ? null : faq.question))}
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-400 shrink-0 transition-transform ${openFaq === faq.question ? 'rotate-180' : ''}`} />
                </button>
                <motion.div
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: openFaq === faq.question ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="px-6 pb-4 text-sm text-gray-300">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#03060e] px-6 py-10 text-sm text-gray-400 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <p>
            MYKBS is developed and operated by <strong className="text-white">LITXTECH LLC</strong>. Data is processed in line with our Privacy Policy and Terms.
          </p>
          <div className="flex flex-wrap gap-4 text-white">
            <Link to="/kbs-prime-privacy" className="hover:opacity-80" style={{ color: accent }}>Privacy</Link>
            <Link to="/kbs-prime-terms" className="hover:opacity-80" style={{ color: accent }}>Terms</Link>
            <Link to="/kbs-prime/delete-account" className="hover:opacity-80" style={{ color: accent }}>Account deletion</Link>
            <Link to="/support/kbs-prime" className="hover:opacity-80" style={{ color: accent }}>Support</Link>
            <Link to="/" className="hover:opacity-80" style={{ color: accent }}>LitxTech Home</Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">© 2025 LitxTech LLC. All rights reserved.</p>
      </footer>
    </div>
  )
}
