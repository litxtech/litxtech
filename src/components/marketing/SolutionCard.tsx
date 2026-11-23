import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { SolutionEntry } from '@/data/solutionsData'
import { solutionAccentClasses } from '@/lib/solutionStyles'
import { useLanguage } from '@/contexts/LanguageContext'

export function SolutionCard({ solution, index = 0 }: { solution: SolutionEntry; index?: number }) {
  const Icon = solution.icon
  const a = solutionAccentClasses(solution.accent)
  const { language, t } = useLanguage()
  const text = solution.text[language]

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group ltx-card-interactive relative flex flex-col overflow-hidden p-6"
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br ${a.glow} opacity-70 blur-3xl transition duration-500 group-hover:opacity-100`}
      />
      <div className="relative flex flex-1 flex-col">
        <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${a.iconBg}`}>
          <Icon className="h-5 w-5" />
        </div>

        <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug tracking-tight text-white">
          {text.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[13.5px] leading-relaxed text-slate-400">
          {text.cardDescription}
        </p>

        <Link
          to={`/cozumler/${solution.slug}`}
          className="mt-6 inline-flex items-center justify-between gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-[13px] font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.07]"
        >
          {t.solutions.cardCta}
          <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-white" />
        </Link>
      </div>
    </motion.article>
  )
}
