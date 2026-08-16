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
  compact?: boolean
  onSpin: () => void
  onStopSpinning: () => void
}

const SHORT_LABEL_RULES: Array<{ test: RegExp; label: string }> = [
  {
    test: /curso gratis/i,
    label: '🎓 Curso gratis',
  },
  {
    test: /90%|hacerse rico/i,
    label: '90% DSCTO',
  },
  {
    test: /gift card/i,
    label: '💳 Gift Card',
  },
  {
    test: /parlante/i,
    label: '🎵 Parlante',
  },
  {
    test: /powerbank/i,
    label: '🔋 Powerbank',
  },
  {
    test: /50%.*curso|cualquier curso/i,
    label: '50% Cursos',
  },
  {
    test: /no pierdas la fe/i,
    label: 'No pierdas la Fe',
  },
  {
    test: /sigue intentando/i,
    label: 'Sigue intentando',
  },
  {
    test: /otro intento/i,
    label: 'Otro intento',
  },
]

/** Texto corto para el canvas; el modal usa el texto completo. */
function wheelLabel(text: string, maxChars: number) {
  const clean = text.trim() || '—'

  for (const rule of SHORT_LABEL_RULES) {
    if (rule.test.test(clean)) return rule.label
  }

  if (clean.length <= maxChars) return clean
  return `${clean.slice(0, Math.max(1, maxChars - 1)).trimEnd()}…`
}

function charsForSegments(count: number, compact: boolean) {
  if (count >= 12) return compact ? 12 : 16
  if (count >= 8) return compact ? 16 : 22
  return compact ? 22 : 28
}

export function WheelPreview({
  options,
  colors,
  branding,
  mustSpin,
  prizeNumber,
  compact = false,
  onSpin,
  onStopSpinning,
}: WheelPreviewProps) {
  const maxChars = charsForSegments(options.length, compact)

  const data = useMemo(
    () =>
      options.map((item) => ({
        option: wheelLabel(item.option, maxChars),
      })),
    [options, maxChars],
  )

  const buttonLabel = branding.spinButtonText.trim() || '¡Girar Ruleta!'
  const fontSize =
    options.length >= 12 ? (compact ? 9 : 11) : options.length > 8 ? 12 : 14
  const textDistance = options.length >= 12 ? 54 : 60

  return (
    <section className="flex h-full min-h-0 w-full flex-col items-center justify-center gap-5 p-3 sm:gap-6 sm:p-5">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal">
          Ruleta Lernymart
        </p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Gira y descubre
        </h2>
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center">
        <div className="pointer-events-none absolute inset-0 -z-10 m-auto size-[min(100%,70vh)] rounded-full bg-gradient-to-br from-gold/25 via-sky/20 to-coral/15 blur-3xl" />

        <div
          className={`wheel-stage relative aspect-square w-full ${
            compact
              ? 'max-w-[min(100%,420px)]'
              : 'max-w-[min(100%,min(78vh,680px))]'
          }`}
        >
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
            outerBorderWidth={8}
            innerRadius={18}
            innerBorderColor="#ffffff"
            innerBorderWidth={4}
            radiusLineColor="#ffffff"
            radiusLineWidth={2}
            fontSize={fontSize}
            fontFamily="Manrope"
            fontWeight={700}
            textDistance={textDistance}
            spinDuration={0.85}
            disableInitialAnimation
            pointerProps={{
              style: {
                width: '15%',
                maxWidth: 64,
                height: 'auto',
                right: '2%',
                top: '2%',
              },
            }}
          />

          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            <div className="flex size-[15%] min-h-[56px] min-w-[56px] max-h-[88px] max-w-[88px] items-center justify-center overflow-hidden rounded-full bg-white p-2 shadow-md ring-2 ring-white">
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
        className="animate-pulse-glow inline-flex min-w-[240px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-coral to-coral-deep px-8 py-4 font-display text-lg font-extrabold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:animate-none"
      >
        <Dices className="size-5" />
        {mustSpin ? 'Girando…' : buttonLabel}
      </button>
    </section>
  )
}
