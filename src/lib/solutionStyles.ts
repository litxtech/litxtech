import type { SolutionEntry } from '@/data/solutionsData'

export function solutionAccentClasses(accent: SolutionEntry['accent']) {
  switch (accent) {
    case 'blue':
      return {
        glow: 'from-blue-500/25 via-cyan-500/10 to-transparent',
        iconBg: 'bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/25',
        btn: 'bg-blue-600 hover:bg-blue-500',
      }
    case 'amber':
      return {
        glow: 'from-amber-500/25 via-orange-500/10 to-transparent',
        iconBg: 'bg-amber-500/15 text-amber-100 ring-1 ring-amber-400/25',
        btn: 'bg-amber-600 hover:bg-amber-500',
      }
    case 'violet':
      return {
        glow: 'from-violet-500/25 via-fuchsia-500/10 to-transparent',
        iconBg: 'bg-violet-500/15 text-violet-100 ring-1 ring-violet-400/25',
        btn: 'bg-violet-600 hover:bg-violet-500',
      }
    case 'rose':
      return {
        glow: 'from-rose-500/25 via-pink-500/10 to-transparent',
        iconBg: 'bg-rose-500/15 text-rose-100 ring-1 ring-rose-400/25',
        btn: 'bg-rose-600 hover:bg-rose-500',
      }
    case 'emerald':
      return {
        glow: 'from-emerald-500/25 via-teal-500/10 to-transparent',
        iconBg: 'bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-400/25',
        btn: 'bg-emerald-600 hover:bg-emerald-500',
      }
    case 'cyan':
      return {
        glow: 'from-cyan-500/25 via-blue-500/10 to-transparent',
        iconBg: 'bg-cyan-500/15 text-cyan-100 ring-1 ring-cyan-400/25',
        btn: 'bg-cyan-600 hover:bg-cyan-500',
      }
    default:
      return {
        glow: 'from-blue-500/25 via-cyan-500/10 to-transparent',
        iconBg: 'bg-blue-500/15 text-blue-200 ring-1 ring-blue-400/25',
        btn: 'bg-blue-600 hover:bg-blue-500',
      }
  }
}
