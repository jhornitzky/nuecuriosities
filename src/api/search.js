const SERPER_API_KEY = import.meta.env.VITE_SERPER_API_KEY

/**
 * Search Google Shopping via Serper.dev.
 * Returns items in the common { id, title, image, price, source, category, url } shape.
 */
export async function searchProducts(keywords, category, { num = 20 } = {}) {
  const res = await fetch('https://google.serper.dev/shopping', {
    method: 'POST',
    headers: {
      'X-API-KEY': SERPER_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: keywords, num }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Serper API error ${res.status}: ${err}`)
  }

  const data = await res.json()

  return (data.shopping || []).map((item, i) => ({
    id: `serper-${i}-${encodeURIComponent(item.title).slice(0, 20)}`,
    title: item.title,
    image: item.imageUrl || null,
    price: item.price || null,
    source: item.source || 'Shop',
    category: category || null,
    url: item.link,
    rating: item.rating || null,
    ratingCount: item.ratingCount || null,
  }))
}
