import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

export default function Topbar() {
  const navigate = useNavigate()

  function handleSearch(query) {
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  function handleSurprise() {
    navigate('/discover?surprise=1')
  }

  return (
    <header className="shrink-0 flex items-center gap-4 px-8 py-4 border-b border-stone-200 bg-white">
      <div className="flex-1">
        <SearchBar onSearch={handleSearch} />
      </div>
      <button
        onClick={handleSurprise}
        className="shrink-0 px-4 py-2 rounded-lg border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-white transition-colors"
      >
        Surprise me
      </button>
    </header>
  )
}
