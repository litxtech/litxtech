import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

const heroMockup = '/assets/mytrabzon/screen-1.png'
const logoSrc = '/assets/mytrabzon/logo.png'

const audienceCards = [
  {
    title: 'Students',
    description: 'Plan campus life, organize club meetups, and never miss a university announcement again.'
  },
  {
    title: 'Locals',
    description: 'Follow neighborhood alerts, traffic updates, and community events tailored to your district.'
  },
  {
    title: 'Tourists',
    description: 'Discover authentic Trabzon experiences, concerts, and social gatherings in real time.'
  }
]

const features = [
  {
    title: 'Smart Event System (Olay Var)',
    description: 'Create events with category, district, severity, and photos. Everything lives in one curated feed.'
  },
  {
    title: 'Real-Time Notifications',
    description: 'Supabase Edge Functions + Expo Push send instant alerts based on city, district, and interests.'
  },
  {
    title: 'Social Feed',
    description: 'Share photos, comment on happenings, and see what’s trending across Trabzon.'
  },
  {
    title: 'Profile & Privacy Controls',
    description: 'Build your bio, pick an avatar, set your district, or enable Hidden Mode for a private experience.'
  },
  {
    title: 'Admin Verification & Safety',
    description: 'Blue check verification, moderation tools, spam filtering, and admin dashboards keep things safe.'
  },
  {
    title: 'Secure Supabase Backend',
    description: 'US-based Supabase data centers with TLS encryption and Row Level Security protect every action.'
  }
]

const steps = [
  {
    title: 'Download the app',
    description: 'MyTrabzon will be available on the App Store. Android version is next.'
  },
  {
    title: 'Create your profile',
    description: 'Set your district, interests, and privacy preferences in under a minute.'
  },
  {
    title: 'Join or create events',
    description: 'Tap “Olay Var!”, start your own meetup, or get notified instantly when something happens.'
  }
]

const screenshots = [
  { src: '/assets/mytrabzon/screen-1.png', label: 'University hub' },
  { src: '/assets/mytrabzon/screen-2.png', label: 'Olay Var! composer' },
  { src: '/assets/mytrabzon/screen-3.png', label: 'Social feed' },
  { src: '/assets/mytrabzon/screen-4.png', label: 'Group chats' },
  { src: '/assets/mytrabzon/screen-5.png', label: 'Football matches' }
]

const faqs = [
  {
    question: 'Is MyTrabzon free to use?',
    answer: 'Yes. All community features, events, and notifications are free. Premium extras may arrive later, but the core app stays free.'
  },
  {
    question: 'Who can use the app?',
    answer: 'Students, locals, and visitors in Trabzon. You need to be 13+ years old and have a verified email, Google, or Apple account.'
  },
  {
    question: 'How do I create an event?',
    answer: 'Tap “Olay Var!”, choose a category, add details, set severity/district, upload media, and publish. Everyone subscribed to that area gets notified.'
  },
  {
    question: 'Is my data secure?',
    answer: 'All data lives in Supabase US data centers, protected by TLS encryption, Row Level Security, and LitxTech’s security processes.'
  }
]

const faqVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' }
}

export function MyTrabzonLanding() {
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  return (
    <div className="bg-[#030712] text-white">
      <section className="relative isolate overflow-hidden px-6 py-24 lg:px-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050b16] via-[#070f1f] to-[#030712] opacity-90" />
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-16 lg:flex-row">
          <div className="max-w-xl space-y-6">
            <img src={logoSrc} alt="MyTrabzon logo" className="h-10 w-auto object-contain" />
            <p className="text-sm uppercase tracking-[0.4em] text-[#E50914]">Now in Trabzon</p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              MyTrabzon – Your city, your events, your community.
            </h1>
            <p className="text-lg text-gray-300">
              Discover university happenings, football games, social meetups, and real-time city alerts. Everything about Trabzon
              lives inside a single community app.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-2xl bg-[#E50914] px-6 py-3 font-semibold text-white shadow-lg shadow-[#E50914]/40 transition hover:-translate-y-0.5">
                Get on the App Store
              </button>
              <a
                className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:border-white hover:-translate-y-0.5"
                href="#about"
              >
                Learn more
              </a>
            </div>
          </div>
          <motion.div
            className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl md:max-w-md"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -8 }}
          >
            <div className="rounded-[28px] border border-white/20 bg-[#0b1628] p-4">
              <div className="text-xs text-gray-400">Event feed preview</div>
              <img
                src={heroMockup}
                alt="MyTrabzon event feed mockup"
                className="mt-3 rounded-2xl border border-white/10 bg-white/5 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-white px-6 py-20 text-gray-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm font-semibold uppercase text-[#E50914]">What is MyTrabzon?</p>
            <h2 className="text-3xl font-bold">Local community & events app for Trabzon</h2>
            <p className="text-lg text-gray-600">
              MyTrabzon connects students, locals, and visitors through instant events, neighborhood alerts, and social updates. Powered by Supabase and built by LitxTech, it keeps the pulse of the city in your pocket.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {audienceCards.map((card) => (
              <div key={card.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                <p className="mt-3 text-gray-600">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050b16] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase text-[#E50914]">Features</p>
            <h2 className="text-3xl font-bold">Engineered for busy city life</h2>
            <p className="text-gray-400">
              From the “Olay Var!” composer to Supabase-backed alerting, MyTrabzon is crafted for real-world communities.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                className="rounded-2xl border border-white/5 bg-white/5 p-6 backdrop-blur"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-gray-900 lg:px-12">
        <div className="mx-auto max-w-5xl space-y-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase text-[#E50914]">How it works</p>
            <h2 className="text-3xl font-bold">Three simple steps</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914]/10 text-[#E50914] font-semibold">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#030712] px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-8">
          <div className="text-center text-white">
            <p className="text-sm font-semibold uppercase text-[#E50914]">In-app screenshots</p>
            <h2 className="text-3xl font-bold">See MyTrabzon in action</h2>
            <p className="text-gray-400">Interface previews from the latest build. Replace with the official mockups in /public/assets/mytrabzon/.</p>
          </div>
          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
            {screenshots.map((shot) => (
              <motion.div
                key={shot.src}
                className="snap-center rounded-3xl border border-white/10 bg-white/5 p-4 shadow-xl"
                whileHover={{ y: -8 }}
              >
                <div className="w-64">
                  <img
                    src={shot.src}
                    alt={shot.label}
                    className="h-96 w-full rounded-2xl border border-white/10 object-cover"
                  />
                  <p className="mt-3 text-center text-sm text-gray-300">{shot.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20 text-gray-900 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-lg lg:flex-row">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-[#E50914]" />
              <h2 className="text-2xl font-bold">Security & Privacy</h2>
            </div>
            <p className="text-gray-600">
              MyTrabzon is built with Supabase infrastructure hosted in US data centers. TLS encryption, Row Level Security,
              and LitxTech-led moderation keep the platform safe. The app is for users aged 13+ and operated jointly by Toprak Travel Tourism (TR), LitxTech LLC (USA), and LitxTech LTD (UK).
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/privacy-policy" className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
                Terms of Service
              </Link>
              <Link to="/community-policy" className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
                Community Policy
              </Link>
              <Link to="/mytrabzon/delete-account" className="rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
                Delete Account
              </Link>
            </div>
          </div>
          <div className="flex-1 space-y-4 rounded-2xl bg-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900">Why it matters</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Supabase US storage with TLS encryption</li>
              <li>Row Level Security to isolate every user’s data</li>
              <li>Hidden Mode, verified accounts, and spam filters</li>
              <li>Clear privacy, terms, community, and child safety policies</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#050b16] px-6 py-20 text-white lg:px-12">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase text-[#E50914]">FAQ</p>
            <h2 className="text-3xl font-bold">Answers for the curious</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-white/10 bg-white/5">
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenFaq((prev) => (prev === faq.question ? null : faq.question))}
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <span className="text-2xl text-gray-400">{openFaq === faq.question ? '−' : '+'}</span>
                </button>
                <motion.div
                  className="overflow-hidden px-6 pb-4 text-sm text-gray-300"
                  initial="hidden"
                  animate={openFaq === faq.question ? 'visible' : 'hidden'}
                  variants={faqVariants}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-[#03060e] px-6 py-10 text-sm text-gray-400 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 border-t border-white/5 pt-6 md:flex-row md:items-center md:justify-between">
          <p>
            MyTrabzon is operated by Toprak Travel Tourism (Turkey), LitxTech LLC (USA), and LitxTech LTD (UK). Data is hosted on Supabase US data centers.
          </p>
          <div className="flex flex-wrap gap-4 text-white">
            <Link to="/privacy-policy" className="hover:text-[#E50914]">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[#E50914]">
              Terms
            </Link>
            <Link to="/community-policy" className="hover:text-[#E50914]">
              Community
            </Link>
            <Link to="/child-safety-policy" className="hover:text-[#E50914]">
              Child Safety
            </Link>
            <Link to="/support/mytrabzon" className="hover:text-[#E50914]">
              Support
            </Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-500">© 2025 LitxTech. All rights reserved.</p>
      </footer>
    </div>
  )
}

