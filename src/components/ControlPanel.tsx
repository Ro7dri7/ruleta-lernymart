import { PanelLeftClose, PanelLeftOpen, Settings2 } from 'lucide-react'
import { OptionsManager } from './OptionsManager'
import { ColorManager } from './ColorManager'
import { BrandingManager } from './BrandingManager'
import type { WheelBranding, WheelColors, WheelOption } from '../types/wheel'

interface ControlPanelProps {
  open: boolean
  onToggle: () => void
  options: WheelOption[]
  colors: WheelColors
  branding: WheelBranding
  onOptionsChange: (options: WheelOption[]) => void
  onColorsChange: (colors: WheelColors) => void
  onBrandingChange: (branding: WheelBranding) => void
}

export function ControlPanel({
  open,
  onToggle,
  options,
  colors,
  branding,
  onOptionsChange,
  onColorsChange,
  onBrandingChange,
}: ControlPanelProps) {
  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-[2px] lg:hidden"
          aria-label="Cerrar configuración"
          onClick={onToggle}
        />
      )}

      <aside
        className={`relative z-40 flex h-screen shrink-0 flex-col border-r border-teal/10 bg-white/95 shadow-[8px_0_40px_-28px_rgba(16,42,46,0.35)] backdrop-blur-md transition-[width,transform] duration-300 ease-out ${
          open
            ? 'w-[min(100vw,400px)]'
            : 'w-14'
        }`}
      >
        <div
          className={`flex items-center gap-2 border-b border-teal/10 p-3 ${
            open ? 'justify-between' : 'justify-center'
          }`}
        >
          {open && (
            <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
              <Settings2 className="size-3.5" />
              Configuración
            </div>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="rounded-xl p-2 text-ink-soft transition hover:bg-mint hover:text-ink"
            title={open ? 'Contraer panel' : 'Abrir configuración'}
            aria-label={open ? 'Contraer panel' : 'Abrir configuración'}
            aria-expanded={open}
          >
            {open ? (
              <PanelLeftClose className="size-5" />
            ) : (
              <PanelLeftOpen className="size-5" />
            )}
          </button>
        </div>

        {open ? (
          <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto p-5 sm:p-6">
            <header className="space-y-2">
              <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">
                Ruleta Lernymart
              </h1>
              <p className="text-sm leading-relaxed text-ink-soft">
                Personaliza opciones, colores y mensajes. La ruleta se actualiza
                al instante.
              </p>
            </header>

            <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
            <OptionsManager options={options} onChange={onOptionsChange} />
            <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
            <ColorManager colors={colors} onChange={onColorsChange} />
            <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />
            <BrandingManager branding={branding} onChange={onBrandingChange} />
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center gap-3 py-4">
            <button
              type="button"
              onClick={onToggle}
              className="rounded-xl p-2 text-teal transition hover:bg-mint"
              title="Abrir configuración"
              aria-label="Abrir configuración"
            >
              <Settings2 className="size-5" />
            </button>
            <span className="origin-center rotate-180 font-display text-[11px] font-bold tracking-[0.2em] text-ink-soft [writing-mode:vertical-rl]">
              CONFIG
            </span>
          </div>
        )}
      </aside>
    </>
  )
}
