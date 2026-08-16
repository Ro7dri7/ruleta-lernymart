import { Watch, X, Sparkles, BadgeCheck } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface SmartwatchRevealModalProps {
  onRedeem: () => void
  onClose: () => void
}

export function SmartwatchRevealModal({
  onRedeem,
  onClose,
}: SmartwatchRevealModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [isRedeemed, setIsRedeemed] = useState(false)

  const markRedeemed = () => {
    if (isRedeemed) return
    onRedeem()
    setIsRedeemed(true)
  }

  useEffect(() => {
    closeRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      event.stopImmediatePropagation()
      if (isRedeemed) onClose()
      else markRedeemed()
    }

    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [isRedeemed, onClose, onRedeem])

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="smartwatch-popup-title"
    >
      <button
        type="button"
        aria-label={isRedeemed ? 'Cerrar' : 'Canjear premio'}
        className="absolute inset-0 bg-ink/55 backdrop-blur-sm animate-backdrop-in"
        onClick={isRedeemed ? onClose : markRedeemed}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] bg-white p-7 text-center shadow-[0_30px_80px_-20px_rgba(16,42,46,0.45)] animate-modal-in sm:p-9">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-gold via-coral to-teal" />

        <button
          ref={closeRef}
          type="button"
          onClick={isRedeemed ? onClose : markRedeemed}
          className="absolute right-4 top-4 rounded-full p-2 text-ink-soft transition hover:bg-mint hover:text-ink"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>

        {isRedeemed ? (
          <>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-teal text-white shadow-lg shadow-teal/25">
              <BadgeCheck className="size-8" />
            </div>

            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
              <Sparkles className="size-3.5" />
              Premio canjeado
            </p>

            <h2
              id="smartwatch-popup-title"
              className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-[1.7rem] sm:leading-snug"
            >
              ¡Ya se canjeó el Smartwatch!
            </h2>

            <p className="mt-3 text-sm font-medium text-ink-soft sm:text-base">
              Solo hay 1 Smartwatch. Este premio único ya fue entregado y no
              volverá a sortearse.
            </p>

            <p className="mt-4 rounded-2xl bg-mint px-4 py-5 font-display text-2xl font-extrabold text-teal-deep">
              ⌚ Canjeado
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-6 w-full rounded-2xl bg-teal px-5 py-3.5 text-sm font-bold text-white transition hover:bg-teal-deep"
            >
              Seguir jugando
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-coral text-white shadow-lg shadow-coral/25">
              <Watch className="size-8" />
            </div>

            <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-coral">
              <Sparkles className="size-3.5" />
              Premio sorpresa
            </p>

            <h2
              id="smartwatch-popup-title"
              className="mt-3 font-display text-2xl font-extrabold text-ink sm:text-[1.7rem] sm:leading-snug"
            >
              ¡Sorpresa! Por ser el giro número 20, ¡acabas de ganar un
              SMARTWATCH!
            </h2>

            <p className="mt-4 rounded-2xl bg-mint px-4 py-5 font-display text-3xl font-extrabold text-teal-deep sm:text-4xl">
              ⌚ Smartwatch
            </p>

            <button
              type="button"
              onClick={markRedeemed}
              className="mt-6 w-full rounded-2xl bg-gradient-to-br from-coral to-coral-deep px-5 py-3.5 text-sm font-bold text-white transition hover:brightness-110"
            >
              ¡Canjear premio!
            </button>
          </>
        )}
      </div>
    </div>
  )
}
