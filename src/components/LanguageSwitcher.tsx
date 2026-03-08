import { Globe } from 'lucide-react'

// Site is English only; switcher shows English only (no dropdown)
export function LanguageSwitcher() {
  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white">
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">English</span>
    </div>
  )
}

export function LanguageSwitcherCompact() {
  return (
    <div className="flex items-center space-x-1 px-2 py-1 text-white">
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">EN</span>
    </div>
  )
}
