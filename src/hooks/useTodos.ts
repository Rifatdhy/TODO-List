import { useState, useEffect, useCallback, useRef } from 'react'
import type { Todo, Priority, Filter } from '../types/todo'

const STORAGE_KEY = 'todo-list-data'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Todo[]
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Filter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const loaded = useRef(false)

  useEffect(() => {
    loaded.current = true
  }, [])

  useEffect(() => {
    if (loaded.current) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }, [todos])

  const addTodo = useCallback(
    (title: string, categoryId: string, priority: Priority, deadline: string | null) => {
      const todo: Todo = {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        categoryId,
        priority,
        deadline,
        createdAt: new Date().toISOString(),
      }
      setTodos((prev) => [todo, ...prev])
      return todo
    },
    [],
  )

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const updateTodo = useCallback((id: string, updates: Partial<Pick<Todo, 'title' | 'categoryId' | 'priority' | 'deadline'>>) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }, [])

  const filtered = todos.filter((todo) => {
    if (filter === 'active' && todo.completed) return false
    if (filter === 'completed' && !todo.completed) return false
    if (searchQuery && !todo.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  }

  return { todos, filtered, filter, setFilter, searchQuery, setSearchQuery, stats, addTodo, toggleTodo, deleteTodo, updateTodo }
}
