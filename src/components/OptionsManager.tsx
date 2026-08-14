import { Plus, Trash2, GripVertical } from 'lucide-react'
import type { WheelOption } from '../types/wheel'

interface OptionsManagerProps {
  options: WheelOption[]
  onChange: (options: WheelOption[]) => void
}

export function OptionsManager({ options, onChange }: OptionsManagerProps) {
  const addOption = () => {
    onChange([
      ...options,
      {
        id: crypto.randomUUID(),
        option: `Premio ${options.length + 1}`,
        isLose: false,
      },
    ])
  }

  const updateOption = (id: string, patch: Partial<WheelOption>) => {
    onChange(
      options.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    )
  }

  const removeOption = (id: string) => {
    if (options.length <= 2) return
    onChange(options.filter((item) => item.id !== id))
  }

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-ink">
            Gestor de opciones
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Marca “Sin premio” para resultados como “Inténtalo de nuevo”.
          </p>
        </div>
        <button
          type="button"
          onClick={addOption}
          className="inline-flex items-center gap-1.5 rounded-xl bg-teal px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-deep"
        >
          <Plus className="size-4" />
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {options.map((item, index) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 rounded-xl bg-mint/60 px-2 py-2 ring-1 ring-teal/10 sm:flex-row sm:items-center"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="shrink-0 text-ink-soft/50" aria-hidden>
                <GripVertical className="size-4" />
              </span>
              <span className="w-6 shrink-0 text-center text-xs font-bold text-teal">
                {index + 1}
              </span>
              <input
                type="text"
                value={item.option}
                onChange={(e) =>
                  updateOption(item.id, { option: e.target.value })
                }
                className="min-w-0 flex-1 rounded-lg border-0 bg-white px-3 py-2 text-sm text-ink outline-none ring-1 ring-teal/15 focus:ring-2 focus:ring-teal/40"
                placeholder="Nombre del premio"
              />
            </div>

            <div className="flex items-center justify-between gap-2 pl-8 sm:pl-0">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white/80 px-2.5 py-1.5 text-xs font-semibold text-ink-soft ring-1 ring-teal/10">
                <input
                  type="checkbox"
                  checked={Boolean(item.isLose)}
                  onChange={(e) =>
                    updateOption(item.id, { isLose: e.target.checked })
                  }
                  className="size-3.5 accent-coral"
                />
                Sin premio
              </label>

              <button
                type="button"
                onClick={() => removeOption(item.id)}
                disabled={options.length <= 2}
                title={
                  options.length <= 2
                    ? 'Se necesitan al menos 2 opciones'
                    : 'Eliminar opción'
                }
                className="rounded-lg p-2 text-ink-soft transition hover:bg-coral/10 hover:text-coral disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
