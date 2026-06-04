import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import ItemCard from '../components/ItemCard'
import SearchBar from '../components/SearchBar'

export default function Search({ toggleSave, isSaved }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { results, interpretation, loading, error, search } = useSearch()

  useEffect(() => {
    if (query) search(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  function handleSearch(newQuery) {
    setSearchParams({ q: newQuery })
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <SearchBar onSearch={handleSearch} initialValue={query} />
      </div>

      {interpretation && (
        <div className="mb-6 p-4 bg-accent-dim rounded-xl">
          <p className="text-sm text-stone-600 mb-2">{interpretation.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {interpretation.keywords?.map((kw) => (
              <span key={kw} className="text-xs bg-white text-stone-500 rounded-full px-2.5 py-1 border border-stone-100">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {loading && <LoadingGrid />}
      {error && <p className="text-stone-400 text-center py-16">{error}</p>}

      {!loading && !error && results.length === 0 && query && (
        <EmptyState query={query} />
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onToggleSave={toggleSave}
              isSaved={isSaved(item)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="rounded-xl bg-stone-100 animate-pulse">
          <div className="aspect-square" />
          <div className="p-3 space-y-2">
            <div className="h-3 bg-stone-200 rounded w-2/3" />
            <div className="h-3 bg-stone-200 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ query }) {
  return (
    <div className="text-center py-20">
      <p className="font-display text-2xl text-stone-300 mb-2">Nothing found</p>
      <p className="text-sm text-stone-400">Try rephrasing &ldquo;{query}&rdquo;</p>
    </div>
  )
}
