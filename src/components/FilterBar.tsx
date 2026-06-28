import { MagnifyingGlass } from '@phosphor-icons/react'
import type { Filter } from '../types/todo'

interface FilterBarProps {
  filter: Filter
  onFilterChange: (f: Filter) => void
  searchQuery: string
  onSearchChange: (q: string) => void
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Semua' },
  { value: 'active', label: 'Aktif' },
  { value: 'completed', label: 'Selesai' },
]

export function FilterBar({ filter, onFilterChange, searchQuery, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1 rounded-lg bg-stone-100 p-1">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition duration-200 ${
              filter === f.value
                ? 'bg-white text-stone-800 shadow-sm'
                : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative w-full sm:w-56">
        <MagnifyingGlass size={16} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Cari todo\u2026"
          className="input-field pl-9"
          aria-label="Cari todo"
          name="search-todo"
          autoComplete="off"
        />
      </div>
    </div>
  )
}
