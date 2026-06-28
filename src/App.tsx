import { ListChecks, Smiley } from '@phosphor-icons/react'
import { useTodos } from './hooks/useTodos'
import { TodoForm } from './components/TodoForm'
import { TodoList } from './components/TodoList'
import { FilterBar } from './components/FilterBar'
import { StatsBar } from './components/StatsBar'

export default function App() {
  const { filtered, filter, setFilter, searchQuery, setSearchQuery, stats, addTodo, toggleTodo, deleteTodo, updateTodo } =
    useTodos()

  const hasActiveFilter = filter !== 'all' || searchQuery !== ''

  const handleClearFilter = () => {
    setFilter('all')
    setSearchQuery('')
  }

  return (
    <div className="mx-auto min-h-[100dvh] max-w-2xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm shadow-amber-200">
              <ListChecks size={22} weight="bold" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-stone-800 sm:text-2xl">Todo List</h1>
              <p className="text-xs text-stone-500">Kelola aktivitas harianmu</p>
            </div>
          </div>
          <StatsBar total={stats.total} active={stats.active} completed={stats.completed} />
        </div>
      </header>

      <main className="space-y-5">
        <TodoForm onAdd={addTodo} />

        {(stats.total > 0 || hasActiveFilter) && (
          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        <TodoList
          todos={filtered}
          filter={filter}
          searchQuery={searchQuery}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          onClearFilter={handleClearFilter}
        />
      </main>

      {stats.active === 0 && stats.total > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-stone-500">
          <Smiley size={18} className="text-amber-500" aria-hidden="true" />
          Semua tugas selesai! Kerja bagus!
        </div>
      )}

      <footer className="mt-12 text-center text-xs text-stone-400">
        <p>Todo List &mdash; simpan otomatis di browser</p>
      </footer>
    </div>
  )
}
