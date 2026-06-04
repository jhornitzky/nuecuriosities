import ItemCard from '../components/ItemCard'

const CATEGORY_ORDER = [
  'taxidermy', 'candles', 'wallpaper', 'ceramics',
  'curiosities', 'vintage', 'textiles', 'art',
]

export default function Saved({ saved, toggleSave }) {
  if (saved.length === 0) {
    return (
      <div className="max-w-5xl mx-auto text-center py-24">
        <p className="font-display text-3xl text-stone-200 mb-3">Nothing saved yet</p>
        <p className="text-sm text-stone-400">
          Hit the heart on any item to save it here.
        </p>
      </div>
    )
  }

  const grouped = groupByCategory(saved)

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="font-display text-3xl font-semibold text-stone-800 mb-6">
        Saved ({saved.length})
      </h2>
      {CATEGORY_ORDER.filter((cat) => grouped[cat]).map((cat) => (
        <section key={cat} className="mb-10">
          <h3 className="font-display text-lg font-medium text-stone-600 mb-4 capitalize">
            {cat}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {grouped[cat].map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggleSave={toggleSave}
                isSaved={true}
              />
            ))}
          </div>
        </section>
      ))}

      {grouped['other'] && (
        <section className="mb-10">
          <h3 className="font-display text-lg font-medium text-stone-600 mb-4">
            Other
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {grouped['other'].map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onToggleSave={toggleSave}
                isSaved={true}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function groupByCategory(items) {
  return items.reduce((acc, item) => {
    const key = item.category?.toLowerCase() || 'other'
    const bucket = CATEGORY_ORDER.includes(key) ? key : 'other'
    acc[bucket] = acc[bucket] ? [...acc[bucket], item] : [item]
    return acc
  }, {})
}
