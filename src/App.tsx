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
    <div className="mx-auto min-h-[100dvh] max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[56px] font-bold leading-none tracking-tight text-gray-100 sm:text-[72px]">
              {stats.active}
            </p>
            <p className="mt-1 text-sm font-medium tracking-widest uppercase text-gray-500">tugas aktif</p>
          </div>
          <StatsBar total={stats.total} active={stats.active} completed={stats.completed} />
        </div>
      </header>

      <main className="space-y-4">
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
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-500" aria-hidden="true" />
          Semua tugas selesai &mdash; kerja bagus
        </div>
      )}

      <footer className="mt-14 text-center text-xs text-gray-600">
        <p>Todo List &mdash; simpan otomatis di browser</p>
      </footer>
    </div>
  )
}
