import { formatEtsyItem } from '../utils/formatItem'

const ETSY_API_KEY = import.meta.env.VITE_ETSY_API_KEY
const BASE_URL = 'https://openapi.etsy.com/v3/application'

export async function searchEtsy(keywords, category) {
  const params = new URLSearchParams({
    keywords,
    limit: '24',
    includes: 'Images',
    sort_on: 'score',
  })

  const res = await fetch(`${BASE_URL}/listings/active?${params}`, {
    headers: { 'x-api-key': ETSY_API_KEY },
  })

  if (!res.ok) throw new Error(`Etsy API error ${res.status}`)

  const data = await res.json()
  return (data.results || []).map((listing) => formatEtsyItem(listing, category))
}
