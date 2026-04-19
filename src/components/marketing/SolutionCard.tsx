import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { SolutionEntry } from '@/data/solutionsData'
import { solutionAccentClasses } from '@/lib/solutionStyles'

export function SolutionCard({ solution, index = 0 }: { solution: SolutionEntry; index?: number }) {
  const Icon = solution.icon
  const a = solutionAccentClasses(solution.accent)

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/20 backdrop-blur-sm transition hover:border-white/20"
    >
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${a.glow} blur-2xl`}
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${a.iconBg}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-white md:text-xl">{solution.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">{solution.cardDescription}</p>
        </div>
        <Link
          to={`/cozumler/${solution.slug}`}
          className={`mt-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${a.btn}`}
        >
          Detayları Gör
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  )
}
