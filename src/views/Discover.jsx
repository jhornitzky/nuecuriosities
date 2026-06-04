import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSurprise } from '../hooks/useSurprise'
import ItemCard from '../components/ItemCard'

export default function Discover({ toggleSave, isSaved }) {
  const [searchParams] = useSearchParams()
  const { suggestion, items, loading, error, fetchSurprise } = useSurprise()
  const triggerSurprise = searchParams.get('surprise') === '1'

  useEffect(() => {
    fetchSurprise()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerSurprise])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-semibold text-stone-800 mb-1">
          Today&rsquo;s find
        </h2>
        {suggestion && (
          <p className="text-stone-500 text-sm max-w-xl">{suggestion.description}</p>
        )}
      </div>

      {loading && <LoadingGrid />}
      {error && <ErrorState message={error} onRetry={fetchSurprise} />}

      {suggestion && !loading && (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-stone-500 font-medium">{suggestion.title}</p>
            <button
              onClick={fetchSurprise}
              className="text-sm text-accent hover:underline font-medium"
            >
              Next find →
            </button>
          </div>

          {items.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onToggleSave={toggleSave}
                  isSaved={isSaved(item)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-xl bg-stone-100 animate-pulse aspect-square" />
      ))}
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="text-center py-16">
      <p className="text-stone-400 mb-4">{message}</p>
      <button onClick={onRetry} className="text-sm text-accent hover:underline">
        Try again
      </button>
    </div>
  )
}
