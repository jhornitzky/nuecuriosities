import { NavLink } from 'react-router-dom'

const CATEGORIES = [
  { label: 'Taxidermy & nature', color: '#6B8F5E' },
  { label: 'Candles & scent', color: '#C9A84C' },
  { label: 'Wallpaper & print', color: '#7B9EC4' },
  { label: 'Ceramics', color: '#C47B5E' },
  { label: 'Curiosities', color: '#8E6BAD' },
  { label: 'Vintage objects', color: '#A07850' },
  { label: 'Textiles', color: '#C47B8E' },
  { label: 'Art & illustration', color: '#5E8E8A' },
]

const NAV = [
  { to: '/discover', label: 'Discover' },
  { to: '/search', label: 'Search' },
  { to: '/saved', label: 'Saved' },
]

export default function Sidebar({ savedCount }) {
  return (
    <aside className="w-[200px] shrink-0 flex flex-col border-r border-stone-200 bg-white py-6 px-4">
      <div className="mb-8">
        <h1 className="font-display text-xl font-semibold text-stone-800 leading-tight">
          Curiosity<br />Shop
        </h1>
      </div>

      <nav className="flex flex-col gap-1 mb-8">
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

      <div>
        <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3 px-3">
          Categories
        </p>
        <ul className="flex flex-col gap-1">
          {CATEGORIES.map(({ label, color }) => (
            <li key={label} className="flex items-center gap-2 px-3 py-1.5">
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-stone-500 truncate">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
