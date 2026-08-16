import { useCallback, useState } from 'react'
import confetti from 'canvas-confetti'
import { ControlPanel } from './components/ControlPanel'
import {
  SurpriseBonusModal,
  type SurprisePrize,
} from './components/SurpriseBonusModal'
import { WelcomeModal } from './components/WelcomeModal'
import { WheelPreview } from './components/WheelPreview'
import { WinnerModal } from './components/WinnerModal'
import type {
  WheelBranding,
  WheelColors,
  WheelOption,
} from './types/wheel'

const SPIN_COUNT_KEY = 'ruleta:spinCount'
const WELCOME_SEEN_KEY = 'ruleta:welcomeSeen'

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

function hasSeenWelcome(): boolean {
  try {
    return localStorage.getItem(WELCOME_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

function persistWelcomeSeen() {
  try {
    localStorage.setItem(WELCOME_SEEN_KEY, '1')
  } catch {
    // Ignora cuota llena o modo privado.
  }
}

/** Impares (1, 3, 5…) → curso; pares (2, 4, 6…) → masterclass. */
function surprisePrizeForCount(count: number): SurprisePrize | null {
  if (count <= 0 || count % 5 !== 0) return null
  return (count / 5) % 2 === 1 ? 'curso' : 'masterclass'
}

function fireConfetti() {
  const count = 180
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 90,
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
  const [showSurprisePopup, setShowSurprisePopup] = useState(false)
  const [surprisePrize, setSurprisePrize] = useState<SurprisePrize | null>(null)
  const [showWelcomePopup, setShowWelcomePopup] = useState(() => {
    if (hasSeenWelcome()) return false
    persistWelcomeSeen()
    return true
  })

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

    const nextCount = spinCount + 1
    setSpinCount(nextCount)
    persistSpinCount(nextCount)

    const bonus = surprisePrizeForCount(nextCount)
    if (bonus) {
      setSurprisePrize(bonus)
      setShowSurprisePopup(true)
      fireConfetti()
    }
  }, [options, prizeNumber, spinCount])

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
          options={options}
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
            result.isLose
              ? branding.loseMessage.trim() ||
                '¡Casi! Esta vez no hubo premio.'
              : branding.winnerMessage.trim() ||
                '¡Felicidades! Has ganado:'
          }
          onClose={() => setResult(null)}
        />
      )}

      {showWelcomePopup && (
        <WelcomeModal
          onClose={() => {
            persistWelcomeSeen()
            setShowWelcomePopup(false)
          }}
        />
      )}

      {showSurprisePopup && surprisePrize !== null && (
        <SurpriseBonusModal
          prize={surprisePrize}
          onClose={() => setShowSurprisePopup(false)}
        />
      )}
    </div>
  )
}
