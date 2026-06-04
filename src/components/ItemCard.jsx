const SOURCE_STYLES = {
  etsy: 'bg-orange-50 text-orange-600',
  ebay: 'bg-blue-50 text-blue-600',
  niche: 'bg-purple-50 text-purple-600',
}

const CATEGORY_COLORS = {
  taxidermy: 'bg-green-50 text-green-700',
  candles: 'bg-yellow-50 text-yellow-700',
  wallpaper: 'bg-sky-50 text-sky-700',
  ceramics: 'bg-orange-50 text-orange-700',
  curiosities: 'bg-violet-50 text-violet-700',
  vintage: 'bg-amber-50 text-amber-700',
  textiles: 'bg-pink-50 text-pink-700',
  art: 'bg-teal-50 text-teal-700',
}

export default function ItemCard({ item, onToggleSave, isSaved }) {
  const { id, title, image, price, source, category, url } = item
  const sourceLower = (source || '').toLowerCase()
  const categoryLower = (category || '').toLowerCase()

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-stone-100 overflow-hidden hover:border-stone-200 hover:shadow-sm transition-all">
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <button
          onClick={() => onToggleSave(item)}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label={isSaved ? 'Remove from saved' : 'Save item'}
        >
          <svg
            className={`w-4 h-4 transition-colors ${isSaved ? 'fill-accent stroke-accent' : 'fill-transparent stroke-stone-400'}`}
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {source && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SOURCE_STYLES[sourceLower] || 'bg-stone-100 text-stone-500'}`}>
              {source}
            </span>
          )}
          {category && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${CATEGORY_COLORS[categoryLower] || 'bg-stone-100 text-stone-500'}`}>
              {category}
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-stone-800 line-clamp-2 leading-snug">
          {title}
        </p>

        {price && (
          <p className="text-sm text-stone-500">{price}</p>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-xs text-accent hover:underline font-medium"
          >
            View listing →
          </a>
        )}
      </div>
    </div>
  )
}
