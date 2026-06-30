interface StatsBarProps {
  total: number
  active: number
  completed: number
}

export function StatsBar({ total, active, completed }: StatsBarProps) {
  if (total === 0) return null

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <span>
        total <strong className="text-gray-300">{total}</strong>
      </span>
      <span className="text-gray-700">/</span>
      <span>
        aktif <strong className="text-gray-300">{active}</strong>
      </span>
      <span className="text-gray-700">/</span>
      <span>
        selesai <strong className="text-gray-300">{completed}</strong>
      </span>
    </div>
  )
}
