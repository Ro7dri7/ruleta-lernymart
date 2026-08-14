import { Palette } from 'lucide-react'
import type { WheelColors } from '../types/wheel'

interface ColorManagerProps {
  colors: WheelColors
  onChange: (colors: WheelColors) => void
}

export function ColorManager({ colors, onChange }: ColorManagerProps) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-lg font-bold text-ink">
          Gestor de colores
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Personaliza el aspecto visual de cada segmento.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-2 rounded-xl bg-mint/60 p-3 ring-1 ring-teal/10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <Palette className="size-3.5" />
            Fondo A
          </span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={colors.backgroundColor}
              onChange={(e) =>
                onChange({ ...colors, backgroundColor: e.target.value })
              }
              className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent"
            />
            <span className="font-mono text-xs text-ink-soft">
              {colors.backgroundColor}
            </span>
          </div>
        </label>

        <label className="flex flex-col gap-2 rounded-xl bg-mint/60 p-3 ring-1 ring-teal/10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <Palette className="size-3.5" />
            Fondo B
          </span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={colors.secondaryBackgroundColor}
              onChange={(e) =>
                onChange({
                  ...colors,
                  secondaryBackgroundColor: e.target.value,
                })
              }
              className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent"
            />
            <span className="font-mono text-xs text-ink-soft">
              {colors.secondaryBackgroundColor}
            </span>
          </div>
        </label>

        <label className="flex flex-col gap-2 rounded-xl bg-mint/60 p-3 ring-1 ring-teal/10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            <Palette className="size-3.5" />
            Texto
          </span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={colors.textColor}
              onChange={(e) =>
                onChange({ ...colors, textColor: e.target.value })
              }
              className="h-10 w-12 cursor-pointer rounded-lg border-0 bg-transparent"
            />
            <span className="font-mono text-xs text-ink-soft">
              {colors.textColor}
            </span>
          </div>
        </label>
      </div>
    </section>
  )
}
