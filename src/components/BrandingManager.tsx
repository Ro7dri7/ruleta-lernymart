import { Type, MessageSquareHeart, RotateCcw } from 'lucide-react'
import type { WheelBranding } from '../types/wheel'

interface BrandingManagerProps {
  branding: WheelBranding
  onChange: (branding: WheelBranding) => void
}

export function BrandingManager({ branding, onChange }: BrandingManagerProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-ink">Textos</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Personaliza el botón y los mensajes al detenerse la ruleta.
        </p>
      </div>

      <div className="space-y-3">
        <label className="block space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <Type className="size-3.5" />
            Texto del botón de girar
          </span>
          <input
            type="text"
            value={branding.spinButtonText}
            onChange={(e) =>
              onChange({ ...branding, spinButtonText: e.target.value })
            }
            placeholder="¡Girar Ruleta!"
            className="w-full rounded-xl border-0 bg-mint/60 px-3 py-2.5 text-sm text-ink outline-none ring-1 ring-teal/15 focus:ring-2 focus:ring-teal/40"
          />
        </label>

        <label className="block space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <MessageSquareHeart className="size-3.5" />
            Mensaje al ganar un premio
          </span>
          <input
            type="text"
            value={branding.winnerMessage}
            onChange={(e) =>
              onChange({ ...branding, winnerMessage: e.target.value })
            }
            placeholder="¡Felicidades! Has ganado:"
            className="w-full rounded-xl border-0 bg-mint/60 px-3 py-2.5 text-sm text-ink outline-none ring-1 ring-teal/15 focus:ring-2 focus:ring-teal/40"
          />
        </label>

        <label className="block space-y-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <RotateCcw className="size-3.5" />
            Mensaje si no hay premio
          </span>
          <input
            type="text"
            value={branding.loseMessage}
            onChange={(e) =>
              onChange({ ...branding, loseMessage: e.target.value })
            }
            placeholder="¡Casi! Esta vez no hubo premio."
            className="w-full rounded-xl border-0 bg-mint/60 px-3 py-2.5 text-sm text-ink outline-none ring-1 ring-teal/15 focus:ring-2 focus:ring-teal/40"
          />
        </label>
      </div>
    </section>
  )
}
