interface StatsBarProps {
  total: number
  active: number
  completed: number
}

export function StatsBar({ total, active, completed }: StatsBarProps) {
  if (total === 0) return null

  return (
    <div className="flex items-center gap-4 text-sm text-stone-500">
      <span>
        Total <strong className="text-stone-700">{total}</strong>
      </span>
      <span className="text-stone-300">/</span>
      <span>
        Aktif <strong className="text-stone-700">{active}</strong>
      </span>
      <span className="text-stone-300">/</span>
      <span>
        Selesai <strong className="text-emerald-600">{completed}</strong>
      </span>
    </div>
  )
}
