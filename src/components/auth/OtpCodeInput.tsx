import { useRef } from 'react'

type Props = {
  value: string
  onChange: (code: string) => void
  disabled?: boolean
  length?: number
}

/** 6-digit OTP boxes (digits only). */
export function OtpCodeInput({ value, onChange, disabled, length = 6 }: Props) {
  const refs = useRef<Array<HTMLInputElement | null>>([])
  const digits = value.padEnd(length, ' ').slice(0, length).split('')

  const setAt = (index: number, char: string) => {
    const next = value.split('')
    while (next.length < length) next.push('')
    next[index] = char
    const joined = next.join('').replace(/\D/g, '').slice(0, length)
    onChange(joined)
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          disabled={disabled}
          value={digits[i]?.trim() ? digits[i] : ''}
          onChange={(e) => {
            const d = e.target.value.replace(/\D/g, '').slice(-1)
            setAt(i, d)
            if (d && i < length - 1) refs.current[i + 1]?.focus()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace' && !digits[i]?.trim() && i > 0) {
              refs.current[i - 1]?.focus()
            }
          }}
          onPaste={(e) => {
            e.preventDefault()
            const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
            if (pasted) {
              onChange(pasted)
              refs.current[Math.min(pasted.length, length) - 1]?.focus()
            }
          }}
          className="h-12 w-11 rounded-lg border border-white/20 bg-white/10 text-center text-lg font-semibold text-white outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 disabled:opacity-50"
          aria-label={`Kod ${i + 1}`}
        />
      ))}
    </div>
  )
}
