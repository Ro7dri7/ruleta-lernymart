import { Dices, Gift, Sparkles, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface WelcomeModalProps {
  onClose: () => void
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

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
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
    >
      <button
        type="button"
        aria-label="Cerrar bienvenida"
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      <div className="welcome-popup relative w-full max-w-md overflow-hidden rounded-[1.85rem] p-7 text-center text-white shadow-[0_30px_80px_-16px_rgba(16,42,46,0.5)] animate-modal-in sm:p-9">
        <div className="welcome-popup-shine pointer-events-none absolute inset-0" />

        <span className="welcome-orb welcome-orb-1" aria-hidden>
          ✨
        </span>
        <span className="welcome-orb welcome-orb-2" aria-hidden>
          🎁
        </span>
        <span className="welcome-orb welcome-orb-3" aria-hidden>
          ⭐
        </span>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>

        <div className="relative z-10">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white/20 text-white shadow-lg ring-2 ring-white/40 animate-float">
            <Gift className="size-8" />
          </div>

          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            <Sparkles className="size-3.5" />
            Premio escondido
          </p>

          <h2
            id="welcome-popup-title"
            className="mt-4 font-display text-[1.85rem] font-extrabold leading-tight sm:text-4xl"
          >
            ¡Hay un premio secreto en la ruleta!
          </h2>

          <p className="mt-3 text-base font-medium text-white/90 sm:text-lg">
            Gira ahora y atrápalo. Cuanto más juegues, más cerca estás de
            llevártelo.
          </p>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="animate-pulse-glow mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-extrabold text-coral transition hover:brightness-105"
          >
            <Dices className="size-5" />
            ¡Girar y ganar ahora!
          </button>
        </div>
      </div>
    </div>
  )
}
