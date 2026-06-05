import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/discover', label: 'Discover' },
  { to: '/saved', label: 'Saved' },
]

export default function Sidebar({ savedCount }) {
  return (
    <aside className="w-[200px] shrink-0 flex flex-col border-r border-stone-200 bg-white py-6 px-4">
      <div className="mb-8">
        <h1 className="font-display text-xl font-semibold text-stone-800 leading-tight">
          Nue<br />Curiousities
        </h1>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-accent-dim text-accent'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              }`
            }
          >
            {label}
            {label === 'Saved' && savedCount > 0 && (
              <span className="ml-auto bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {savedCount > 99 ? '99+' : savedCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

    </aside>
  )
}
