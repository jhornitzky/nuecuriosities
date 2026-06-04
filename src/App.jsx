import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Discover from './views/Discover'
import Search from './views/Search'
import Saved from './views/Saved'
import { useSaved } from './hooks/useSaved'

export default function App() {
  const { saved, toggleSave, isSaved } = useSaved()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar savedCount={saved.length} />
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/discover" replace />} />
            <Route
              path="/discover"
              element={<Discover toggleSave={toggleSave} isSaved={isSaved} />}
            />
            <Route
              path="/search"
              element={<Search toggleSave={toggleSave} isSaved={isSaved} />}
            />
            <Route
              path="/saved"
              element={<Saved saved={saved} toggleSave={toggleSave} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}
