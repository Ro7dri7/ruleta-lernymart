import { useMemo } from 'react'
import { Wheel } from 'react-custom-roulette'
import { Dices } from 'lucide-react'
import type { WheelBranding, WheelColors, WheelOption } from '../types/wheel'

interface WheelPreviewProps {
  options: WheelOption[]
  colors: WheelColors
  branding: WheelBranding
  mustSpin: boolean
  prizeNumber: number
  onSpin: () => void
  onStopSpinning: () => void
}

export function WheelPreview({
  options,
  colors,
  branding,
  mustSpin,
  prizeNumber,
  onSpin,
  onStopSpinning,
}: WheelPreviewProps) {
  const data = useMemo(
    () =>
      options.map((item) => ({
        option: item.option.trim() || '—',
      })),
    [options],
  )

  const buttonLabel = branding.spinButtonText.trim() || '¡Girar Ruleta!'

  return (
    <section className="flex h-full flex-col items-center justify-center gap-8 rounded-[1.75rem] bg-white/55 p-5 shadow-[0_20px_60px_-30px_rgba(16,42,46,0.28)] ring-1 ring-teal/10 backdrop-blur-md sm:p-8">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Vista previa
        </p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Gira y descubre
        </h2>
      </div>

      <div className="relative animate-float">
        <div className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full bg-gradient-to-br from-teal/15 via-sky/30 to-coral/15 blur-2xl" />

        <div className="wheel-stage relative mx-auto aspect-square w-[min(100%,320px)] sm:w-[360px]">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={onStopSpinning}
            backgroundColors={[
              colors.backgroundColor,
              colors.secondaryBackgroundColor,
            ]}
            textColors={[colors.textColor, '#FFFFFF']}
            outerBorderColor={colors.secondaryBackgroundColor}
            outerBorderWidth={6}
            innerRadius={22}
            innerBorderColor="#ffffff"
            innerBorderWidth={4}
            radiusLineColor="#ffffff"
            radiusLineWidth={2}
            fontSize={options.length > 8 ? 9 : 14}
            fontFamily="Manrope"
            fontWeight={700}
            textDistance={options.length > 8 ? 55 : 62}
            spinDuration={0.85}
            disableInitialAnimation
          />

          {/* Centro exacto del hub (no tapa textos de segmentos) */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex size-[18%] min-h-[52px] min-w-[52px] max-h-[64px] max-w-[64px] items-center justify-center overflow-hidden rounded-full bg-white p-1.5 shadow-md ring-2 ring-white">
              <img
                src="/lernymart-isotipo.ico"
                alt="Lernymart"
                className="size-[78%] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onSpin}
        disabled={mustSpin || data.length < 2}
        className="animate-pulse-glow inline-flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-coral to-coral-deep px-8 py-4 font-display text-lg font-extrabold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:animate-none"
      >
        <Dices className="size-5" />
        {mustSpin ? 'Girando…' : buttonLabel}
      </button>
    </section>
  )
}
