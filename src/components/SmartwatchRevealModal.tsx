import { Watch, X, Sparkles } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface SmartwatchRevealModalProps {
  onClose: () => void
}

export function SmartwatchRevealModal({ onClose }: SmartwatchRevealModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="smartwatch-reveal-title"
    >
      <button
        type="button"
        aria-label="Cerrar aviso"
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm animate-backdrop-in"
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

        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-coral text-white shadow-lg shadow-coral/25">
          <Watch className="size-8" />
        </div>

        <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-coral">
          <Sparkles className="size-3.5" />
          Premio sorpresa
        </p>

        <h2
          id="smartwatch-reveal-title"
          className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-3xl"
        >
          ¡Oh, el Smartwatch apareció! Gira una vez más para ver si lo obtienes.
        </h2>

        <p className="mt-4 rounded-2xl bg-mint px-4 py-5 font-display text-3xl font-extrabold text-teal-deep sm:text-4xl">
          ⌚ Smartwatch
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-2xl bg-coral px-5 py-3.5 text-sm font-bold text-white transition hover:bg-coral-deep"
        >
          ¡Girar ahora!
        </button>
      </div>
    </div>
  )
}
