import { useCallback, useState } from 'react'
import confetti from 'canvas-confetti'
import { ControlPanel } from './components/ControlPanel'
import { WheelPreview } from './components/WheelPreview'
import { WinnerModal } from './components/WinnerModal'
import type {
  WheelBranding,
  WheelColors,
  WheelOption,
} from './types/wheel'

const INITIAL_OPTIONS: WheelOption[] = [
  { id: crypto.randomUUID(), option: 'Premio Mayor', isLose: false },
  { id: crypto.randomUUID(), option: 'Descuento 20%', isLose: false },
  { id: crypto.randomUUID(), option: 'Regalo sorpresa', isLose: false },
  { id: crypto.randomUUID(), option: 'Inténtalo de nuevo', isLose: true },
  { id: crypto.randomUUID(), option: 'Vale $10', isLose: false },
  { id: crypto.randomUUID(), option: 'Envío gratis', isLose: false },
]

const INITIAL_COLORS: WheelColors = {
  backgroundColor: '#1a7a72',
  secondaryBackgroundColor: '#e85a3c',
  textColor: '#ffffff',
}

const INITIAL_BRANDING: WheelBranding = {
  spinButtonText: '¡Girar Ruleta!',
  winnerMessage: '¡Felicidades! Has ganado:',
  loseMessage: '¡Casi! Esta vez no hubo premio.',
}

function fireConfetti() {
  const count = 180
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 60,
  }

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.35),
    spread: 55,
    startVelocity: 45,
  })

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.3),
    spread: 90,
    decay: 0.91,
    scalar: 0.9,
  })

  confetti({
    ...defaults,
    particleCount: Math.floor(count * 0.35),
    spread: 120,
    startVelocity: 30,
    scalar: 1.15,
    colors: ['#1a7a72', '#e85a3c', '#f0b429', '#ffffff', '#d6eef8'],
  })
}

export default function App() {
  const [options, setOptions] = useState<WheelOption[]>(INITIAL_OPTIONS)
  const [colors, setColors] = useState<WheelColors>(INITIAL_COLORS)
  const [branding, setBranding] = useState<WheelBranding>(INITIAL_BRANDING)

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [result, setResult] = useState<{
    label: string
    isLose: boolean
  } | null>(null)

  const handleSpin = useCallback(() => {
    if (mustSpin || options.length < 2) return

    const randomIndex = Math.floor(Math.random() * options.length)
    setPrizeNumber(randomIndex)
    setMustSpin(true)
    setResult(null)
  }, [mustSpin, options.length])

  const handleStopSpinning = useCallback(() => {
    setMustSpin(false)
    const selected = options[prizeNumber]
    const label = selected?.option.trim() || '—'
    const isLose = Boolean(selected?.isLose)

    setResult({ label, isLose })

    if (!isLose) {
      fireConfetti()
    }
  }, [options, prizeNumber])

  return (
    <div className="min-h-screen">
      <main className="mx-auto grid min-h-screen max-w-7xl gap-5 p-4 sm:gap-6 sm:p-6 lg:grid-cols-2 lg:items-start lg:gap-8 lg:p-6">
        <ControlPanel
          options={options}
          colors={colors}
          branding={branding}
          onOptionsChange={setOptions}
          onColorsChange={setColors}
          onBrandingChange={setBranding}
        />

        <div className="lg:sticky lg:top-6">
          <WheelPreview
            options={options}
            colors={colors}
            branding={branding}
            mustSpin={mustSpin}
            prizeNumber={prizeNumber}
            onSpin={handleSpin}
            onStopSpinning={handleStopSpinning}
          />
        </div>
      </main>

      {result !== null && (
        <WinnerModal
          result={result.label}
          isLose={result.isLose}
          message={
            result.isLose
              ? branding.loseMessage.trim() ||
                '¡Casi! Esta vez no hubo premio.'
              : branding.winnerMessage.trim() ||
                '¡Felicidades! Has ganado:'
          }
          onClose={() => setResult(null)}
        />
      )}
    </div>
  )
}
