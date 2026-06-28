import { AnimatePresence } from 'motion/react'
import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'
import { EmptyState } from './EmptyState'

interface TodoListProps {
  todos: Todo[]
  filter: string
  searchQuery: string
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'categoryId' | 'priority' | 'deadline'>>) => void
  onClearFilter: () => void
}

export function TodoList({ todos, filter, searchQuery, onToggle, onDelete, onUpdate, onClearFilter }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState hasFilter={filter !== 'all' || searchQuery !== ''} onClearFilter={onClearFilter} />
  }

  return (
    <div className="space-y-2" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </AnimatePresence>
    </div>
  )
}
