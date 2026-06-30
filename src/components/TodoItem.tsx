import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Check,
  Trash,
  PencilSimple,
  CalendarBlank,
  X,
} from '@phosphor-icons/react'
import type { Todo } from '../types/todo'
import { getCategory, formatDate, isOverdue, PRIORITIES } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'title' | 'categoryId' | 'priority' | 'deadline'>>) => void
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const category = getCategory(todo.categoryId)
  const priorityDef = PRIORITIES.find((p) => p.value === todo.priority)!

  const handleEditSave = () => {
    const trimmed = editTitle.trim()
    if (!trimmed) {
      setEditing(false)
      setEditTitle(todo.title)
      return
    }
    onUpdate(todo.id, { title: trimmed })
    setEditing(false)
  }

  const handleEditKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') {
      setEditing(false)
      setEditTitle(todo.title)
    }
  }

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(todo.id)
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`card group relative overflow-hidden transition-all duration-200 ${
        todo.completed ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <button
          onClick={() => onToggle(todo.id)}
          role="checkbox"
          aria-checked={todo.completed}
          aria-label={todo.completed ? 'Tandai belum selesai' : 'Tandai selesai'}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition duration-200 active:scale-[0.85] ${
            todo.completed
              ? 'border-gray-100 bg-gray-100 text-gray-950'
              : 'border-gray-600 hover:border-gray-400'
          }`}
        >
          {todo.completed && <Check size={12} weight="bold" aria-hidden="true" />}
        </button>

        <div className="min-w-0 flex-1">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleEditKey}
                onBlur={handleEditSave}
                className="input-field py-1.5 text-sm"
                aria-label="Edit judul todo"
                autoFocus
              />
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <h3
                  className={`break-words text-sm font-medium leading-snug transition duration-200 ${
                    todo.completed ? 'text-gray-600 line-through' : 'text-gray-200'
                  }`}
                >
                  {todo.title}
                </h3>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${category.bgColor} ${category.textColor}`}
                >
                  {category.name}
                </span>

                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${
                    todo.priority === 'high'
                      ? 'border-gray-600 bg-gray-800 text-gray-200'
                      : todo.priority === 'medium'
                        ? 'border-gray-700 bg-gray-800/60 text-gray-300'
                        : 'border-gray-700 bg-gray-800/30 text-gray-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      todo.priority === 'high'
                        ? 'bg-gray-200'
                        : todo.priority === 'medium'
                          ? 'bg-gray-400'
                          : 'bg-gray-600'
                    }`}
                    aria-hidden="true"
                  />
                  {priorityDef.label}
                </span>

                {todo.deadline && (
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      isOverdue(todo.deadline) && !todo.completed
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-gray-800/40 text-gray-500'
                    }`}
                  >
                    <CalendarBlank size={10} aria-hidden="true" />
                    {formatDate(todo.deadline)}
                    {isOverdue(todo.deadline) && !todo.completed && ' ⚠'}
                  </span>
                )}
              </div>
            </>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {!todo.completed && !editing && (
            <button
              onClick={() => {
                setEditing(true)
                setEditTitle(todo.title)
              }}
              className="btn-icon"
              aria-label="Edit todo"
              title="Edit"
            >
              <PencilSimple size={16} aria-hidden="true" />
            </button>
          )}

          <button
            onClick={handleDelete}
            className={`btn-icon transition duration-200 ${confirmDelete ? 'text-red-500 hover:bg-red-50 hover:text-red-600' : ''}`}
            aria-label={confirmDelete ? 'Konfirmasi hapus' : 'Hapus todo'}
            title={confirmDelete ? 'Konfirmasi hapus' : 'Hapus'}
          >
            {confirmDelete ? <X size={16} aria-hidden="true" /> : <Trash size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
