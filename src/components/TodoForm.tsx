import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Plus, CaretDown, CalendarBlank } from '@phosphor-icons/react'
import { CATEGORIES, PRIORITIES } from '../types/todo'
import type { Priority } from '../types/todo'

interface TodoFormProps {
  onAdd: (title: string, categoryId: string, priority: Priority, deadline: string | null) => void
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('pribadi')
  const [priority, setPriority] = useState<Priority>('medium')
  const [deadline, setDeadline] = useState('')
  const [showDetails, setShowDetails] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed, categoryId, priority, deadline || null)
    setTitle('')
    setDeadline('')
    setPriority('medium')
    setCategoryId('pribadi')
    setShowDetails(false)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex flex-1 items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tambahkan todo baru\u2026"
              className="min-w-0 flex-1 border-0 bg-transparent text-base text-stone-700 placeholder-stone-400 outline-none focus:ring-0"
              autoFocus
              aria-label="Nama todo baru"
              name="todo-title"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="btn-icon shrink-0"
              aria-expanded={showDetails}
              aria-label={showDetails ? 'Sembunyikan detail' : 'Tampilkan detail'}
              title={showDetails ? 'Sembunyikan detail' : 'Tampilkan detail'}
            >
              <motion.div animate={{ rotate: showDetails ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <CaretDown size={18} aria-hidden="true" />
              </motion.div>
            </button>
          </div>
          <button onClick={handleSubmit} disabled={!title.trim()} className="btn-primary shrink-0">
            <Plus size={18} weight="bold" aria-hidden="true" />
            Tambah
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-stone-500">Kategori</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="input-field"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-stone-500">Prioritas</label>
                  <div className="flex gap-1.5">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => setPriority(p.value)}
                        className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition duration-200 ${
                          priority === p.value ? p.activeColor : p.color + ' bg-white'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-stone-500">Deadline</label>
                  <div className="relative">
                    <CalendarBlank size={16} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    <input
                      type="date"
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="input-field pl-9"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
