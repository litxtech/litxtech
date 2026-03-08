import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Send } from 'lucide-react'

const accent = '#0d9488'

type SupportCategory = {
  id: string
  title: string
  description: string
  checklist: string[]
  contactHint: string
}

const categories: SupportCategory[] = [
  {
    id: 'registration',
    title: 'Guest registration & KBS reporting',
    description: 'Issues with entering guest data, scanning documents, or submitting notifications to official systems.',
    checklist: [
      'Is guest registration failing or showing an error?',
      'Are official submissions not going through?',
      'Do you need help with MRZ or document scanning?'
    ],
    contactHint: 'Include your facility/KBS code and a short description of the step that fails.'
  },
  {
    id: 'account',
    title: 'Account & business setup',
    description: 'Help with creating an account, adding branches, or managing staff access.',
    checklist: [
      'Cannot sign up or verify your business?',
      'Need to add or edit a branch or KBS code?',
      'Staff cannot access the app?'
    ],
    contactHint: 'Tell us your business name and whether you use iOS or Android.'
  },
  {
    id: 'technical',
    title: 'Technical & performance',
    description: 'App crashes, slow performance, sync issues, or login problems.',
    checklist: [
      'Does the app crash on a specific screen?',
      'Is data not syncing across devices?',
      'Are you stuck on login or verification?'
    ],
    contactHint: 'Include device model, OS version, and when the issue started.'
  },
  {
    id: 'privacy',
    title: 'Privacy, deletion & data',
    description: 'Questions about data use, account deletion, or data access requests.',
    checklist: [
      'Want to request account deletion?',
      'Need a copy of your data?',
      'Question about how we process guest data?'
    ],
    contactHint: 'For account deletion, you can also use the dedicated Account Deletion page.'
  }
]

export function KbsPrimeSupport() {
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>(categories[0])
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide uppercase" style={{ color: accent }}>MYKBS / KBS Prime</p>
          <h1 className="text-3xl font-bold">Support & open ticket</h1>
          <p className="text-gray-600">
            Choose the category that best matches your issue. When you click “Open Support Ticket,” use the form to send your request. We will respond as soon as possible.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category)
                setIsFormOpen(false)
              }}
              className={`text-left rounded-2xl border p-5 transition-all ${
                selectedCategory.id === category.id
                  ? 'border-[#0d9488] bg-[#ccfbf1]/50 shadow-lg'
                  : 'border-gray-200 hover:border-[#0d9488]/50 hover:bg-gray-50'
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>

        <section className="rounded-2xl border border-gray-200 p-6 space-y-4 bg-gray-50">
          <div>
            <p className="text-sm font-semibold uppercase" style={{ color: accent }}>Selected topic</p>
            <h3 className="text-2xl font-bold mt-1">{selectedCategory.title}</h3>
            <p className="text-gray-600 mt-2">{selectedCategory.description}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-800">Quick checklist</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {selectedCategory.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500">{selectedCategory.contactHint}</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-xl text-white font-semibold px-6 py-3 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: accent }}
          >
            <Send className="h-4 w-4" /> Open support ticket
          </button>
        </section>

        {isFormOpen && (
          <section className="rounded-2xl border-2 p-6 space-y-4 bg-white shadow-lg" style={{ borderColor: accent }}>
            <h4 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5" style={{ color: accent }} />
              Support form
            </h4>
            <p className="text-sm text-gray-600">
              Topic: <span className="font-semibold" style={{ color: accent }}>{selectedCategory.title}</span>
            </p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="e.g. Ahmet Yılmaz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business / facility name (optional)</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="e.g. Hotel Example"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Describe your issue</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-[#0d9488] focus:ring-1 focus:ring-[#0d9488] focus:outline-none"
                  placeholder="Please include device (iOS/Android), what you were doing, and any error message."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl text-white font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: accent }}
                >
                  Submit ticket
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl border border-gray-300 text-gray-700 font-semibold px-5 py-2.5 hover:bg-gray-100 transition-colors"
                >
                  Close form
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Requests are sent to support@litxtech.com. We aim to respond within 24–48 hours.
              </p>
            </form>
          </section>
        )}

        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-wrap gap-4 justify-center">
          <Link to="/kbs-prime" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            ← KBS Prime
          </Link>
          <Link to="/kbs-prime-privacy" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            Privacy Policy
          </Link>
          <Link to="/kbs-prime-terms" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            Terms
          </Link>
          <Link to="/kbs-prime/delete-account" className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:underline" style={{ color: accent }}>
            Account deletion
          </Link>
        </div>
      </div>
    </div>
  )
}
