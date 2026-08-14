import { Settings2 } from 'lucide-react'
import { OptionsManager } from './OptionsManager'
import { ColorManager } from './ColorManager'
import { BrandingManager } from './BrandingManager'
import type { WheelBranding, WheelColors, WheelOption } from '../types/wheel'

interface ControlPanelProps {
  options: WheelOption[]
  colors: WheelColors
  branding: WheelBranding
  onOptionsChange: (options: WheelOption[]) => void
  onColorsChange: (colors: WheelColors) => void
  onBrandingChange: (branding: WheelBranding) => void
}

export function ControlPanel({
  options,
  colors,
  branding,
  onOptionsChange,
  onColorsChange,
  onBrandingChange,
}: ControlPanelProps) {
  return (
    <aside className="flex h-full flex-col gap-8 overflow-y-auto rounded-[1.75rem] bg-white/80 p-5 shadow-[0_20px_60px_-30px_rgba(16,42,46,0.35)] ring-1 ring-teal/10 backdrop-blur-md sm:p-7 lg:max-h-[calc(100vh-3rem)]">
      <header className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-3 py-1 text-xs font-semibold text-teal">
          <Settings2 className="size-3.5" />
          Panel de control
        </div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Ruleta Lernymart
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">
          Personaliza opciones, colores y mensajes. La vista previa se actualiza
          al instante.
        </p>
      </header>

      <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <OptionsManager options={options} onChange={onOptionsChange} />

      <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <ColorManager colors={colors} onChange={onColorsChange} />

      <div className="h-px bg-gradient-to-r from-transparent via-teal/20 to-transparent" />

      <BrandingManager branding={branding} onChange={onBrandingChange} />
    </aside>
  )
}
