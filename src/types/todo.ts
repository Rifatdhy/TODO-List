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
  { id: 'pekerjaan', name: 'Pekerjaan', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
  { id: 'pribadi', name: 'Pribadi', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
  { id: 'belanja', name: 'Belanja', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700' },
  { id: 'kesehatan', name: 'Kesehatan', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
  { id: 'lainnya', name: 'Lainnya', bgColor: 'bg-stone-100', textColor: 'text-stone-600' },
]

export const PRIORITIES: { value: Priority; label: string; color: string; activeColor: string }[] = [
  { value: 'high', label: 'Tinggi', color: 'border-red-200 text-red-600', activeColor: 'bg-red-500 text-white border-red-500' },
  { value: 'medium', label: 'Sedang', color: 'border-amber-200 text-amber-600', activeColor: 'bg-amber-500 text-white border-amber-500' },
  { value: 'low', label: 'Rendah', color: 'border-emerald-200 text-emerald-600', activeColor: 'bg-emerald-500 text-white border-emerald-500' },
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
