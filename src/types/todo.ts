export type Priority = 'high' | 'medium' | 'low'

export type Filter = 'all' | 'active' | 'completed'

export interface Category {
  id: string
  name: string
  bgColor: string
  textColor: string
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  categoryId: string
  priority: Priority
  deadline: string | null
  createdAt: string
}

export const CATEGORIES: Category[] = [
  { id: 'pekerjaan', name: 'Pekerjaan', bgColor: 'bg-gray-800', textColor: 'text-gray-200' },
  { id: 'pribadi', name: 'Pribadi', bgColor: 'bg-gray-800/70', textColor: 'text-gray-300' },
  { id: 'belanja', name: 'Belanja', bgColor: 'bg-gray-800/50', textColor: 'text-gray-300' },
  { id: 'kesehatan', name: 'Kesehatan', bgColor: 'bg-gray-700', textColor: 'text-gray-200' },
  { id: 'lainnya', name: 'Lainnya', bgColor: 'bg-gray-800/30', textColor: 'text-gray-400' },
]

export const PRIORITIES: { value: Priority; label: string; color: string; activeColor: string }[] = [
  { value: 'high', label: 'Tinggi', color: 'border-gray-600 text-gray-300', activeColor: 'bg-gray-200 text-gray-950 border-gray-200' },
  { value: 'medium', label: 'Sedang', color: 'border-gray-700 text-gray-400', activeColor: 'bg-gray-300 text-gray-950 border-gray-300' },
  { value: 'low', label: 'Rendah', color: 'border-gray-700 text-gray-500', activeColor: 'bg-gray-400 text-gray-950 border-gray-400' },
]

export function getCategory(id: string): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[4]
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function isOverdue(iso: string): boolean {
  return new Date(iso) < new Date(new Date().toDateString())
}
