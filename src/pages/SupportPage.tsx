import { useState } from 'react'

type SupportCategory = {
  id: string
  title: string
  description: string
  checklist: string[]
  contactHint: string
}

const categories: SupportCategory[] = [
  {
    id: 'event',
    title: 'Event Support',
    description: 'Use this option if you need help with creating “Olay Var” events, joining alerts, or managing notification thresholds.',
    checklist: [
      'Do you receive an error while publishing an event?',
      'Is the city/district selector missing?',
      'Did notifications arrive late or never arrive?'
    ],
    contactHint: 'Sharing the event ID or a screenshot helps us reproduce the issue quickly.'
  },
  {
    id: 'post',
    title: 'Post & Feed Issues',
    description: 'Report technical problems, moderation questions, or unexpected removals for your posts.',
    checklist: [
      'Are photos or videos failing to upload?',
      'Was your post removed unexpectedly?',
      'Is hashtag or search not returning results?'
    ],
    contactHint: 'Include the post ID or the approximate removal time for faster review.'
  },
  {
    id: 'auth',
    title: 'Sign Up / Login',
    description: 'Choose this when you experience trouble with email magic links, Google Sign-In, or Apple Sign-In.',
    checklist: [
      'Did the verification email or SMS fail to arrive?',
      'Is the password reset link broken or expired?',
      'Are you stuck on the Supabase verification screen?'
    ],
    contactHint: 'Tell us which device/OS you used and the exact time of the issue.'
  },
  {
    id: 'other',
    title: 'Other Features',
    description: 'Use this for profile badges, AI responses, translations, or anything else.',
    checklist: [
      'Are profile badges missing or incorrect?',
      'Do AI responses show errors?',
      'Do you have a localization or UX suggestion?'
    ],
    contactHint: 'Short screen recordings or log excerpts significantly speed up troubleshooting.'
  }
]

export function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState<SupportCategory>(categories[0])
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <header className="space-y-3 border-b border-gray-200 pb-6">
          <p className="text-sm font-semibold tracking-wide text-blue-600 uppercase">MyTrabzon Support Center</p>
          <h1 className="text-3xl font-bold">Need help with the app?</h1>
          <p className="text-gray-600">
            Pick the category that best matches your issue. When you click “Open Support Ticket,” we’ll show you a tailored form so our team can respond quickly.
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
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/60'
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">{category.title}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>

        <section className="rounded-2xl border border-gray-200 p-6 space-y-4 bg-gray-50">
          <div>
            <p className="text-sm font-semibold text-blue-600 uppercase">Selected topic</p>
            <h3 className="text-2xl font-bold">{selectedCategory.title}</h3>
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
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white font-semibold px-6 py-3 hover:bg-blue-700 transition-colors"
          >
            Open Support Ticket
          </button>
        </section>

        {isFormOpen && (
          <section className="rounded-2xl border border-blue-200 p-6 space-y-4 bg-white shadow-lg">
            <h4 className="text-xl font-semibold">Support Form</h4>
            <p className="text-sm text-gray-600">
              Topic: <span className="font-semibold text-blue-600">{selectedCategory.title}</span>
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g. Soner Toprak"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Describe your issue</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                  placeholder="Which step is failing? Please include timestamps, device details, and anything else that helps us reproduce it."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-blue-600 text-white font-semibold px-5 py-2 hover:bg-blue-700 transition-colors"
                >
                  Submit ticket
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-xl border border-gray-300 text-gray-700 font-semibold px-5 py-2 hover:bg-gray-100 transition-colors"
                >
                  Close form
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Submissions are stored securely in the Supabase support schema and reviewed within 24 hours.
              </p>
            </form>
          </section>
        )}
      </div>
    </div>
  )
}

