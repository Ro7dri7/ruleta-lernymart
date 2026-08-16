import { useCallback, useMemo, useState } from 'react'
import confetti from 'canvas-confetti'
import { ControlPanel } from './components/ControlPanel'
import { SmartwatchRevealModal } from './components/SmartwatchRevealModal'
import { WheelPreview } from './components/WheelPreview'
import { WinnerModal } from './components/WinnerModal'
import type {
  WheelBranding,
  WheelColors,
  WheelOption,
} from './types/wheel'

const SPIN_COUNT_KEY = 'ruleta:spinCount'

const SMARTWATCH_ID = 'smartwatch-prize'

const SMARTWATCH_OPTION: WheelOption = {
  id: SMARTWATCH_ID,
  option: '⌚ Smartwatch',
  isLose: false,
}

const INITIAL_OPTIONS: WheelOption[] = [
  {
    id: crypto.randomUUID(),
    option: '🎓 Curso gratis',
    isLose: false,
  },
  {
    id: crypto.randomUUID(),
    option: 'No pierdas la Fe',
    isLose: true,
  },
  {
    id: crypto.randomUUID(),
    option: '90% DSCTO Curso de Como hacerse rico desde 0',
    isLose: false,
  },
  {
    id: crypto.randomUUID(),
    option: 'Sigue intentando',
    isLose: true,
  },
  {
    id: crypto.randomUUID(),
    option: '🎧 Auriculares',
    isLose: false,
  },
  {
    id: crypto.randomUUID(),
    option: 'Otro intento',
    isLose: true,
  },
  {
    id: crypto.randomUUID(),
    option: '🎵 Parlante',
    isLose: false,
  },
  {
    id: crypto.randomUUID(),
    option: 'No pierdas la Fe',
    isLose: true,
  },
  {
    id: crypto.randomUUID(),
    option: '🔋 Powerbank',
    isLose: false,
  },
  {
    id: crypto.randomUUID(),
    option: 'Sigue intentando',
    isLose: true,
  },
  {
    id: crypto.randomUUID(),
    option: '50% en cualquier curso de lernymart',
    isLose: false,
  },
  {
    id: crypto.randomUUID(),
    option: 'Otro intento',
    isLose: true,
  },
]

const INITIAL_COLORS: WheelColors = {
  backgroundColor: '#FFC847',
  secondaryBackgroundColor: '#000000',
  textColor: '#000000',
}

const INITIAL_BRANDING: WheelBranding = {
  spinButtonText: '¡Girar Ruleta!',
  winnerMessage: '¡Felicidades! Has ganado:',
  loseMessage: '¡Casi! Esta vez no hubo premio.',
}

function readStoredSpinCount(): number {
  try {
    const raw = localStorage.getItem(SPIN_COUNT_KEY)
    const parsed = Number.parseInt(raw ?? '0', 10)
    if (!Number.isFinite(parsed) || parsed < 0) return 0
    return parsed
  } catch {
    return 0
  }
}

function persistSpinCount(count: number) {
  try {
    localStorage.setItem(SPIN_COUNT_KEY, String(count))
  } catch {
    // Ignora cuota llena o modo privado.
  }
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

  const [spinCount, setSpinCount] = useState(readStoredSpinCount)
  const [isSmartwatchActive, setIsSmartwatchActive] = useState(
    () => readStoredSpinCount() === 20,
  )
  const [pendingSmartwatchReveal, setPendingSmartwatchReveal] = useState(false)
  const [showSmartwatchReveal, setShowSmartwatchReveal] = useState(false)

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [result, setResult] = useState<{
    label: string
    isLose: boolean
    isSmartwatch: boolean
  } | null>(null)

  const wheelOptions = useMemo(
    () => (isSmartwatchActive ? [...options, SMARTWATCH_OPTION] : options),
    [options, isSmartwatchActive],
  )

  const resetSmartwatchCycle = useCallback(() => {
    setIsSmartwatchActive(false)
    setSpinCount(0)
    persistSpinCount(0)
  }, [])

  const handleSpin = useCallback(() => {
    if (mustSpin || wheelOptions.length < 2) return

    const randomIndex = Math.floor(Math.random() * wheelOptions.length)
    setPrizeNumber(randomIndex)
    setMustSpin(true)
    setResult(null)
  }, [mustSpin, wheelOptions.length])

  const handleStopSpinning = useCallback(() => {
    setMustSpin(false)
    const selected = wheelOptions[prizeNumber]
    const label = selected?.option.trim() || '—'
    const isLose = Boolean(selected?.isLose)
    const wonSmartwatch = selected?.id === SMARTWATCH_ID

    setResult({ label, isLose, isSmartwatch: wonSmartwatch })

    if (!isLose) {
      fireConfetti()
    }

    if (isSmartwatchActive) {
      resetSmartwatchCycle()
      return
    }

    const nextCount = spinCount + 1
    setSpinCount(nextCount)
    persistSpinCount(nextCount)

    if (nextCount === 20) {
      setIsSmartwatchActive(true)
      setPendingSmartwatchReveal(true)
    }
  }, [
    wheelOptions,
    prizeNumber,
    isSmartwatchActive,
    spinCount,
    resetSmartwatchCycle,
  ])

  const handleCloseResult = useCallback(() => {
    setResult(null)

    if (pendingSmartwatchReveal) {
      setPendingSmartwatchReveal(false)
      setShowSmartwatchReveal(true)
      fireConfetti()
    }
  }, [pendingSmartwatchReveal])

  return (
    <div className="flex min-h-screen">
      <ControlPanel
        open={sidebarOpen}
        onToggle={() => setSidebarOpen((value) => !value)}
        options={options}
        colors={colors}
        branding={branding}
        onOptionsChange={setOptions}
        onColorsChange={setColors}
        onBrandingChange={setBranding}
      />

      <main className="relative min-h-screen min-w-0 flex-1">
        <WheelPreview
          options={wheelOptions}
          colors={colors}
          branding={branding}
          mustSpin={mustSpin}
          prizeNumber={prizeNumber}
          compact={sidebarOpen}
          onSpin={handleSpin}
          onStopSpinning={handleStopSpinning}
        />
      </main>

      {result !== null && (
        <WinnerModal
          result={result.label}
          isLose={result.isLose}
          message={
            result.isSmartwatch
              ? '¡Increíble! Te llevas el premio sorpresa:'
              : result.isLose
                ? branding.loseMessage.trim() ||
                  '¡Casi! Esta vez no hubo premio.'
                : branding.winnerMessage.trim() ||
                  '¡Felicidades! Has ganado:'
          }
          onClose={handleCloseResult}
        />
      )}

      {showSmartwatchReveal && (
        <SmartwatchRevealModal
          onClose={() => setShowSmartwatchReveal(false)}
        />
      )}
    </div>
  )
}
