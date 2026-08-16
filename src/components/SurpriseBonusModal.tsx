import { GraduationCap, Presentation, Sparkles, X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

export type SurprisePrize = 'curso' | 'masterclass'

interface SurpriseBonusModalProps {
  prize: SurprisePrize
  onClose: () => void
}

const PRIZE_COPY: Record<
  SurprisePrize,
  { eyebrow: string; title: ReactNode; badge: string }
> = {
  curso: {
    eyebrow: 'Bono sorpresa',
    title: (
      <>
        ¡Felicidades! Te has ganado un <span className="text-teal">Curso Gratuito</span>.
      </>
    ),
    badge: '🎓 Curso Gratuito',
  },
  masterclass: {
    eyebrow: 'Bono sorpresa',
    title: (
      <>
        ¡Felicidades! Te has ganado una <span className="text-coral">Masterclass</span>.
      </>
    ),
    badge: '📚 Masterclass',
  },
}

export function SurpriseBonusModal({ prize, onClose }: SurpriseBonusModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const copy = PRIZE_COPY[prize]
  const Icon = prize === 'curso' ? GraduationCap : Presentation

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopImmediatePropagation()
      onClose()
    }

    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="surprise-bonus-title"
    >
      <button
        type="button"
        aria-label="Cerrar bono sorpresa"
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] bg-white p-7 text-center shadow-[0_30px_80px_-20px_rgba(16,42,46,0.45)] animate-modal-in sm:p-9">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold via-coral to-teal" />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-ink-soft transition hover:bg-mint hover:text-ink"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>

        <div
          className={`mx-auto mb-4 flex size-16 items-center justify-center rounded-full text-white shadow-lg ${
            prize === 'curso'
              ? 'bg-gradient-to-br from-teal to-teal-deep shadow-teal/25'
              : 'bg-gradient-to-br from-gold to-coral shadow-coral/25'
          }`}
        >
          <Icon className="size-8" />
        </div>

        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-coral">
          <Sparkles className="size-3.5" />
          {copy.eyebrow}
        </p>

        <h2
          id="surprise-bonus-title"
          className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-[1.7rem] sm:leading-snug"
        >
          {copy.title}
        </h2>

        <p className="mt-4 rounded-2xl bg-mint px-4 py-5 font-display text-3xl font-extrabold text-teal-deep sm:text-4xl">
          {copy.badge}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-gradient-to-br from-coral to-coral-deep px-5 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
        >
          ¡Genial!
        </button>
      </div>
    </div>
  )
}
