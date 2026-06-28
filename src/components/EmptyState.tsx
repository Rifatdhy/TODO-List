import { ClipboardText } from '@phosphor-icons/react'

interface EmptyStateProps {
  hasFilter: boolean
  onClearFilter: () => void
}

export function EmptyState({ hasFilter, onClearFilter }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
        <ClipboardText size={32} className="text-amber-500" />
      </div>
      {hasFilter ? (
        <>
          <h3 className="mb-1 text-lg font-semibold text-stone-700">Tidak ada hasil</h3>
          <p className="mb-4 text-sm text-stone-500">Tidak ada todo yang sesuai dengan pencarian atau filter.</p>
          <button onClick={onClearFilter} className="text-sm font-medium text-amber-600 hover:text-amber-700">
            Hapus filter
          </button>
        </>
      ) : (
        <>
          <h3 className="mb-1 text-lg font-semibold text-stone-700">Belum ada todo</h3>
          <p className="text-sm text-stone-500">Mulai dengan menambahkan todo pertamamu di atas.</p>
        </>
      )}
    </div>
  )
}
