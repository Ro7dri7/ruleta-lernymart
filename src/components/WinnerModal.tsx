import { Trophy, X, Sparkles, RotateCcw } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface WinnerModalProps {
  result: string
  message: string
  isLose: boolean
  onClose: () => void
}

export function WinnerModal({
  result,
  message,
  isLose,
  onClose,
}: WinnerModalProps) {
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
      aria-labelledby="result-title"
    >
      <button
        type="button"
        aria-label="Cerrar modal"
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-[1.75rem] bg-white p-7 text-center shadow-[0_30px_80px_-20px_rgba(16,42,46,0.45)] animate-modal-in sm:p-9">
        <div
          className={`absolute inset-x-0 top-0 h-1.5 ${
            isLose
              ? 'bg-gradient-to-r from-ink-soft/40 via-ink-soft/20 to-ink-soft/40'
              : 'bg-gradient-to-r from-teal via-gold to-coral'
          }`}
        />

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
            isLose
              ? 'bg-ink-soft shadow-ink/10'
              : 'bg-gradient-to-br from-gold to-coral shadow-coral/25'
          }`}
        >
          {isLose ? <RotateCcw className="size-8" /> : <Trophy className="size-8" />}
        </div>

        <p
          className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
            isLose ? 'text-ink-soft' : 'text-teal'
          }`}
        >
          <Sparkles className="size-3.5" />
          {isLose ? 'Sin premio' : '¡Premio!'}
        </p>

        <h2
          id="result-title"
          className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl"
        >
          {message}
        </h2>

        <p
          className={`mt-4 rounded-2xl px-4 py-5 font-display text-3xl font-extrabold sm:text-4xl ${
            isLose
              ? 'bg-ink-soft/10 text-ink-soft'
              : 'bg-mint text-teal-deep'
          }`}
        >
          {result}
        </p>

        <button
          type="button"
          onClick={onClose}
          className={`mt-6 w-full rounded-2xl px-5 py-3.5 text-sm font-bold text-white transition ${
            isLose
              ? 'bg-ink-soft hover:bg-ink'
              : 'bg-teal hover:bg-teal-deep'
          }`}
        >
          {isLose ? 'Intentar otra vez' : 'Seguir jugando'}
        </button>
      </div>
    </div>
  )
}
